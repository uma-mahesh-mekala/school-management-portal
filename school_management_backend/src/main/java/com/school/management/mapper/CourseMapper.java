package com.school.management.mapper;

import com.school.management.dto.CourseRequestDTO;
import com.school.management.dto.CourseResponseDTO;
import com.school.management.entity.Course;

public class CourseMapper {
    public static Course convertToEntity(CourseRequestDTO course) {
        return new Course(course.getCourseName(), course.getCredits());
    }

    public static CourseResponseDTO convertToDTO(Course course) {
        return new CourseResponseDTO(course.getId(), course.getCourseName(), course.getCredits());
    }
}
