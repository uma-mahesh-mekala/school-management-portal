package com.school.management.dto;

import java.math.BigDecimal;

public class CourseRequestDTO {
    private String courseName;

    private BigDecimal credits;

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
