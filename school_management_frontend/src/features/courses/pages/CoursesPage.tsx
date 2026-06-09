import { useState, useEffect } from "react";
import Table from "../../../components/common/Table";
import { NavLink } from "react-router";
import type { Course } from "../types/types";
import { getCourses, deleteCourse } from "../services/courseService";
import type { Column } from "../../../components/types/types";

const courseColumns: Column<Course>[] = [
  {
    key: "id",
    label: "No.",
  },
  {
    key: "courseName",
    label: "Course Name",
  },
  {
    key: "credits",
    label: "Credits",
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    async function fetchCourses() {
      const availableCourses = await getCourses();
      setCourses(availableCourses);
    }

    fetchCourses();
  }, []);

  const deleteTheCourse = async (courseId: number) => {
    await deleteCourse(courseId);

    setCourses((current) =>
      current.filter((course: Course) => course.id !== Number(courseId)),
    );
  };

  const renderActions = (course: Course) => {
    return (
      <div className="flex gap-2">
        <NavLink
          to={`/courses/${course.id}/edit`}
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
        >
          Edit
        </NavLink>

        <button
          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
          onClick={() => deleteTheCourse(course.id)}
        >
          Delete
        </button>
      </div>
    );
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Courses</h1>

          <p className="text-sm text-slate-500">
            Manage courses offered by the school.
          </p>
        </div>

        <NavLink
          to="/courses/new"
          className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition"
        >
          Add Course
        </NavLink>
      </div>
      <Table
        columns={courseColumns}
        data={courses}
        renderActions={renderActions}
      />
    </div>
  );
}
