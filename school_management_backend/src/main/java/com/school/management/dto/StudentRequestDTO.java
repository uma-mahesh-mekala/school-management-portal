package com.school.management.dto;

import net.bytebuddy.asm.Advice;

import java.time.LocalDate;

public class StudentRequestDTO {
    private String firstName;

    private String lastName;

    private String email;

    private LocalDate dateOfBirth;

    private LocalDate dateOfJoining;

    public StudentRequestDTO(){}

    public StudentRequestDTO(String firstName, String lastName, String email, LocalDate dateOfBirth, LocalDate dateOfJoining) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.dateOfJoining = dateOfJoining;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }
}
