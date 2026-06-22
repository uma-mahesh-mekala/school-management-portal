package com.school.management.mapper;

import com.school.management.dto.StudentCoursesResponseDTO;
import com.school.management.entity.Course;

import java.util.List;
import java.util.Set;

public class StudentCourseMapper {
    public static List<StudentCoursesResponseDTO> toDTO(List<Course> theCourses, Set<Integer> enrolledIds ) {
        return theCourses.stream().map(course -> new StudentCoursesResponseDTO(
                course.getId(),
                course.getCourseName(),
                course.getCredits(),
                enrolledIds.contains(course.getId())
        )).toList();
    }
}
