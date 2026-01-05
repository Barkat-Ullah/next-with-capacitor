"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/src/services/auth.index";
import { toast } from "sonner";
import { useUser } from "@/src/context/UserContext";
import { useRouter } from "next/navigation";
import { Preferences } from "@capacitor/preferences";
// Define the schema
const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(5, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login({
  onAuthSuccess,
}: {
  onAuthSuccess: () => void;
}) {
  const { isLoading, setIsLoading, updateUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  //   const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);

      if (res?.success) {
        toast.success(res?.message);

        await Preferences.set({
          key: "is_authenticated",
          value: "true",
        });

        await updateUser();
        if (typeof onAuthSuccess === "function") {
          onAuthSuccess();
        } else {
          window.location.assign("/");
        }
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 bg-linear-to-br from-green-50 to-green-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-green-500 opacity-20">
              <PlusCircle className="h-48 w-48" />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="text-green-500">
              <PlusCircle className="h-12 w-12" />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-6">
            Login Novena HealthCare
          </h2>

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-green-500 hover:text-green-600"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don&lsquo;t have an account?{" "}
              <a
                href="#"
                className="text-green-500 hover:text-green-600 font-medium"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
