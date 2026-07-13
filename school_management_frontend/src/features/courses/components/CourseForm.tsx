import type { CourseFormProps } from "../types/types";
import { Button } from "../../../components/ui/Button";

export default function CourseForm({
  title,
  description,
  submitAction,
  initialValues,
  submitText,
}: CourseFormProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <form action={submitAction} className="space-y-6">
          {/* Course Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Course Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              required
              minLength={5}
              maxLength={40}
              placeholder="Enter course name"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              defaultValue={initialValues?.courseName}
            />
          </div>

          {/* Credits */}
          <div>
            <label
              htmlFor="credits"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Credits
            </label>

            <input
              id="credits"
              type="number"
              name="credits"
              required
              min={0}
              max={10}
              placeholder="Enter credits"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              defaultValue={initialValues?.credits}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              intent={"tertiary"}
              size={"medium"}
              disabled={false}
              className=""
            >
              Cancel
            </Button>

            <Button
              type="submit"
              intent={"primary"}
              size={"medium"}
              disabled={false}
              className=""
            >
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
