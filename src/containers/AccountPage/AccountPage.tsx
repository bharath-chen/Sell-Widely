import Label from "../../components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Input from "../../shared/Input/Input";
import Select from "../../shared/Select/Select";
import Textarea from "../../shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet-async";
import { avatarImgs } from "../../contains/fakeData";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../state/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import customerService from "../../services/customer-service";
import { Customer } from "../../models/customer";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { CanceledError } from "axios";
import { z } from "zod";
import MandatoryIcon from "../../components/MandatoryIcon/MandatoryIcon";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import { showModal } from "../../features/modal/modalSlice";
import userPlaceholderImg from "../../assets/fff0263a-8f19-4b74-8f3d-fc24b9561a96.svg";

export interface AccountPageProps {
  className?: string;
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobilePattern = /^\d{10}$/;

const schema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .refine(
      (value) => emailPattern.test(value),
      "Please enter a valid email address"
    ),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use dd/mm/yyyy."),
  phoneNumber: z
    .string()
    .nonempty("Mobile number is required")
    .refine(
      (value) => mobilePattern.test(value),
      "Please enter a valid email address or 10-digit mobile number"
    ),
});

type AccountFormData = z.infer<typeof schema>;

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const customer = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AccountFormData>({ resolver: zodResolver(schema) });

  const fetchCustomerDetails = () => {
    const { request, cancel } = customerService.get<
      Customer,
      { gofor: string; customer_id: string }
    >({ gofor: "customersget", customer_id: customer.customer_id });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        const data = res.data;
        setValue("firstName", data.first_name);
        setValue("lastName", data.last_name);
        setValue("dateOfBirth", data.dob);
        setValue("email", data.email);
        setValue("phoneNumber", data.mobilenumber);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        dispatch(hideLoader());
      });

    return () => cancel(); // Call cancel on cleanup
  };

  useEffect(() => {
    const cancelRequest = fetchCustomerDetails();

    return () => cancelRequest();
  }, []);

  const handleAccountUpdate = (data: AccountFormData) => {
    const payload = {
      gofor: "customersedit",
      customer_id: customer.customer_id,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      mobilenumber: data.phoneNumber,
      dob: data.dateOfBirth,
    };

    dispatch(showLoader());

    customerService.create<Customer>(payload).then((res) => {
      dispatch(hideLoader());
      dispatch(
        showModal({
          type: "success",
          message: "Account details has been updated successfully!",
        })
      );
      fetchCustomerDetails();
    });
  };

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Almaa</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Account infomation
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              {/* AVATAR */}
              <div className="relative rounded-full overflow-hidden flex">
                <img
                  src={userPlaceholderImg}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                {/* <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                /> */}
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <form
                onSubmit={handleSubmit(handleAccountUpdate)}
                className="space-y-6"
              >
                <div>
                  <Label>
                    First name <MandatoryIcon />
                  </Label>
                  <Input className="mt-1.5" {...register("firstName")} />
                  {errors.firstName && (
                    <InputErrorMessage>
                      {errors.firstName.message}
                    </InputErrorMessage>
                  )}
                </div>
                <div>
                  <Label>
                    Last name <MandatoryIcon />{" "}
                  </Label>
                  <Input className="mt-1.5" {...register("lastName")} />
                  {errors.lastName && (
                    <InputErrorMessage>
                      {errors.lastName.message}
                    </InputErrorMessage>
                  )}
                </div>

                {/* ---- */}

                {/* ---- */}
                <div>
                  <Label>
                    Email <MandatoryIcon />
                  </Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-envelope"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      // placeholder="example@email.com"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <InputErrorMessage>
                      {errors.email.message}
                    </InputErrorMessage>
                  )}
                </div>

                {/* ---- */}
                <div>
                  <Label>
                    Date of birth <MandatoryIcon />{" "}
                  </Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-calendar"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      type="date"
                      {...register("dateOfBirth")}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <InputErrorMessage>
                      {errors.dateOfBirth.message}
                    </InputErrorMessage>
                  )}
                </div>
                {/* ---- */}
                {/* <div>
                  <Label>Addess</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-map-signs"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      defaultValue="New york, USA"
                    />
                  </div>
                </div> */}

                {/* ---- */}
                {/* <div>
                <Label>Gender</Label>
                <Select className="mt-1.5">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div> */}

                {/* ---- */}
                <div>
                  <Label>
                    Phone number <MandatoryIcon />{" "}
                  </Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-phone-volume"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <InputErrorMessage>
                      {errors.phoneNumber.message}
                    </InputErrorMessage>
                  )}
                </div>
                {/* ---- */}
                {/* <div>
                <Label>About you</Label>
                <Textarea className="mt-1.5" defaultValue="..." />
              </div> */}
                <div className="pt-2">
                  <ButtonPrimary type="submit">Update account</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
