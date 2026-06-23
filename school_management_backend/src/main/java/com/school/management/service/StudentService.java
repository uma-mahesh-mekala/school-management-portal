package com.school.management.service;

import com.school.management.dto.StudentCoursesResponseDTO;
import com.school.management.dto.StudentRequestDTO;
import com.school.management.dto.StudentResponseDTO;
import com.school.management.entity.Course;
import com.school.management.entity.Student;
import com.school.management.mapper.StudentCourseMapper;
import com.school.management.mapper.StudentMapper;
import com.school.management.repository.Course.CourseRepository;
import com.school.management.repository.Student.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private StudentRepository studentRepository;
    private CourseRepository courseRepository;
    private AuthService authService;

    public StudentService(StudentRepository studentRepository, CourseRepository courseRepository, AuthService authService) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.authService = authService;
    }

    @Transactional
    public StudentResponseDTO add(StudentRequestDTO student) {
        Student newStudent = StudentMapper.convertToEntity((student));

        Student savedStudent = studentRepository.save(newStudent);

        String email = newStudent.getEmail();
        String password = "Welcome@123";
        String role = "ROLE_STUDENT";

        authService.createUser(email, password, role);
        return StudentMapper.convertToDTO(savedStudent);
    }

    public List<StudentResponseDTO> getAll() {
        List<Student> tempStudents = studentRepository.findAll();

        return tempStudents.stream().map(StudentMapper::convertToDTO).toList();
    }

    public StudentResponseDTO getStudentById(Integer id) {
        Student tempStudent = studentRepository.findById(id).orElseThrow();

        return StudentMapper.convertToDTO(tempStudent);
    }

    @Transactional
    public StudentResponseDTO update(Integer id, StudentRequestDTO student) {
        Student studentDetailsToUpdate = StudentMapper.convertToEntity((student));
        studentDetailsToUpdate.setId(id);
        Student updatedStudent = studentRepository.save(studentDetailsToUpdate);

        return StudentMapper.convertToDTO(updatedStudent);
    }

    @Transactional
    public void deleteById(Integer id) {
        studentRepository.deleteById(id);
    }

    @Transactional
    public void enrollStudentInCourse(String email, Integer courseId ) {
        Student theStudent = studentRepository.findByEmail(email);

        Course theCourse = courseRepository.findById(courseId).orElseThrow();

        theStudent.addCourse(theCourse);

        studentRepository.save(theStudent);
    }

    public List<StudentCoursesResponseDTO> getCourses(String email, String search) {
        Student theStudent = studentRepository.findByEmail(email);
        System.out.println("theStudent"+theStudent.getCourses());
        List<Course> theCourses;

        if(search == null || search.isBlank()) {
            theCourses = courseRepository.findAll();
        } else {
            theCourses = courseRepository.findByCourseName(search);
        }

        Set<Integer> enrolledCourseIds = theStudent.getCourses().stream().map(Course::getId).collect(Collectors.toSet());

        return StudentCourseMapper.toDTO(theCourses, enrolledCourseIds);
    }

    @Transactional
    public void unEnrollStudentInCourse(String email, Integer courseId ) {
        Student theStudent = studentRepository.findByEmail(email);

        Course theCourse = courseRepository.findById(courseId).orElseThrow();

        theStudent.removeCourse(theCourse);

        studentRepository.save(theStudent);
    }

}
