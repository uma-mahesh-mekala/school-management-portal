package com.school.management.dto;

import java.math.BigDecimal;

public class StudentCoursesResponseDTO extends CourseResponseDTO{
    private Boolean enrolled;

    public StudentCoursesResponseDTO(Integer id, String courseName, BigDecimal credits, Boolean enrolled) {
        super(id, courseName, credits);
        this.enrolled = enrolled;
    }

    public Boolean getEnrolled() {
        return enrolled;
    }

    public void setEnrolled(Boolean enrolled) {
        this.enrolled = enrolled;
    }
}
