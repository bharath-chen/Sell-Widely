import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import Label from "../../components/Label/Label";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import Input from "../../shared/Input/Input";
import Select from "../../shared/Select/Select";
import { countries } from "../../data/countries";
import { states } from "../../data/states";

const formSchema = z.object({
  doorno: z.string().nonempty("Door no is required"),
  street: z.string().nonempty("Street is required"),
  location: z.string().nonempty("Location is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .nonempty("Pincode is required"),
});

type FormData = z.infer<typeof formSchema>;

interface AddressFormModalProps {
  customer: {
    first_name: string;
    lastName: string;
  };
  saveBtnText: string;
  onSubmit: (data: FormData) => void;
  onCloseActive: () => void;
}

const AddressFormModal: React.FC<AddressFormModalProps> = ({
  customer,
  saveBtnText,
  onSubmit,
  onCloseActive,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First and Last Name (Disabled Fields) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
        <div>
          <Label className="text-sm">First name</Label>
          <Input className="mt-1.5" value={customer.first_name} disabled />
        </div>
        <div>
          <Label className="text-sm">Last name</Label>
          <Input className="mt-1.5" value={customer.lastName} disabled />
        </div>
      </div>

      {/* Address Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 my-3">
        <div>
          <Label className="text-sm">Door no</Label>
          <Input className="mt-1.5" {...register("doorno")} type="text" />
          {errors.doorno && (
            <InputErrorMessage>{errors.doorno.message}</InputErrorMessage>
          )}
        </div>
        <div>
          <Label className="text-sm">Street</Label>
          <Input className="mt-1.5" {...register("street")} type="text" />
          {errors.street && (
            <InputErrorMessage>{errors.street.message}</InputErrorMessage>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
        <div>
          <Label className="text-sm">Location</Label>
          <Input className="mt-1.5" {...register("location")} type="text" />
          {errors.location && (
            <InputErrorMessage>{errors.location.message}</InputErrorMessage>
          )}
        </div>
        <div>
          <Label className="text-sm">City</Label>
          <Input className="mt-1.5" {...register("city")} type="text" />
          {errors.city && (
            <InputErrorMessage>{errors.city.message}</InputErrorMessage>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 my-3">
        <div>
          <Label className="text-sm">Country</Label>
          <Select className="mt-1.5" defaultValue={"India"} disabled>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label className="text-sm">State/Province</Label>
          <Select className="mt-1.5" {...register("state")}>
            {states.map((state) => (
              <option key={state.label} value={state.value}>
                {state.label}
              </option>
            ))}
          </Select>
          {errors.state && (
            <InputErrorMessage>{errors.state.message}</InputErrorMessage>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
        <div>
          <Label className="text-sm">Postal code</Label>
          <Input className="mt-1.5" {...register("pincode")} type="text" />
          {errors.pincode && (
            <InputErrorMessage>{errors.pincode.message}</InputErrorMessage>
          )}
        </div>
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex flex-col sm:flex-row pt-6">
        <ButtonPrimary type="submit" className="sm:!px-7 shadow-none">
          {saveBtnText}
        </ButtonPrimary>
        <ButtonSecondary
          className="mt-3 sm:mt-0 sm:ml-3"
          onClick={onCloseActive}
        >
          Cancel
        </ButtonSecondary>
      </div>
    </form>
  );
};

export default AddressFormModal;
