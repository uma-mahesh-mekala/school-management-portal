package com.school.management.dto;

public class ProfessorResponseDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String department;

    private String designation;

    public ProfessorResponseDTO(Integer id, String firstName, String lastName, String email, String department, String designation) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.designation = designation;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }

    public String getDesignation() {
        return designation;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
