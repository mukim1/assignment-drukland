"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [flashMessage, setFlashMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isAgree, setIsAgree] = useState(false);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const response = await fetch(
        "https://social-login.druckland.de/api/v1/user/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Result", result);

      if (response.ok) {
        setFlashMessage({ type: "success", message: "Login successful!" });
      } else {
        setFlashMessage({
          type: "error",
          message: result.message || "An error occurred",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setFlashMessage({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setTimeout(() => setFlashMessage(null), 5000);
    }
  };

  return (
    <div>
      {flashMessage && (
        <div
          className={`mb-4 p-4 rounded-md ${
            flashMessage.type === "success" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {flashMessage.type === "success" ? (
                <CheckCircle2
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              ) : (
                <AlertCircle
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  flashMessage.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {flashMessage.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <form
        className="space-y-6"
        onSubmit={handleSubmit((data) => startTransition(() => onSubmit(data)))}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-0">
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className={`${
                errors.email
                  ? "border-red-500"
                  : "focus:ring-indigo-500 focus:border-indigo-500"
              } appearance-none block w-full px-1 py-1 border-b border-gray-500 placeholder-gray-400 focus:outline-none sm:text-sm`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-xs font-thin text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-0">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className={`${
                errors.password
                  ? "border-red-500"
                  : "focus:ring-indigo-500 focus:border-indigo-500"
              } appearance-none block w-full px-1 py-1 border-b border-gray-500 placeholder-gray-400 focus:outline-none sm:text-sm`}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-xs font-thin text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            onChange={(e) => setIsAgree(e.target.checked)}
            checked={isAgree}
            type="checkbox"
            id="terms"
            className="rounded border-gray-300"
          />
          <label
            htmlFor="terms"
            className="ml-2 text-sm text-gray-600 cursor-pointer"
          >
            I agree to all{" "}
            <Link
              href="/terms"
              className="text-black font-semibold hover:underline"
            >
              Terms & Conditions
            </Link>
          </label>
        </div>

        <button
          disabled={!isAgree}
          type="submit"
          className="w-full rounded-md bg-black disabled:cursor-not-allowed py-2 text-white hover:bg-gray-800"
        >
          {/* Log in */}
          {pending ? "Loading..." : "Log in"}
        </button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">or sign in with</span>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-2">
        <FB />
        <Google />
        <IN />
      </div>
    </div>
  );
}

const FB = () => (
  <svg
    fill="#3f8dfa"
    viewBox="0 0 24 24"
    aria-hidden="true"
    width="28px"
    height="28px"
    className="cursor-pointer"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const Google = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="28px"
    height="28px"
    className="cursor-pointer"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const IN = () => (
  <svg
    fill="#3f8dfa"
    viewBox="0 0 24 24"
    aria-hidden="true"
    width="22px"
    height="22px"
    className="cursor-pointer"
  >
    <path
      fillRule="evenodd"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      clipRule="evenodd"
    />
  </svg>
);
