package com.school.management.service;

import com.school.management.common.pagination.PagingResult;
import com.school.management.dto.CourseRequestDTO;
import com.school.management.dto.CourseResponseDTO;
import com.school.management.entity.Course;
import com.school.management.mapper.CourseMapper;
import com.school.management.repository.Course.CourseRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    @Transactional
    public CourseResponseDTO addCourse(CourseRequestDTO course) {
        Course tempCourse = new Course(course.getCourseName(), course.getCredits());

        Course savedCourse =  courseRepository.save(tempCourse);

        return CourseMapper.convertToDTO(savedCourse);
    }

    public PagingResult<CourseResponseDTO> fetchAllCourses(String search, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("courseName"));
        Page<Course> coursePage;
        List<Course> tempCourses;
        if(search == null || search.isBlank()) {
            coursePage = courseRepository.findAll(pageable);
        } else {
            coursePage = courseRepository.findByCourseName(search, pageable);
        }

        Page<CourseResponseDTO> dtoPage = coursePage.map(CourseMapper::convertToDTO);

        return PagingResult.from(dtoPage);
    }

    public CourseResponseDTO findById(Integer id) {
        Course tempCourse = courseRepository.findById(id).orElseThrow();

        return CourseMapper.convertToDTO(tempCourse);
    }

    @Transactional
    public CourseResponseDTO update(Integer id, CourseRequestDTO course) {
        Course courseToUpdate = new Course(course.getCourseName(), course.getCredits());
        courseToUpdate.setId(id);

        Course updatedCourse = courseRepository.save(courseToUpdate);

        return CourseMapper.convertToDTO(updatedCourse);
    }

    @Transactional
    public void deleteByCourseId(Integer id) {
        courseRepository.deleteById(id);
    }
}
