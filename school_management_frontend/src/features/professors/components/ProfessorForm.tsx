import type { ProfessorFormProps } from "../types/types"

export default function ProfessorForm({title, description, submitAction, initialValues, submitText }: ProfessorFormProps) {
    return (
        <div className="mx-auto max-w-2xl space-y-6">
      
        {/* Page Header */}
        <div>
            <h1 className="text-3xl font-bold text-slate-800">
                {title}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
                {description}
            </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <form action={submitAction} className="space-y-6">

            {/* First Name */}
            <div>
                <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-slate-700"
                >
                First Name
                </label>

                <input
                id="firstName"
                type="text"
                name="firstName"
                required
                minLength={2}
                maxLength={30}
                placeholder="Enter first name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                defaultValue={initialValues?.firstName}
                />
            </div>

            {/* Last Name */}
            <div>
                <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-slate-700"
                >
                Last Name
                </label>

                <input
                id="lastName"
                type="text"
                name="lastName"
                required
                minLength={2}
                maxLength={20}
                placeholder="Enter last name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                defaultValue={initialValues?.lastName}
                />
            </div>

            {/* Email */}
            <div>
                <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
                >
                Email
                </label>

                <input
                id="email"
                type="email"
                name="email"
                required
                minLength={5}
                maxLength={40}
                placeholder="Enter course name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                defaultValue={initialValues?.email}
                />
            </div>

            {/* Department */}
            <div>
                <label
                    htmlFor="department"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Department
                </label>

                <select
                    id="department"
                    name="department"
                    required
                    defaultValue={initialValues?.department ?? ""}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                    <option value="" disabled>
                    Select Department
                    </option>

                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Social">Social</option>
                    <option value="Languages">Languages</option>
                </select>
            </div>

            {/* Designation */}
            <div>
                <label
                    htmlFor="designation"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Designation
                </label>

                <select
                    id="designation"
                    name="designation"
                    required
                    defaultValue={initialValues?.designation ?? ""}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                    <option value="" disabled>
                    Select Designation
                    </option>

                    <option value="Assistant Professor">
                    Assistant Professor
                    </option>

                    <option value="Associate Professor">
                    Associate Professor
                    </option>

                    <option value="Professor">
                    Professor
                    </option>

                    <option value="Head of Department">
                    Head of Department
                    </option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                type="button"
                className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 transition hover:bg-slate-50"
                >
                Cancel
                </button>

                <button
                type="submit"
                className="rounded-lg bg-sky-600 px-5 py-2 text-white font-medium transition hover:bg-sky-700"
                >
                {submitText}
                </button>
            </div>

            </form>
        </div>
        </div>
    )
}