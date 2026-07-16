package com.school.management.controller;

import com.school.management.common.pagination.PagingResult;
import com.school.management.dto.StudentCoursesResponseDTO;
import com.school.management.dto.StudentRequestDTO;
import com.school.management.dto.StudentResponseDTO;
import com.school.management.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/api/students")
@CrossOrigin
public class StudentController {
    private StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<StudentResponseDTO> addStudent(@RequestBody StudentRequestDTO student) {
        StudentResponseDTO savedStudent = studentService.add(student);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    @GetMapping("")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<PagingResult<StudentResponseDTO>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PagingResult<StudentResponseDTO> students = this.studentService.getAll(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(students);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_STUDENT')")
    @GetMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> getStudentById(
            @PathVariable("studentId") Integer studentId
    ) {
        StudentResponseDTO student = this.studentService.getStudentById(studentId);

        return ResponseEntity.status(HttpStatus.OK).body(student);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> updateStudent(
            @PathVariable("studentId") Integer studentId,
            @RequestBody StudentRequestDTO studentRequest
    ) {
        StudentResponseDTO updatedStudent = studentService.update(studentId, studentRequest);

        return ResponseEntity.status(HttpStatus.OK).body(updatedStudent);
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> deleteStudent(
            @PathVariable("studentId") Integer studentId
    ) {
        studentService.deleteById(studentId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    @PostMapping("/courses/{courseId}/enroll")
    public ResponseEntity<HashMap<String, String>> enrollCourse(
            @PathVariable("courseId") Integer courseId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        studentService.enrollStudentInCourse(email, courseId);

        HashMap<String, String> response = new HashMap<>();
        response.put("message", "student successfully enrolled");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    @GetMapping("/me/courses")
    public ResponseEntity<PagingResult<StudentCoursesResponseDTO>> getCourses(
            Authentication authentication,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ){
        String email = authentication.getName();
        PagingResult<StudentCoursesResponseDTO> studentCourses = studentService.getCourses(email, search, page, size);

        return ResponseEntity.status(HttpStatus.OK).body(studentCourses);
    }

    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    @PostMapping("/courses/{courseId}/unenroll")
    public ResponseEntity<HashMap<String, String>> unEnrollCourse(
            @PathVariable("courseId") Integer courseId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        studentService.unEnrollStudentInCourse(email, courseId);

        HashMap<String, String> response = new HashMap<>();
        response.put("message", "student unenrolled successfully");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
