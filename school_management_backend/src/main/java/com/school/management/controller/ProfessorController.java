package com.school.management.controller;

import com.school.management.dto.ProfessorRequestDTO;
import com.school.management.dto.ProfessorResponseDTO;
import com.school.management.service.ProfessorService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api")
@CrossOrigin
public class ProfessorController {
    private ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @PostMapping("/professors")
    public ResponseEntity<ProfessorResponseDTO> addProfessor(@RequestBody ProfessorRequestDTO professorRequestDTO) {
        ProfessorResponseDTO savedProfessor = professorService.addProfessor(professorRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedProfessor);
    }

    @GetMapping("/professors")
    public ResponseEntity<List<ProfessorResponseDTO>> fetchAllProfessors() {
        List<ProfessorResponseDTO> tempProfessors = professorService.findALl();

        return ResponseEntity.status(HttpStatus.OK).body(tempProfessors);
    }

    @GetMapping("/professors/{professorId}")
    public ResponseEntity<ProfessorResponseDTO> getProfessorById(@PathVariable("professorId") Integer professorId) {
        ProfessorResponseDTO tempProfessor = professorService.findById(professorId);

        return ResponseEntity.status(HttpStatus.OK).body(tempProfessor);
    }

    @PutMapping("/professors/{professorId}")
    public ResponseEntity<ProfessorResponseDTO> updateProfessor(
            @PathVariable("professorId") Integer professorId,
            @RequestBody ProfessorRequestDTO professorRequest
    ) {
        ProfessorResponseDTO updatedProfessor = professorService.update(professorId, professorRequest);

        return ResponseEntity.status(HttpStatus.OK).body(updatedProfessor);
    }

    @DeleteMapping("/professors/{professorId}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable("professorId") Integer professorId) {
        professorService.deleteById(professorId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
