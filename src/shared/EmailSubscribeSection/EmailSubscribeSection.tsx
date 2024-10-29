import Input from "../../shared/Input/Input";
import emailSubscribeImg from "../../assets/subscribe-section.png";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import Heading from "../../components/Heading/Heading";
import NcImage from "../NcImage/NcImage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  subscribeImg?: string;
}

const mobilePattern = /^\d{10}$/;

const schema = z.object({
  mobileNo: z
    .string()
    .nonempty("Mobile number is required")
    .refine(
      (value) => mobilePattern.test(value),
      "Please enter a valid 10-digit mobile number"
    ),
});

type FormInput = z.infer<typeof schema>;

const EmailSubscribeSection = ({ subscribeImg = emailSubscribeImg }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormInput) => {
    const mobileNo = 9003000888;
    const whatsappURL = `https://wa.me/91${mobileNo}`;
    reset();

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="container">
      <div className="relative py-16 lg:py-16">
        <BackgroundSection className="bg-amber-100/70 dark:bg-black/20 md:h-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
          {/* Text and Form Section */}
          <div className="order-last md:order-first">
            <Heading
              className="mb-5 lg:mb-5 text-neutral-900 dark:text-neutral-50"
              fontClass="sm:text-md md:text-2xl lg:text-4xl font-semibold"
              rightDescText="Be Healthy"
            >
              <span className="mb-2">
                Let's Connect, <br />{" "}
              </span>
            </Heading>
            <p className="sm:text-sm md:text-md lg:text-2xl text-neutral-700 font-medium">
              Connect with Almaa Consultants & Experts for any medical issues/
              queries related to diseases through Whatsapp
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 relative max-w-sm md:max-w-none"
            >
              <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                {/* Mobile Number Input */}
                <div className="flex-grow w-full md:w-3/4">
                  {" "}
                  {/* Modified width on tablet */}
                  <Input
                    type="tel"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-full text-sm font-normal h-11 px-4 py-3"
                    aria-required="true"
                    placeholder="Enter your Mobile Number"
                    {...register("mobileNo")}
                  />
                </div>

                {/* WhatsApp Button */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <button
                    className="flex items-center justify-center rounded-full bg-slate-900 hover:bg-slate-800 text-slate-50 w-full md:w-auto px-6 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                    type="submit"
                  >
                    Let's Connect
                  </button>
                </div>
              </div>

              {/* Custom Error Message */}
              {errors.mobileNo && (
                <p className="text-red-600 text-sm mt-2 ml-3">
                  {errors.mobileNo.message}
                </p>
              )}
            </form>
          </div>

          {/* Image Section */}
          <div className="relative md:top-[-150px]">
            <NcImage
              className="w-full h-auto object-contain md:object-cover rounded-lg"
              src={subscribeImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSubscribeSection;
