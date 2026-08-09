# Node.js + Fastify + Prisma + Redis Migration Guide
## School Management Backend Migration Architecture

This document provides a comprehensive blueprint for migrating the existing Java Spring Boot (`school_management_backend`) microservice to a high-performance **Node.js** architecture built with **Fastify**, **`fastify-openapi-glue`**, **Prisma ORM**, **PostgreSQL**, and **Redis**.

---

## 1. Executive Summary & Stack Comparison

| Architectural Feature | Existing Stack (Spring Boot) | Target Node.js Stack |
| :--- | :--- | :--- |
| **Language & Runtime** | Java 25 | Node.js (v20+ LTS) + TypeScript |
| **Web Framework** | Spring MVC (`@RestController`) | **Fastify** (Schema-driven, low overhead) |
| **API Contract & Validation** | Manual / Annotations (`@RequestBody`, `@RequestParam`) | **`fastify-openapi-glue`** (OpenAPI 3.0 contract-first) |
| **ORM / Data Access** | Spring Data JPA + Hibernate | **Prisma ORM** (Type-safe query builder) |
| **Database** | PostgreSQL | PostgreSQL |
| **Security & Auth** | Spring Security + JJWT (`io.jsonwebtoken`) | **`@fastify/jwt`** + **`bcrypt`** |
| **Caching Layer** | None | **Redis** via `@fastify/redis` / `ioredis` |
| **Serialization** | Jackson | Fastify Fast-JSON-Stringify (via OpenAPI schema) |

---

## 2. Key Areas to Focus On

### Key Focus Area 1: Database Schema & Prisma ORM Mapping

#### Entity Mapping to `schema.prisma`
Spring Boot JPA entities (`AppUser`, `Student`, `Professor`, `Course`, and join table `student_course`) must be mapped to Prisma schema models.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model AppUser {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  role     String

  @@map("app_user")
}

model Student {
  id            Int      @id @default(autoincrement())
  firstName     String   @map("first_name")
  lastName      String   @map("last_name")
  email         String   @unique
  dateOfBirth   DateTime @map("date_of_birth") @db.Date
  dateOfJoining DateTime @map("date_of_joining") @db.Date

  courses StudentCourse[]

  @@map("student")
}

model Professor {
  id          Int    @id @default(autoincrement())
  firstName   String @map("first_name")
  lastName    String @map("last_name")
  email       String @unique
  department  String
  designation String

  @@map("professor")
}

model Course {
  id         Int      @id @default(autoincrement())
  courseName String   @map("course_name") @db.VarChar(30)
  credits    Decimal  @db.Decimal(10, 2)

  students StudentCourse[]

  @@map("course")
}

// Explicit Join Table to preserve exact table structure
model StudentCourse {
  studentId Int     @map("student_id")
  courseId  Int     @map("course_id")
  student   Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
  course    Course  @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@id([studentId, courseId])
  @@map("student_course")
}
```

> [!NOTE]
> Using an **explicit join model** (`StudentCourse`) gives precise control over relations, foreign key cascades, and querying enrollment states, mirroring Hibernate's `@JoinTable(name = "student_course")`.

---

### Key Focus Area 2: OpenAPI Contract-First Development (`fastify-openapi-glue`)

`fastify-openapi-glue` glues an OpenAPI 3.0 specification (`openapi.yaml`) to Fastify handler methods, providing automatic request validation (body, params, query) and response serialization.

#### Workflow with `fastify-openapi-glue`:
1. Define `src/openapi/openapi.yaml` describing all endpoints (`/api/auth/login`, `/api/students`, `/api/courses`, etc.).
2. Define `operationId` in each path action (e.g., `operationId: loginUser`, `operationId: getAllStudents`).
3. Create a Service Handler Object whose methods match the `operationId`s.

#### Registration Example in Fastify (`src/app.ts`):
```typescript
import Fastify from 'fastify';
import openapiGlue from 'fastify-openapi-glue';
import path from 'path';
import { SecurityHandlers } from './security/securityHandlers';
import { ServiceHandlers } from './services/serviceHandlers';

const fastify = Fastify({ logger: true });

const glueOptions = {
  specification: path.join(__dirname, 'openapi/openapi.yaml'),
  serviceHandlers: new ServiceHandlers(),
  securityHandlers: new SecurityHandlers(),
  prefix: '/api'
};

fastify.register(openapiGlue, glueOptions);
```

---

### Key Focus Area 3: Authentication & Authorization (Spring Security -> Fastify JWT)

#### 1. Password Hashing Compatibility
Spring Security uses BCrypt (`$2a$` or `$2b$`). Use Node.js `bcrypt` or `bcryptjs`:
```typescript
import bcrypt from 'bcrypt';

// Verify incoming password against DB hash
const isMatch = await bcrypt.compare(rawPassword, user.password);

// Hash default student password "Welcome@123"
const hashedPassword = await bcrypt.hash('Welcome@123', 10);
```

#### 2. Role-Based Access Control (RBAC) Hooks
Replicate `@PreAuthorize("hasAuthority('ROLE_ADMIN')")` using Fastify `preHandler` hooks or Security Handlers:
```typescript
// Custom preHandler hook for role checking
export function authorizeRoles(...allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify(); // decodes token into request.user
    const user = request.user as { username: string; role: string };
    
    if (!allowedRoles.includes(user.role)) {
      reply.status(403).send({ status: 403, message: 'Access Denied: Insufficient Privileges' });
    }
  };
}
```

---

### Key Focus Area 4: Redis Caching Strategy

Integrating Redis (`@fastify/redis`) delivers massive performance improvements for reads and search operations.

#### Recommended Redis Caching Applications:
1. **Course List & Search Cache**:
   - Cache key: `courses:search:{search_term}:page:{page}:size:{size}` (TTL: 10 mins).
   - Invalidate cache pattern `courses:*` when a course is created, updated, or deleted.
2. **Student Enrolled Course Sets**:
   - Maintain Redis Set `student:{studentId}:enrolled_courses`.
   - On student enrollment (`POST /api/students/courses/{id}/enroll`), execute `SADD student:{id}:enrolled_courses {courseId}`.
   - On unenrollment (`POST /api/students/courses/{id}/unenroll`), execute `SREM student:{id}:enrolled_courses {courseId}`.
   - When fetching `/api/students/me/courses`, retrieve `SMEMBERS student:{id}:enrolled_courses` for O(1) set lookup instead of database joins.
3. **JWT Revocation / Token Blacklist**:
   - Store invalidated JWT tokens in Redis with expiration matching JWT TTL (`EXPIRE`).

```typescript
// Fastify Redis Usage Example
import fastifyRedis from '@fastify/redis';

fastify.register(fastifyRedis, { host: '127.0.0.1', port: 6379 });

// In service handler:
const { redis } = fastify;
const cachedCourses = await redis.get(`courses:page:${page}`);
if (cachedCourses) return JSON.parse(cachedCourses);
```

---

### Key Focus Area 5: Pagination Compatibility (`PagingResult`)

To ensure the React frontend (`school_management_frontend`) functions seamlessly without modification, Fastify responses for paginated endpoints **must match the exact Spring Data `PagingResult` structure**.

#### Paging Helper Utility (`src/utils/pagination.ts`):
```typescript
export interface PagingResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export function buildPagingResult<T>(
  content: T[],
  totalElements: number,
  page: number,
  size: number
): PagingResult<T> {
  const totalPages = Math.ceil(totalElements / size) || 0;
  return {
    content,
    page,
    size,
    totalElements,
    totalPages,
    first: page === 0,
    last: page >= totalPages - 1 || totalPages === 0,
    empty: content.length === 0
  };
}
```

---

### Key Focus Area 6: Global Error Handling & Prisma Exceptions

Replace Spring Boot's `@RestControllerAdvice` with Fastify's `setErrorHandler`.

```typescript
import { Prisma } from '@prisma/client';

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  // Prisma Unique Constraint Violation
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return reply.status(409).send({
        status: 409,
        message: `Unique constraint failed on field: ${error.meta?.target}`
      });
    }
    if (error.code === 'P2025') {
      return reply.status(404).send({
        status: 404,
        message: 'Record not found'
      });
    }
  }

  // JWT / Auth Errors
  if (error.statusCode === 401 || error.name === 'UnauthorizedError') {
    return reply.status(401).send({ status: 401, message: 'Unauthorized' });
  }

  return reply.status(error.statusCode || 500).send({
    status: error.statusCode || 500,
    message: error.message || 'Internal Server Error'
  });
});
```

---

## 3. Target Directory & Project Architecture

```
school_management_backend_node/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── openapi/
│   │   └── openapi.yaml
│   ├── plugins/
│   │   ├── jwt.ts
│   │   ├── redis.ts
│   │   └── cors.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── studentService.ts
│   │   ├── professorService.ts
│   │   └── courseService.ts
│   ├── handlers/
│   │   └── serviceHandlers.ts
│   ├── utils/
│   │   └── pagination.ts
│   └── app.ts
├── package.json
├── tsconfig.json
└── MIGRATION_GUIDE.md
```

---

## 4. Migration Checklist & Step-by-Step Roadmap

- [ ] **Phase 1: Project Setup & Tooling**
  - Initialize Node.js TypeScript workspace (`npm init -y`, `npm i fastify fastify-openapi-glue @fastify/jwt @fastify/cors @fastify/redis @prisma/client bcrypt`).
  - Configure `tsconfig.json` and build scripts.
- [ ] **Phase 2: Database Layer & Prisma**
  - Create `prisma/schema.prisma` matching PostgreSQL tables (`app_user`, `student`, `professor`, `course`, `student_course`).
  - Run `npx prisma db pull` (if connecting to existing DB) or `npx prisma migrate dev` (if initializing fresh schema).
  - Generate Prisma Client (`npx prisma generate`).
- [ ] **Phase 3: OpenAPI 3.0 Specification**
  - Write `openapi.yaml` declaring all endpoints, DTO schemas (`LoginRequest`, `StudentDTO`, `CourseDTO`, `PagingResult`), and `operationId`s.
- [ ] **Phase 4: Fastify Plugins & Security Handlers**
  - Configure `@fastify/jwt` and `@fastify/redis`.
  - Register `fastify-openapi-glue` with OpenAPI spec and handler maps.
  - Implement JWT authentication verification and role validation preHandlers (`ROLE_ADMIN`, `ROLE_STUDENT`).
- [ ] **Phase 5: Core Business Logic & Services Implementation**
  - Implement `AuthService` (`login`, `createUser` with BCrypt password hashing).
  - Implement `StudentService` (Auto-create `AppUser` on student creation with default password `"Welcome@123"`).
  - Implement `ProfessorService` and `CourseService`.
  - Implement `Student` enrollment & unenrollment logic.
- [ ] **Phase 6: Caching Layer Integration**
  - Integrate Redis cache for course listings and student enrollment sets.
  - Add cache invalidation triggers on mutating endpoints (POST, PUT, DELETE).
- [ ] **Phase 7: Testing & Frontend Compatibility Verification**
  - Verify JSON payload compatibility against existing React frontend endpoints (`http://localhost:5173`).
  - Validate response formats for `PagingResult` and error responses.
