import Table from "../../../components/common/Table";
import type { Course } from "../types/types";
import type { Column } from "../../../components/types/types";
import { useAuth } from "../../auth/context/useAuth";
import { Loader } from "../../../components/ui/Loader";
import { CourseActions } from "../components/CourseActions";
import { CourseHeader } from "../components/CourseHeader";
import { useCourses } from "../hooks/useCourses";
import { useEnrollment } from "../hooks/useEnrollment";
import { useUnEnrollment } from "../hooks/useUnEnrollment";
import { useDeleteMutation } from "../hooks/useDeleteCourse";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import CourseForm from "../components/CourseForm";

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
  const { role } = useAuth();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(10);
  const [showAddCourseModal, setShowAddCourseModel] = useState<boolean>(false);

  const handleNext = () => setPage((p) => p + 1);
  const handlePrev = () => setPage((p) => p - 1);

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isError, isLoading, error } = useCourses(
    debouncedSearchTerm,
    page,
    rowsPerPage,
  );

  const deleteCourseMutation = useDeleteMutation();

  const courseEnrollmentMutation = useEnrollment();

  const unEnrollmentMutation = useUnEnrollment();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const deleteTheCourse = async (courseId: number) => {
    deleteCourseMutation.mutate(courseId);
  };

  const enrollCourse = async (courseId: number) => {
    courseEnrollmentMutation.mutate(courseId);
  };

  const unEnrollCourse = async (courseId: number) => {
    unEnrollmentMutation.mutate(courseId);
  };

  return (
    <div>
      <CourseHeader search={searchTerm} onSearchChange={setSearchTerm} />
      <Table
        columns={courseColumns}
        data={data.content}
        renderActions={(course) => (
          <CourseActions
            course={course}
            role={role}
            onDelete={deleteTheCourse}
            onEnroll={enrollCourse}
            onUnEnroll={unEnrollCourse}
          />
        )}
      />
      {showAddCourseModal ? (
        <div className="fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0">
          <CourseForm
            title="Add Course"
            description="Add a new course to make available for students"
            submitAction={() => 1}
            submitText="Add Course"
          />
        </div>
      ) : null}
      <div className="mt-4 flex flex-row justify-end gap-4">
        <button
          hidden={page === 0}
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
          onClick={handleNext}
        >
          Next
        </button>

        <button
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
          onClick={() => setShowAddCourseModel(!showAddCourseModal)}
        >
          Add Course
        </button>
      </div>
    </div>
  );
}
