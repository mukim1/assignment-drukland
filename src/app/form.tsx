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
    </div>
  );
}

// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// function Form() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [isAgree, setIsAgree] = useState(false); // is agree with terms
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           value={formData.email}
//           placeholder="Email Address"
//           className="w-full border-b border-gray-500 p-2 focus:border-gray-500 focus:outline-none"
//         />
//       </div>

//       <div>
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={formData.password}
//           placeholder="Password"
//           className="w-full border-b border-gray-500 p-2 focus:border-gray-500 focus:outline-none"
//         />
//       </div>

//       <div className="flex items-center">
//         <input
//           onChange={(e) => setIsAgree(e.target.checked)}
//           checked={isAgree}
//           type="checkbox"
//           id="terms"
//           className="rounded border-gray-300"
//         />
//         <label
//           htmlFor="terms"
//           className="ml-2 text-sm text-gray-600 cursor-pointer"
//         >
//           I agree to all{" "}
//           <Link
//             href="/terms"
//             className="text-black font-semibold hover:underline"
//           >
//             Terms & Conditions
//           </Link>
//         </label>
//       </div>

//       <button
//         disabled={!isAgree || !formData.email || !formData.password}
//         type="submit"
//         className="w-full rounded-md bg-black disabled:cursor-not-allowed py-2 text-white hover:bg-gray-800"
//       >
//         Log in
//       </button>

//       <div className="relative my-4">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="bg-white px-2 text-gray-500">or sign in with</span>
//         </div>
//       </div>

//       <div className="flex justify-center space-x-4">
//         <button className="rounded-full p-2 hover:bg-gray-100">
//           <Image src="/placeholder.svg" alt="LinkedIn" width={24} height={24} />
//         </button>
//         <button className="rounded-full p-2 hover:bg-gray-100">
//           <Image src="/placeholder.svg" alt="Google" width={24} height={24} />
//         </button>
//         <button className="rounded-full p-2 hover:bg-gray-100">
//           <Image src="/placeholder.svg" alt="Facebook" width={24} height={24} />
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Form;
