package com.school.management.service;

import com.school.management.dto.ProfessorRequestDTO;
import com.school.management.dto.ProfessorResponseDTO;
import com.school.management.entity.Professor;
import com.school.management.mapper.ProfessorMapper;
import com.school.management.repository.Professor.ProfessorRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {
    private ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    @Transactional
    public ProfessorResponseDTO addProfessor(ProfessorRequestDTO professorRequestDTO) {
        Professor newProfessor = ProfessorMapper.convertToEntity(professorRequestDTO);

        Professor savedProfessor = professorRepository.save(newProfessor);

        return ProfessorMapper.convertToDTO(savedProfessor);
    }

    public List<ProfessorResponseDTO> findALl() {
        List<Professor> tempProfessors = professorRepository.findAll();

        return tempProfessors.stream().map(ProfessorMapper::convertToDTO).toList();
    }

    public ProfessorResponseDTO findById(Integer id) {
        Professor tempProfessor = professorRepository.findById(id).orElseThrow();

        return ProfessorMapper.convertToDTO(tempProfessor);
    }

    @Transactional
    public ProfessorResponseDTO update(Integer professorId, ProfessorRequestDTO tempProfessor) {
        Professor professorToUpdate = ProfessorMapper.convertToEntity(tempProfessor);

        professorToUpdate.setId(professorId);

        Professor updatedProfessor = professorRepository.save(professorToUpdate);
        return ProfessorMapper.convertToDTO(updatedProfessor);
    }

    @Transactional
    public void deleteById(Integer professorId) {
        professorRepository.deleteById(professorId);
    }
}
