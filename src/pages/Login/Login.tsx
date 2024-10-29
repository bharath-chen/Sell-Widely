import React, { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../features/auth/authSlice";
import loginService from "../../services/login-service";
import { AuthState } from "../../models/authState";
import { showModal } from "../../features/modal/modalSlice";
import { Alert } from "../../shared/Alert/Alert";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import MandatoryIcon from "../../components/MandatoryIcon/MandatoryIcon";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobilePattern = /^\d{10}$/;

const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Email or Mobile number is required")
    .refine(
      (value) => emailPattern.test(value) || mobilePattern.test(value),
      "Please enter a valid email address or 10-digit mobile number"
    ),
  password: z.string().nonempty("Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    let usernameKey = emailPattern.test(data.username)
      ? "email"
      : "mobilenumber";

    try {
      const { request } = loginService.get<
        AuthState,
        { [key: string]: string; password: string }
      >({ [usernameKey]: data.username, password: data.password });

      const response = await request;

      if (+response.data.status) {
        dispatch(login(response.data));
        dispatch(
          showModal({
            type: "success",
            message:
              "🔑 Welcome back to Almaa! You’re logged in and ready to shop. Explore your favorites and check out the latest deals!",
          })
        );
        navigate("/");
      } else {
        dispatch(showModal({ type: "error", message: response.data.status }));
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const renderEyeIcon = (showEyeIcon: boolean) => {
    return showEyeIcon ? (
      <span role="img" aria-label="Hide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </span>
    ) : (
      <span role="img" aria-label="Show">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </span>
    );
  };

  return (
    <div className="nc-PageLogin">
      <Helmet>
        <title>Almaa</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 text-center text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleSubmit(handleLogin)} className="grid gap-6">
            <div className="block">
              <label className="text-neutral-800 dark:text-neutral-200">
                Email / Mobile No <MandatoryIcon />
              </label>
              <Input
                type="text"
                placeholder="Enter your email or mobile number"
                {...register("username")}
                className="mt-1.5"
              />
              {errors.username && (
                <InputErrorMessage>{errors.username.message}</InputErrorMessage>
              )}
            </div>

            <label className="block">
              <div className="flex justify-between">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Password <MandatoryIcon />
                </span>
                <Link to="/forgot-password" className="text-sm text-green-600">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="mt-1.5"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {renderEyeIcon(showPassword)}
                </button>
              </div>
              {errors.password && (
                <InputErrorMessage>{errors.password.message}</InputErrorMessage>
              )}
            </label>

            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user?{" "}
            <Link className="text-green-600" to="/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
