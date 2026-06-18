import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/Dashboard";
import CoursesPage from "../features/courses/pages/CoursesPage";
import ProfessorsPage from "../features/professors/pages/ProfessorsPage";
import StudentsPage from "../features/students/pages/StudentsPage";
import AddCoursePage from "../features/courses/pages/AddCoursePage";
import EditCoursePage from "../features/courses/pages/EditCoursePage";
import AddProfessorPage from "../features/professors/pages/AddProfessorPage";
import EditProfessorPage from "../features/professors/pages/EditProfessorPage";
import AddStudentPage from "../features/students/pages/AddStudentPage";
import EditStudentPage from "../features/students/pages/EditStudentPage";
import LoginPage from "../features/auth/pages/LoginPage";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { PATHS } from "./constants";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.LOGIN} element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={PATHS.HOME} element={<CoursesPage />} />
          <Route path={PATHS.COURSES} element={<CoursesPage />} />
          <Route path={PATHS.PROFESSORS} element={<ProfessorsPage />} />
          <Route path={PATHS.ADD_COURSE} element={<AddCoursePage />} />
          <Route path={PATHS.EDIT_COURSE} element={<EditCoursePage />} />
          <Route path={PATHS.ADD_PROFESSOR} element={<AddProfessorPage />} />
          <Route path={PATHS.EDIT_PROFESSOR} element={<EditProfessorPage />} />
          <Route path={PATHS.STUDENTS} element={<StudentsPage />} />
          <Route path={PATHS.ADD_STUDENT} element={<AddStudentPage />} />
          <Route path={PATHS.EDIT_STUDENT} element={<EditStudentPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
