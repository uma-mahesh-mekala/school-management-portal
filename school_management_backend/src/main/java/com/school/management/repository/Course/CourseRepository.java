package com.school.management.repository.Course;
import com.school.management.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer>, PagingAndSortingRepository<Course, Integer>{
    @Query("select c from Course c where lower(c.courseName) LIKE lower(concat('%', ?1, '%'))")
    Page<Course> findByCourseName(String courseName, Pageable pageable);
}