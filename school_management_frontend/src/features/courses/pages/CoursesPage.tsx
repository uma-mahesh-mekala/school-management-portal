import { useQueryClient, useMutation } from "@tanstack/react-query";
import Table from "../../../components/common/Table";
import type { Course } from "../types/types";
import { deleteCourse } from "../services/courseService";
import type { Column } from "../../../components/types/types";
import { useAuth } from "../../auth/context/useAuth";
import { Loader } from "../../../components/ui/Loader";
import { CourseActions } from "../components/CourseActions";
import { CourseHeader } from "../components/CourseHeader";
import { useCourses } from "../hooks/useCourses";
import { useEnrollment } from "../hooks/useEnrollment";
import { useUnEnrollment } from "../hooks/useUnEnrollment";

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
  const queryClient = useQueryClient();

  const { data, isError, isLoading, error } = useCourses();

  const deleteCourseMutation = useMutation({
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

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
      <CourseHeader />
      <Table
        columns={courseColumns}
        data={data}
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
    </div>
  );
}
