import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { showModal } from "../../features/modal/modalSlice";
import { CanceledError } from "axios";
import facebookSvg from "../../images/Facebook.svg";
import twitterSvg from "../../images/Twitter.svg";
import googleSvg from "../../images/Google.svg";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import signupService from "../../services/signup-service";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import MandatoryIcon from "../../components/MandatoryIcon/MandatoryIcon";
import { login } from "../../features/auth/authSlice";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    mobileNumber: z
      .string()
      .min(1, "Mobile number is required")
      .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof schema>;

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleSignUp = (data: any) => {
    const payload = {
      gofor: "customersadd",
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      email: data.email,
      mobilenumber: data.mobileNumber,
      // resgistration_type: "Website",
    };

    dispatch(showLoader());

    signupService
      .create(payload)
      .then((res) => {
        dispatch(hideLoader());
        if (res.data.message) {
          dispatch(showModal({ type: "error", message: res.data.message }));
          return;
        }

        dispatch(login(res.data));
        dispatch(
          showModal({
            type: "success",
            message:
              "🎉 Welcome to Almaa! Your account has been successfully created. Start exploring our amazing products and enjoy exclusive deals!",
          })
        );
        navigate("/");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        dispatch(showModal({ type: "error", message: err.message }));
      });
  };

  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Almaa</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name <MandatoryIcon />
              </span>
              <Input
                type="text"
                placeholder="First Name"
                className="mt-1"
                {...register("firstName")}
              />
              {errors.firstName && (
                <InputErrorMessage>
                  {errors.firstName.message}
                </InputErrorMessage>
              )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name <MandatoryIcon />
              </span>
              <Input
                type="text"
                placeholder="Last Name"
                className="mt-1"
                {...register("lastName")}
              />
              {errors.lastName && (
                <InputErrorMessage>{errors.lastName.message}</InputErrorMessage>
              )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Password <MandatoryIcon />
              </span>
              <div className="relative">
                <Input
                  placeholder="Password"
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
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Confirm Password <MandatoryIcon />
              </span>
              <div className="relative">
                <Input
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="mt-1.5"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {renderEyeIcon(showConfirmPassword)}
                </button>
              </div>
              {errors.confirmPassword && (
                <InputErrorMessage>
                  {errors.confirmPassword.message}
                </InputErrorMessage>
              )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email <MandatoryIcon />
              </span>
              <Input
                type="email"
                placeholder="Email"
                className="mt-1"
                {...register("email")}
              />
              {errors.email && (
                <InputErrorMessage>{errors.email.message}</InputErrorMessage>
              )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Mobile No <MandatoryIcon />
              </span>
              <Input
                type="tel"
                placeholder="Mobile Number"
                className="mt-1"
                {...register("mobileNumber")}
              />
              {errors.mobileNumber && (
                <InputErrorMessage>
                  {errors.mobileNumber.message}
                </InputErrorMessage>
              )}
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
