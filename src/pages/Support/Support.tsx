import { FC } from "react";
import { Helmet } from "react-helmet-async";
import SocialsList from "../../shared/SocialsList/SocialsList";
import Label from "../../components/Label/Label";
import Input from "../../shared/Input/Input";
import Textarea from "../../shared/Textarea/Textarea";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import EmailSubscribeSection from "../../shared/EmailSubscribeSection/EmailSubscribeSection";
import GMap from "../../components/GMap/GMap";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import MandatoryIcon from "../../components/MandatoryIcon/MandatoryIcon";
import supportService from "../../services/support-service";
import { type Support as SupportData } from "../../models/support";
import { useAppDispatch } from "../../hooks/hooks";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { showModal } from "../../features/modal/modalSlice";
import { CanceledError } from "axios";
import Select from "../../shared/Select/Select";

export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "ADDRESS",
    desc: `#10, Pillaiyar Koil Street, Saidapet, Chennai - 600015, Tamil Nadu, India`,
  },
  {
    title: "EMAIL",
    desc: "almaahospital@gmail.com",
  },
  {
    title: "PHONE",
    desc: "+91-7401403000",
  },
];
const mobilePattern = /^\d{10}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  mobileNumber: z
    .string()
    .nonempty("Mobile Number is required")
    .refine(
      (value) => mobilePattern.test(value),
      "Please enter a valid 10-digit mobile number"
    ),
  emailAddress: z
    .string()
    .nonempty("Email is required")
    .refine(
      (value) => emailPattern.test(value),
      "Please enter a valid email address"
    ),
  location: z.string().nonempty("Location is required"),
  subject: z
    .string()
    .nonempty("Enquiry for is required")
    .refine((value) => {
      return value !== "";
    }, "Please select a Enquiry"),
  message: z.string().nonempty("Message is required"),
});

type SupportFormInputs = z.infer<typeof schema>;

const Support: FC<PageContactProps> = ({ className = "" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportFormInputs>({ resolver: zodResolver(schema) });

  const dispatch = useAppDispatch();

  const submit = (data: SupportFormInputs) => {
    const payload = {
      name: data.name,
      email: data.emailAddress,
      mobilenumber: data.mobileNumber,
      location: data.location,
      subject: data.subject,
      message: data.message,
      gofor: "contactform",
    };
    reset();

    dispatch(showLoader());

    supportService
      .create<SupportData>(payload)
      .then((res) => {
        dispatch(hideLoader());
        dispatch(
          showModal({
            type: "success",
            message: "Your message has been submitted successfully.",
          })
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        dispatch(
          showModal({
            type: "error",
            message: "Something went wrong! Please try again later.",
          })
        );
      });
  };

  return (
    <div
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>Almaa</title>
      </Helmet>
      <div className="">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Support
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              <div>
                <h2 className="uppercase font-semibold text-md dark:text-neutral-200 tracking-wider">
                  Almaa Herbal Nature Pvt Ltd
                </h2>
              </div>
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form
                onSubmit={handleSubmit(submit)}
                className="grid grid-cols-1 gap-6"
              >
                <label className="block">
                  <Label>
                    Name <MandatoryIcon />
                  </Label>

                  <Input
                    placeholder="Enter your full name"
                    type="text"
                    className="mt-1"
                    {...register("name")}
                  />

                  {errors.name && (
                    <InputErrorMessage>{errors.name.message}</InputErrorMessage>
                  )}
                </label>
                <label className="block">
                  <Label>
                    Mobile Number <MandatoryIcon />
                  </Label>

                  <Input
                    placeholder="Enter your 10-digit mobile number"
                    type="text"
                    className="mt-1"
                    {...register("mobileNumber")}
                  />
                  {errors.mobileNumber && (
                    <InputErrorMessage>
                      {errors.mobileNumber.message}
                    </InputErrorMessage>
                  )}
                </label>
                <label className="block">
                  <Label>
                    Email address <MandatoryIcon />
                  </Label>

                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="mt-1"
                    {...register("emailAddress")}
                  />

                  {errors.emailAddress && (
                    <InputErrorMessage>
                      {errors.emailAddress.message}
                    </InputErrorMessage>
                  )}
                </label>
                <label className="block">
                  <Label>
                    Location <MandatoryIcon />
                  </Label>

                  <Input
                    type="text"
                    placeholder="Enter your city or location"
                    className="mt-1"
                    {...register("location")}
                  />
                  {errors.location && (
                    <InputErrorMessage>
                      {errors.location.message}
                    </InputErrorMessage>
                  )}
                </label>
                <label className="block">
                  <Label>
                    Enquiry for <MandatoryIcon />{" "}
                  </Label>
                  <Select className="mt-1" {...register("subject")}>
                    <option value="">Select</option>
                    <option value="Almaa Product Details">
                      Almaa Product Details{" "}
                    </option>
                    <option value="⁠Doctor Discussion">
                      {" "}
                      ⁠Doctor Discussion{" "}
                    </option>
                    <option value="⁠Therapy @ Chennai">
                      {" "}
                      ⁠Therapy @ Chennai{" "}
                    </option>
                    <option value="⁠Wellness @ Ilavambadi">
                      {" "}
                      ⁠Wellness @ Ilavambadi{" "}
                    </option>
                    <option value="⁠Treatment @ Ilavambadi">
                      {" "}
                      ⁠Treatment @ Ilavambadi{" "}
                    </option>
                    <option value="⁠Meet Almaa Velayudham">
                      {" "}
                      ⁠Meet Almaa Velayudham{" "}
                    </option>
                    <option value="⁠Become a Vendor"> ⁠Become a Vendor </option>
                    <option value="⁠Others"> ⁠Others</option>
                  </Select>
                  {errors.subject && (
                    <InputErrorMessage>
                      {errors.subject.message}
                    </InputErrorMessage>
                  )}
                </label>
                <label className="block">
                  <Label>
                    Message <MandatoryIcon />{" "}
                  </Label>

                  <Textarea
                    placeholder="Enter your message or inquiry"
                    className="mt-1"
                    rows={6}
                    {...register("message")}
                  />
                  {errors.message && (
                    <InputErrorMessage>
                      {errors.message.message}
                    </InputErrorMessage>
                  )}
                </label>
                <div>
                  <ButtonPrimary type="submit">Send Message</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container my-20">
        <GMap height="400px" />
        {/* <div className="relative my-24 lg:my-32 py-24 lg:py-32">
          <BackgroundSection />
          <SectionPromo1 />
        </div> */}
      </div>

      {/* EMAIL SUBSCRIBE SECTION */}
      <section className="mt-40">
        <EmailSubscribeSection />
      </section>
    </div>
  );
};

export default Support;
