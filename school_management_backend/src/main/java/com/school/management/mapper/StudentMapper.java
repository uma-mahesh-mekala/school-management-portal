package com.school.management.mapper;

import com.school.management.dto.StudentRequestDTO;
import com.school.management.dto.StudentResponseDTO;
import com.school.management.entity.Student;

public class StudentMapper {

    public static Student convertToEntity(StudentRequestDTO student){
        return new Student(
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getDateOfBirth(),
                student.getDateOfJoining()
        );
    }

    public static StudentResponseDTO convertToDTO(Student student) {
        return new StudentResponseDTO(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getDateOfBirth(),
                student.getDateOfJoining()
        );
    }
}
