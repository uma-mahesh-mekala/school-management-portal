package com.school.management.repository.Course;
import com.school.management.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer>{
    @Query("select c from Course c where lower(c.courseName) LIKE lower(concat('%', ?1, '%'))")
    List<Course> findByCourseName(String courseName);
}