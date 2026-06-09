package com.school.management.mapper;

import com.school.management.dto.ProfessorRequestDTO;
import com.school.management.dto.ProfessorResponseDTO;
import com.school.management.entity.Professor;

public class ProfessorMapper {
    public static Professor convertToEntity(ProfessorRequestDTO professorRequestDTO) {
        return new Professor(
                professorRequestDTO.getFirstName(),
                professorRequestDTO.getLastName(),
                professorRequestDTO.getEmail(),
                professorRequestDTO.getDepartment(),
                professorRequestDTO.getDesignation()
        );
    }

    public static ProfessorResponseDTO convertToDTO(Professor professor) {
        return new ProfessorResponseDTO(
                professor.getId(),
                professor.getFirstName(),
                professor.getLastName(),
                professor.getEmail(),
                professor.getDepartment(),
                professor.getDesignation()
        );
    }
}
