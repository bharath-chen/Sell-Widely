import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updatePasswordService from "../../services/update-password-service";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Input from "../../shared/Input/Input";
import Label from "../../components/Label/Label";
import CommonLayout from "./CommonLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../state/store";
import { useState } from "react";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { CanceledError } from "axios";
import { showModal } from "../../features/modal/modalSlice";
import MandatoryIcon from "../../components/MandatoryIcon/MandatoryIcon";
import { Customer } from "../../models/customer";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof schema>;

const AccountPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(schema),
  });

  const customer = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: PasswordFormData) => {
    const { request } = updatePasswordService.get<
      Customer,
      {
        customer_id: number;
        password: string;
        newpassword: string;
      }
    >({
      customer_id: +customer.customer_id,
      password: data.currentPassword,
      newpassword: data.newPassword,
    });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        if (res.data["message"] && !res?.data?.customer_id) {
          dispatch(showModal({ type: "error", message: res.data["message"] }));
        } else {
          dispatch(
            showModal({
              type: "success",
              message: "Password updated successfully!",
            })
          );
        }
        reset();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        dispatch(showModal({ type: "error", message: err.message }));
      });
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
    <CommonLayout>
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Update your password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
          <div>
            <Label>
              Password <MandatoryIcon />{" "}
            </Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                className="mt-1.5"
                {...register("currentPassword")}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
              >
                {renderEyeIcon(showCurrentPassword)}
              </button>
            </div>
            {errors.currentPassword && (
              <InputErrorMessage>
                {errors.currentPassword.message}
              </InputErrorMessage>
            )}
          </div>
          <div>
            <Label>
              New password <MandatoryIcon />{" "}
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                className="mt-1.5"
                {...register("newPassword")}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {renderEyeIcon(showNewPassword)}
              </button>
            </div>
            {errors?.newPassword && (
              <InputErrorMessage>
                {errors.newPassword.message}
              </InputErrorMessage>
            )}
          </div>
          <div>
            <Label>
              Confirm password <MandatoryIcon />{" "}
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                className="mt-1.5"
                {...register("confirmPassword")}
                placeholder="Re-enter your new password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {renderEyeIcon(showConfirmPassword)}
              </button>
            </div>
            {errors?.confirmPassword && (
              <InputErrorMessage>
                {errors.confirmPassword.message}
              </InputErrorMessage>
            )}
          </div>
          <div className="pt-2">
            <ButtonPrimary type="submit">Update password</ButtonPrimary>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
};

export default AccountPass;
