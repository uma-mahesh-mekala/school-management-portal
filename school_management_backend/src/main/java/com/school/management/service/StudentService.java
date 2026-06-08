package com.school.management.service;

import com.school.management.dto.StudentRequestDTO;
import com.school.management.dto.StudentResponseDTO;
import com.school.management.entity.Student;
import com.school.management.mapper.StudentMapper;
import com.school.management.repository.Student.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Transactional
    public StudentResponseDTO add(StudentRequestDTO student) {
        Student newStudent = StudentMapper.convertToEntity((student));

        Student savedStudent = studentRepository.save(newStudent);

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

}
