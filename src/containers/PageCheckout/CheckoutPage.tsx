import Label from "../../components/Label/Label";
import Prices from "../../components/Prices";
import { Product } from "../../models/product";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Input from "../../shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import AppOfferCodes, {
  OfferCode,
} from "../../components/AppOfferCodes/AppOfferCodes";
import useViewAddressess from "../../hooks/useViewAddress";
import { Address } from "../../models/address";
import useViewCart from "../../hooks/useViewCart";
import orderService from "../../services/order-service";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../state/store";
import {
  setItems,
  selectCartTotal,
  selectCartItemCount,
} from "../../features/cart/cartSlice";
import addressService from "../../services/address-service";
import apiClient, { CanceledError } from "../../services/api-client";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import coupounService from "../../services/coupoun-service";
import { Coupon } from "../../models/Coupon";
import paymentGatewayService from "../../services/payment-gateway-service";
import { OrdersPayload } from "../AccountPage/AccountOrder";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { showModal } from "../../features/modal/modalSlice";
import { Helmet } from "react-helmet-async";

const razorpayKey = import.meta.env.VITE_RAZORPAY_API_KEY;

const CheckoutPage = () => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const { cartDetails, setCartDetails } = useViewCart();
  const { addressList, setAddressList, customer } = useViewAddressess();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "onlinePayment" | "cod"
  >("cod");
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state: RootState) => state.auth);
  const totalPrice = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart);
  const totalQuantity = useAppSelector(selectCartItemCount);
  const [tabActive, setTabActive] = useState<string>("");
  const [offerCodes, setOfferCodes] = useState<OfferCode[]>([]);
  const [offerCode, setOfferCode] = useState<string>("");
  const [discountCodeError, setDiscountCodeError] = useState<string>("");
  const [offerCodeApplied, setOfferCodeApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [offerCodePrice, setOfferCodePrice] = useState(0);

  console.log(location.state);

  useEffect(() => {
    const productDetails: Product[] =
      cartDetails && cartDetails.productDetail.length > 0
        ? cartDetails.productDetail
            .filter((p) => p)
            .map((p, index) => ({
              ...p,
              quantity: +cartDetails.cartDetail[index].quantity,
            }))
        : [];

    dispatch(setItems(productDetails));
  }, [cartDetails]);

  useEffect(() => {
    const { request, cancel } = coupounService.getAll<
      Coupon,
      { gofor: string }
    >({ gofor: "couponslist" });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        const offerCodes = res.data.map((r) => ({
          id: r.coupon_id,
          code: r.coupon_code,
          description: r.coupon_name,
          discount: +r.percentage,
        }));
        setOfferCodes(offerCodes);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
      });

    return () => cancel();
  }, []);

  const applyOfferCode = (code: string) => {
    const validCode = offerCodes.find((o) => o.code === code);

    if (!validCode) {
      setDiscountCodeError("Oops! Invalid Discount Code");
      setOfferCodeApplied(false);
      setDiscount(0);
      setOfferCodePrice(0);
      return;
    }

    coupounService
      .create<{
        gofor: string;
        customer_id: string;
        coupon_code: string;
        coprice: string;
      }>({
        gofor: "couponcode",
        customer_id: user.customer_id,
        coupon_code: validCode.code,
        coprice: totalPrice.toString(),
      })
      .then((res) => {
        if (res.data.status === "Coupon Code Expired") {
          setDiscountCodeError(res.data.status);
          setOfferCode("");
          setOfferCodeApplied(false);
          setDiscount(0);
          setOfferCodePrice(0);
        } else {
          setDiscountCodeError(null);
          setOfferCode(validCode.code);
          setOfferCodeApplied(true);
          setDiscount(validCode.discount);
          setOfferCodePrice(res.data);
        }
      });
  };

  const removeOfferCode = () => {
    setDiscountCodeError("");
    setOfferCode("");
    setOfferCodeApplied(false);
    setDiscount(0);
    setOfferCodePrice(0);
  };

  const handleOfferCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toLocaleUpperCase();
    setDiscountCodeError("");
    setOfferCode(code);
  };

  const calculateDiscount = (originalPrice: number, discountPercentage = 0) => {
    if (discountPercentage === 0) {
      return {
        discountAmount: 0.0,
        discountedPrice: originalPrice.toFixed(2),
      };
    }

    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;

    return {
      discountAmount: discountAmount.toFixed(2),
      discountedPrice: discountedPrice.toFixed(2),
    };
  };

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderProduct = (item: Product, index: number) => {
    const {
      product_id,
      product_image1,
      selling_price,
      product_name,
      quantity,
      qty,
    } = item;

    if (!item) return;

    const routeToProductDetail = () => {
      navigate(`/product-detail/${product_name}`, {
        state: {
          id: product_id,
        },
      });
    };

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <span onClick={routeToProductDetail} className="absolute inset-0">
            <img
              src={product_image1}
              alt={product_name}
              className="h-full w-full object-contain object-center"
            />
          </span>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <span onClick={routeToProductDetail}>{product_name}</span>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <p>{item.suitablefor}</p>
                </div>

                <div className="mt-3 flex justify-between w-full relative text-sm text-slate-600 dark:text-slate-300">
                  Qty: {+qty || +quantity}
                </div>

                {/* <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={+selling_price}
                  />
                </div> */}
              </div>

              <div className="flex justify-end">
                <Prices
                  price={+selling_price}
                  className="text-lg font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* <div className="hidden sm:block text-center relative">
              x {+qty || +quantity}
            </div> */}

            {/* <a
              className="cursor-pointer relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
              onClick={() => dispatch(removeFromCart(product_id))}
            >
              <span>Remove</span>
            </a> */}
          </div>
        </div>
      </div>
    );
  };

  const handleAddressChange = (updatedAddress: Address, index: number) => {
    console.log(updatedAddress);
    setAddressList((prevAddress) =>
      prevAddress.map((address, idx) => {
        if (index === idx) return { ...address, ...updatedAddress };

        return address;
      })
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              if (addressList.length > 0) {
                setTabActive("ShippingAddress0");
                handleScrollToEl("ShippingAddress0");
              } else {
                setTabActive(`PaymentMethod`);
                handleScrollToEl("PaymentMethod");
              }
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <button
            onClick={handleAddAddress}
            className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl sm:!px-7 shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 mb-4"
          >
            Add Address
          </button>
          {addressList.map((address, index) => (
            <ShippingAddress
              address={address}
              key={address.address_id}
              onAddressChange={handleAddressChange}
              onUpdateAddress={updateAddress}
              onAddAddress={addAddress}
              onDeleteAddress={deleteAddress}
              selectedAddress={selectedAddress}
              onSelectedAddressChange={setSelectedAddress}
              isActive={tabActive === "ShippingAddress" + index}
              onOpenActive={() => {
                setTabActive(("ShippingAddress" + index) as string);
                handleScrollToEl("ShippingAddress" + index);
              }}
              onCloseActive={() => {
                setTabActive("PaymentMethod");
                handleScrollToEl("PaymentMethod");
              }}
            />
          ))}
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            method={selectedPaymentMethod}
            onChange={setSelectedPaymentMethod}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onConfirmOrder={handleConfirmOrder}
            onCloseActive={() => setTabActive("")}
          />
        </div>
      </div>
    );
  };

  const handleAddAddress = () => {
    const index = addressList.length;
    if (index !== -1) {
      if (addressList.length <= 2) {
        const list = [...addressList];
        list.push({} as Address);
        setAddressList(list);
        setTabActive("ShippingAddress" + index);
        handleScrollToEl("ShippingAddress" + index);
      } else {
        dispatch(
          showModal({ type: "info", message: "Max of 3 address can be added" })
        );
      }
    }
  };

  const getAddressList = () => {
    const controller = new AbortController();

    dispatch(showLoader());

    apiClient
      .get<Address[]>(
        `?gofor=addresslist&customer_id=${customer.customer_id}`,
        { signal: controller.signal }
      )
      .then((res) => {
        dispatch(hideLoader());
        setAddressList(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        console.log(err.message);
      });
  };

  const addAddress = (address: Address, index: number) => {
    const payload = {
      gofor: "addaddress",
      customer_id: user.customer_id,
      doorno: address.doorno,
      street: address.street,
      location: address.location,
      pincode: address.pincode,
      city: address.city,
      state: address.state,
      primary_use: "1",
      recently_use: "0",
    };

    dispatch(showLoader());

    addressService
      .create<{
        gofor: string;
        customer_id: string;
        doorno: string;
        street: string;
        location: string;
        pincode: string;
        city: string;
        state: string;
        primary_use: string;
        recently_use: string;
      }>(payload)
      .then((res) => {
        dispatch(hideLoader());
        if (res.data) {
          dispatch(
            showModal({
              type: "success",
              message: "Address added successfully!",
            })
          );
        }
        getAddressList();
      })
      .catch((err) => {
        dispatch(hideLoader());
      });
  };

  const updateAddress = (address: Address, index: number) => {
    const payload = {
      gofor: "editaddress",
      customer_id: user.customer_id,
      doorno: address.doorno,
      street: address.street,
      location: address.location,
      pincode: address.pincode,
      city: address.city,
      state: address.state,
      primary_use: "1",
      recently_use: "0",
    };

    dispatch(showLoader());

    addressService
      .create<{
        gofor: string;
        customer_id: string;
        doorno: string;
        street: string;
        location: string;
        pincode: string;
        city: string;
        state: string;
        primary_use: string;
        recently_use: string;
      }>(payload)
      .then((res) => {
        dispatch(hideLoader());
        if (res.data) {
          dispatch(
            showModal({
              type: "success",
              message: "Address updated successfully!",
            })
          );
        }
        getAddressList();
      })
      .catch((err) => {
        dispatch(hideLoader());
      });
  };

  const deleteAddress = (address: Address, index: number) => {
    const prevAddressList = addressList;
    const updatedAddressList = [...addressList];
    updatedAddressList.splice(index, 1);
    setAddressList(updatedAddressList);

    if (address.address_id) {
      const { request } = addressService.get<
        null,
        { gofor: string; address_id: string }
      >({ gofor: "deleteaddress", address_id: address.address_id });

      dispatch(showLoader());

      request
        .then((res) => {
          console.log(res.data);
          dispatch(hideLoader());
          getAddressList();
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;

          dispatch(hideLoader());
          setAddressList(prevAddressList);
        });
    }
  };

  const calculatedTotalAmount = () =>
    +calculateDiscount(totalPrice, discount).discountedPrice +
    (+location?.state?.shippingEstimate || 0);

  const subTotal = (
    totalPrice - +calculateDiscount(totalPrice, discount).discountAmount
  ).toFixed(2);

  const total = (+calculatedTotalAmount()).toFixed(2);

  const handleConfirmOrder = async () => {
    const isLessThan330 = +calculatedTotalAmount() < 330;

    const finalPrice = +calculatedTotalAmount();

    if (isLessThan330) {
      dispatch(
        showModal({
          type: "info",
          message:
            "Oops! Your order needs to be at least ₹330 to proceed. Please add a few more items to your cart!",
        })
      );
      return;
    }

    interface CreateOrderPayload {
      gofor: string;
      customer_id: string;
      address_id: string;
      invoice_amount: string;
      fullquantity: string;
      delivery_charge: string;
      total_amount: string;
      payment_mode: string;
      product_details: { product_id: string; quantity: string }[];
    }

    if (!selectedAddress || !selectedAddress.address_id) {
      // alert("Please complete all required fields.");
      dispatch(
        showModal({
          type: "error",
          message: "Kindly select a primary address",
        })
      );
      return;
    }

    const payload: CreateOrderPayload = {
      gofor: "createorders",
      customer_id: user.customer_id,
      address_id: selectedAddress?.address_id || "1",
      invoice_amount: subTotal,
      fullquantity: totalQuantity.toString(),
      delivery_charge: location?.state?.shippingEstimate.toString() || "0",
      total_amount: finalPrice.toString(),
      payment_mode: selectedPaymentMethod,
      product_details: cart.items.map((c) => ({
        product_id: c.product_id,
        quantity: c.quantity.toString(),
      })),
    };

    dispatch(showLoader()); // Show loader at the start

    try {
      const orderResponse = await orderService.create<CreateOrderPayload>(
        payload
      );

      if (selectedPaymentMethod === "onlinePayment") {
        const ordersRes = await orderService.get<
          OrdersPayload,
          { gofor: string; customer_id: string }
        >({
          gofor: "vieworders",
          customer_id: customer?.customer_id,
        }).request;

        const filteredOrders = ordersRes.data.viewOrders.filter(
          (o) => o.order_id
        );
        dispatch(hideLoader());

        if (filteredOrders.length > 0) {
          const { request } = paymentGatewayService.onlinePayment(
            user.customer_id,
            filteredOrders[0].order_id
          );

          dispatch(showLoader());
          const paymentResponse = await request;

          const options: RazorpayOrderOptions = {
            key: razorpayKey,
            amount: finalPrice * 100,
            currency: "INR",
            // name: "Almaa Herbal Nature Pvt Ltd",
            name: "Test Company",
            description: "Test Transaction",
            order_id: paymentResponse.data.order_id,
            handler: async (response) => {
              try {
                const { request } =
                  paymentGatewayService.verifyPayment(response);
                const verificationResponse = await request;

                if (
                  verificationResponse.data.response === "Payment Successful"
                ) {
                  dispatch(hideLoader());
                  dispatch(
                    showModal({
                      type: "success",
                      message: "Order Proccessed Successfully!",
                    })
                  );
                  navigate("/thanks");
                }
              } catch (verificationError) {
                dispatch(hideLoader());
                dispatch(
                  showModal({ type: "error", message: "Payment Failed" })
                );
              }
            },
            prefill: {
              name: `${user.first_name} ${user.last_name}`,
              email: user.email,
              contact: user.mobilenumber,
            },
            theme: {
              color: "#F37254",
            },
          };

          const razorpayInstance = new Razorpay(options);
          razorpayInstance.open();
          dispatch(hideLoader());
        } else {
          showModal({
            type: "info",
            message: "No valid orders found.",
          });
        }
      } else {
        dispatch(hideLoader());
        navigate("/thanks");
      }
    } catch (error) {
      dispatch(hideLoader());
      if (error instanceof CanceledError) return;

      dispatch(
        showModal({
          type: "error",
          message: "Failed to process the order. Please try again.",
        })
      );
    }
  };

  return (
    <div className="nc-CheckoutPage">
      <Helmet>
        <title>Almaa</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link to={"/"} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link to={"/products"} className="">
              Products
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {cart.items.length > 0 && (
            <div className="flex-1">{renderLeft()}</div>
          )}

          {cart.items && cart.items.length > 0 && (
            <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>
          )}

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {cart.items && cart.items.length <= 0 && (
                <>
                  <p className="text-md font-semibold text-center">
                    No Items were added in the cart
                  </p>
                  <ButtonPrimary href="/products" className="mt-8 w-full">
                    Back To Products
                  </ButtonPrimary>
                </>
              )}
              {cart &&
                cart.items.length > 0 &&
                cart.items.map((item, index) => {
                  return renderProduct(item as Product, index);
                })}
            </div>

            {cart.items.length > 0 && (
              <>
                <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
                  <div>
                    <Label className="text-sm my-3">Discount code</Label>

                    {offerCodeApplied && (
                      <div className="flex mt-1.5 py-4 px-4 justify-between w-full border border-2 rounded-lg border-slate-200 bg-slate-200">
                        <span className="text-md ">
                          <span className="text-primary-900 font-semibold pr-2">
                            '{offerCode}' applied successfully!
                          </span>
                        </span>
                        <button type="button" onClick={removeOfferCode}>
                          <svg
                            className="w-6 h-6 text-primary-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    {!offerCodeApplied && (
                      <div className="flex mt-1.5">
                        <Input
                          sizeClass="h-10 px-4 py-3"
                          className="flex-1 uppercase"
                          value={offerCode}
                          onChange={handleOfferCodeChange}
                        />
                        <button
                          disabled={!offerCode}
                          onClick={() => applyOfferCode(offerCode)}
                          className={
                            "text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors " +
                            (!offerCode
                              ? "bg-neutral-50 cursor-not-allowed"
                              : "bg-neutral-100 cursor-pointer hover:bg-neutral-100")
                          }
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {discountCodeError && (
                      <p className="pl-3 mt-2 text-red-600">
                        {discountCodeError}
                      </p>
                    )}
                  </div>

                  {!offerCodeApplied && (
                    <AppOfferCodes
                      offerCodes={offerCodes}
                      onApply={applyOfferCode}
                    />
                  )}

                  <div className="mt-4 flex justify-between py-2.5">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      ₹{subTotal}
                      {/* {(
                        totalPrice -
                        +calculateDiscount(totalPrice, discount).discountAmount
                      ).toFixed(2)} */}
                    </span>
                  </div>
                  {location.state?.shippingEstimate !== 0 && (
                    <div className="flex justify-between py-2.5">
                      <span>Shipping estimate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        ₹{location.state?.shippingEstimate.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {/* <div className="flex justify-between py-2.5">
                    <span>Tax estimate</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      ₹24.90
                    </span>
                  </div> */}
                  <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                    <span>Order total</span>
                    <span>
                      {/* + 24.9 */}₹{total}
                    </span>
                  </div>
                </div>
                <ButtonPrimary
                  onClick={handleConfirmOrder}
                  className="mt-8 w-full"
                >
                  Confirm order
                </ButtonPrimary>
                <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <p className="block relative pl-5">
                    <svg
                      className="w-4 h-4 absolute -left-1 top-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9945 16H12.0035"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Learn more{` `}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="##"
                      className="text-slate-900 dark:text-slate-200 underline font-medium"
                    >
                      Taxes
                    </a>
                    <span>
                      {` `}and{` `}
                    </span>
                    <Link
                      to="/shipping-policy"
                      className="text-slate-900 dark:text-slate-200 underline font-medium"
                    >
                      Shipping
                    </Link>
                    {` `} infomation
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
