package com.school.management.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "course_name", nullable = false, length = 30)
    private String courseName;

    @Column(name = "credits")
    private BigDecimal credits;

    public Course(){}

    public Course(String courseName, BigDecimal credits) {
        this.courseName = courseName;
        this.credits = credits;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
