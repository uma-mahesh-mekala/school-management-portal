import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/layout/Dashboard';
import CoursesPage from '../features/courses/pages/CoursesPage';
import ProfessorsPage from '../features/professors/pages/ProfessorsPage';
import StudentsPage from '../pages/StudentsPage';
import AddCoursePage from '../features/courses/pages/AddCoursePage';
import EditCoursePage from '../features/courses/pages/EditCoursePage';
import AddProfessorPage from '../features/professors/pages/AddProfessorPage';
import EditProfessorPage from '../features/professors/pages/EditProfessorPage';

export default function AppRoutes() {
    return (<Routes>
        <Route element = {<DashboardLayout />}>

            <Route path="/" element={<CoursesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/new" element={<AddCoursePage />} />
            <Route path="/courses/:courseId/edit" element={<EditCoursePage />} />
            <Route path="/professors" element={<ProfessorsPage />} />
            <Route path="/professors/new" element={<AddProfessorPage />} />
            <Route path="/professors/:professorId/edit" element={<EditProfessorPage />} />
            <Route path="/students" element={<StudentsPage />} />
        </Route>
    </Routes>)

}