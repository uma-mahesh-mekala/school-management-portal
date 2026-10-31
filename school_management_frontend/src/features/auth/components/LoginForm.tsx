import type { LoginFormProps } from "../types/types";
import { Button } from "../../../components/ui/Button";

export default function LoginForm({ onSubmit, errorMessage }: LoginFormProps) {
  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginRequest = {
      email: String(formData.get("username")),
      password: String(formData.get("password")),
    };

    onSubmit(loginRequest);
  };
  return (
    <div className="min-h-screen flex flex-row justify-center items-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-slate-200">
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">School MS</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Username or Email
            </label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username or email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-sky-600 hover:text-sky-700"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            intent={"primary"}
            size={"medium"}
            disabled={false}
            className="text-white"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
