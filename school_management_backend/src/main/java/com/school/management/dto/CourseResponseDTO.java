package com.school.management.dto;

import java.math.BigDecimal;

public class CourseResponseDTO {
    private Integer id;

    private String courseName;

    private BigDecimal credits;

    public CourseResponseDTO(Integer id, String courseName, BigDecimal credits) {
        this.id = id;
        this.courseName = courseName;
        this.credits = credits;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public BigDecimal getCredits() {
        return credits;
    }

    public void setCredits(BigDecimal credits) {
        this.credits = credits;
    }
}
