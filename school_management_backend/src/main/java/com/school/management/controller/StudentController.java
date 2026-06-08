package com.school.management.controller;

import com.school.management.dto.ProfessorRequestDTO;
import com.school.management.dto.StudentRequestDTO;
import com.school.management.dto.StudentResponseDTO;
import com.school.management.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/students")
@CrossOrigin
public class StudentController {
    private StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping("")
    public ResponseEntity<StudentResponseDTO> addStudent(@RequestBody StudentRequestDTO student) {
        StudentResponseDTO savedStudent = studentService.add(student);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    @GetMapping("")
    public ResponseEntity<List<StudentResponseDTO>> getAllStudents() {
        List<StudentResponseDTO> students = this.studentService.getAll();

        return ResponseEntity.status(HttpStatus.OK).body(students);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> getAllStudents(
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
}
