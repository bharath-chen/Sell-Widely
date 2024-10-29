import Label from "../../components/Label/Label";
import { FC, useEffect, useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import Input from "../../shared/Input/Input";
import Select from "../../shared/Select/Select";
import { Address } from "../../models/address";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../state/store";
import { countries } from "../../data/countries";
import { states } from "../../data/states";
import Radio from "../../shared/Radio/Radio";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";

interface Props {
  selectedAddress?: Address | null;
  onSelectedAddressChange?: (address: Address) => void;
  index?: number;
  address?: Address;
  isActive: boolean;
  onAddressChange: (address: Address, index: number) => void;
  onCloseActive: () => void;
  onOpenActive: () => void;
  onDeleteAddress: (address: Address, index: number) => void;
  onAddAddress: (address: Address, index: number) => void;
  onUpdateAddress: (address: Address, index: number) => void;
}

// Zod schema for validation
const addressSchema = z.object({
  doorno: z.string().nonempty({ message: "Door number is required" }),
  street: z.string().nonempty({ message: "Street is required" }),
  location: z.string().nonempty({ message: "Location is required" }),
  pincode: z
    .string()
    .nonempty({ message: "Pincode is required" })
    .min(6, "Pincode must be 6 digits"),
  city: z.string().nonempty({ message: "City is required" }),
  state: z.string().nonempty(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const ShippingAddress: FC<Props> = ({
  index,
  address,
  isActive,
  selectedAddress,
  onSelectedAddressChange,
  onAddressChange,
  onCloseActive,
  onOpenActive,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
}) => {
  const customer = useAppSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      doorno: address?.doorno || "",
      street: address?.street || "",
      location: address?.location || "",
      pincode: address?.pincode || "",
      city: address?.city || "",
      state: address?.state || "TamilNadu",
    },
  });

  useEffect(() => {
    reset({
      doorno: address?.doorno || "",
      street: address?.street || "",
      location: address?.location || "",
      pincode: address?.pincode || "",
      city: address?.city || "",
      state: address?.state || "TamilNadu",
    });
  }, [address, reset]);

  const saveBtnText = address?.address_id
    ? "Continue to payment"
    : "Save and next to Payment";

  const onSubmit: SubmitHandler<AddressFormValues> = (
    data: AddressFormValues
  ) => {
    const updatedAddress = {
      address_id: address.address_id || "",
      customer_id: customer.customer_id,
      doorno: data.doorno,
      street: data.state,
      location: data.location,
      pincode: data.pincode,
      city: data.city,
      state: data.state,
      primary_use: "1",
      recently_use: "0",
    };

    if (!address?.address_id) {
      onAddAddress(updatedAddress, index);
    } else {
      onUpdateAddress(updatedAddress, index);
    }
    onCloseActive();
  };

  const handleDelete = () => {
    onDeleteAddress(address, index);
    onCloseActive();
  };

  const renderShippingAddress = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl mb-4">
        <div className="p-6 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0">
          {address.address_id && (
            <Radio
              name="selectedAddress"
              id="selected-address"
              defaultChecked={
                selectedAddress?.address_id === address.address_id
              }
              onChange={() => onSelectedAddressChange(address)}
              className="mr-3 sm:mr-5 mt-2 sm:mt-0"
            />
          )}
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="sm:ml-8">
            <h3 className="text-slate-700 dark:text-slate-300 flex">
              <span className="uppercase">SHIPPING ADDRESS</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            {address.address_id && (
              <div className="font-semibold mt-1 text-sm">
                <span className="">
                  {`${address?.doorno || ""}, ${address.street || ""}, ${
                    address.location
                  }, ${address.city || ""}, ${
                    address?.state || ""
                  }, ${"India"} - ${address.pincode || ""}`}
                </span>
              </div>
            )}
          </div>
          <ButtonSecondary
            sizeClass="py-2 px-4 "
            fontSize="text-sm font-medium"
            className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
            onClick={onOpenActive}
          >
            Change
          </ButtonSecondary>
          {address?.address_id && (
            <ButtonPrimary
              sizeClass="ms-2 py-2 px-4 "
              fontSize="text-sm font-medium"
              className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
              onClick={handleDelete}
            >
              Delete
            </ButtonPrimary>
          )}
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              {/* defaultValue="Cole" */}
              <div>
                <Label className="text-sm">First name</Label>
                <Input
                  className="mt-1.5"
                  value={customer.first_name}
                  disabled
                />
              </div>
              <div>
                <Label className="text-sm">Last name</Label>
                <Input className="mt-1.5" value={customer.last_name} disabled />
              </div>
            </div>

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3  my-3">
              <div className="flex-1">
                <Label className="text-sm">Door no</Label>
                <Input
                  className="mt-1.5"
                  {...register("doorno")}
                  type={"text"}
                />
                {errors.doorno && (
                  <InputErrorMessage>{errors.doorno.message}</InputErrorMessage>
                )}
              </div>
              <div className="flex-1">
                <Label className="text-sm">Street</Label>
                <Input type="text" className="mt-1.5" {...register("street")} />
                {errors.street && (
                  <InputErrorMessage>{errors.street.message}</InputErrorMessage>
                )}
              </div>
            </div>

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <div>
                <Label className="text-sm">Location</Label>
                <Input
                  className="mt-1.5"
                  type={"text"}
                  {...register("location")}
                />
                {errors.location && (
                  <InputErrorMessage>
                    {errors.location.message}
                  </InputErrorMessage>
                )}
              </div>

              <div>
                <Label className="text-sm">City</Label>
                <Input className="mt-1.5" {...register("city")} />
                {errors.city && (
                  <InputErrorMessage>{errors.city.message}</InputErrorMessage>
                )}
              </div>
            </div>

            {/* ============ */}
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

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <div>
                <Label className="text-sm">Postal code</Label>
                <Input
                  type="text"
                  className="mt-1.5"
                  {...register("pincode")}
                />
                {errors.state && (
                  <InputErrorMessage>{errors.state.message}</InputErrorMessage>
                )}
              </div>
            </div>

            {/* ============ */}
            {/* <div>
            <Label className="text-sm">Address type</Label>
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <Radio
                label={`<span class="text-sm font-medium">Home <span class="font-light">(All Day Delivery)</span></span>`}
                id="Address-type-home"
                name="Address-type"
                // value="Address-type-home"
                // checked={addressForm?.addressType === "Address-type-home"}
                // onChange={(val) =>
                //   setAddressForm({ ...addressForm, addressType: val })
                // }
                defaultChecked
              />
              <Radio
                label={`<span class="text-sm font-medium">Office <span class="font-light">(Delivery <span class="font-medium">9 AM - 5 PM</span>)</span> </span>`}
                id="Address-type-office"
                name="Address-type"
                // value="Address-type-office"
                // checked={addressForm?.addressType === "Address-type-office"}
                // onChange={(val) =>
                //   setAddressForm({ ...addressForm, addressType: val })
                // }
              />
            </div>
          </div> */}

            {/* ============ */}
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
        </div>
      </div>
    );
  };
  return renderShippingAddress();
};

export default ShippingAddress;
