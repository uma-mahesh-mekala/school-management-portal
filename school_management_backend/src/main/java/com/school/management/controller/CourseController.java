package com.school.management.controller;

import com.school.management.dto.CourseRequestDTO;
import com.school.management.dto.CourseResponseDTO;
import com.school.management.entity.Course;
import com.school.management.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CourseController {
    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/courses")
    public ResponseEntity<CourseResponseDTO> addCourse(@RequestBody CourseRequestDTO course) {
        CourseResponseDTO savedCourse = courseService.addCourse(course);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseResponseDTO>> fetchAll() {
        List<CourseResponseDTO> courses = courseService.fetchAllCourses();

        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<CourseResponseDTO> findById(@PathVariable Integer courseId  ) {
        CourseResponseDTO course = courseService.findById(courseId);

        return ResponseEntity.status(HttpStatus.OK).body(course);
    }

    @PutMapping("/courses/{courseId}")
    public ResponseEntity<CourseResponseDTO> updateCourse(@PathVariable Integer courseId, @RequestBody CourseRequestDTO updatedCourse) {
        CourseResponseDTO course = courseService.update(courseId, updatedCourse);

        return ResponseEntity.status(HttpStatus.OK).body(course);
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer courseId) {
        courseService.deleteByCourseId(courseId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
