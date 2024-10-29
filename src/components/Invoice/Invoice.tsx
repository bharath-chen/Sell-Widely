import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderData } from "../../models/order";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { RootState } from "../../state/store";
import almaaLogo from "../../assets/almaa-logo-small.png";
import { ToWords } from "to-words";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [isPdfDownloading, setPdfDownloading] = useState(false);
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state: RootState) => state.auth);

  const handleDownload = () => {
    const element = invoiceRef?.current;
    if (!element) return;

    setPdfDownloading(true);
    dispatch(showLoader());
    setTimeout(() => {
      const opt = {
        margin: 0.5,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
      setPdfDownloading(false);
      dispatch(hideLoader());
    }, 1);
  };

  const handleBack = () => {
    navigate("/account-my-order");
  };

  useEffect(() => {
    if (!location.state?.order) {
      navigate(-1);
    }
  }, [location.state, navigate]);

  if (!location.state?.order) {
    return null;
  }

  const disableRightClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const disableKeyShortcuts = (e: KeyboardEvent) => {
      // Disable F12 (Developer Tools)
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Disable Ctrl+Shift+I (Inspect Element)
      if (
        (e.ctrlKey && e.shiftKey && e.key === "i") ||
        (e.metaKey && e.shiftKey && e.key === "i")
      ) {
        e.preventDefault();
      }

      if (
        (e.ctrlKey && e.shiftKey && e.key === "c") ||
        (e.metaKey && e.shiftKey && e.key === "c")
      ) {
        e.preventDefault();
      }

      // Disable Ctrl+U (View Page Source)
      if ((e.ctrlKey && e.key === "u") || (e.metaKey && e.key === "u")) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableKeyShortcuts);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableKeyShortcuts);
    };
  }, []);

  const orderData: OrderData = location.state.order;
  const totalQuantity = orderData.orderDetails.reduce(
    (total, o) => total + +o.quantity,
    0
  );
  const overAllSubTotal = orderData.products.reduce(
    (total, p, index) =>
      total + +p.unit_price * +orderData.orderDetails[index].quantity,
    0
  );
  const overAllTax = orderData.products.reduce((total, p, index) => {
    const cgst = +p.product_cgst;
    const sgst = +p.product_sgst;
    const gst =
      ((+p.unit_price * (cgst + sgst)) / 100) *
      +orderData.orderDetails[index].quantity;

    return total + gst;
  }, 0);
  const deliveryCharge = +orderData.order.delivery_charge;
  const gstSplitUpAmount = overAllTax / 2;
  const address = orderData.addressDetails.find(
    (a) => orderData.order.address_id === a.address_id
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <ButtonPrimary
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2 sm:mb-0 sm:mr-2"
          onClick={handleBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          back
        </ButtonPrimary>
        <ButtonPrimary
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleDownload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download
        </ButtonPrimary>
      </div>

      {orderData?.order && (
        <div
          className="bg-white shadow-md rounded-lg p-4 sm:p-6"
          ref={invoiceRef}
        >
          {/* Logo Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <img
              src={almaaLogo}
              alt="Almaa Logo"
              className="h-[60px] sm:h-[80px]"
            />
            <div className="text-center sm:text-right mt-4 sm:mt-0">
              <p className="font-bold">Almaa Herbal Nature Pvt Ltd</p>
              <p>#10, Pillaiyar Koil Street, Saidapet,</p>
              <p>Chennai - 600015, Tamil Nadu, India</p>
              <p>Phone: 044-4635 9999</p>
              <p>Mobile: 900 3000 888 / 740 140 3010</p>
              <p>Email: almaaonlinedata@gmail.com</p>
              <p>Website: www.almaaherbal.com</p>
            </div>
          </div>

          <div className="border-b-2 mt-4 mb-4"></div>

          {/* Invoice Details */}
          <div className="flex justify-end items-center mb-10">
            <div>
              <p className="font-semibold">
                INVOICE No: {orderData.order.invoice_number}
              </p>
              <p>{orderData.order.created}</p>
            </div>
          </div>

          {/* Invoice Information */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <h2 className="font-semibold">Billing Information</h2>
              <p>
                Name: {customer.first_name} {customer.last_name}
              </p>
              <p>Phone: {customer.mobilenumber}</p>
              {address && (
                <p>
                  Address: No {address.doorno} {address.street},{" "}
                  {address.location}, {address.city}, {address.state}{" "}
                  {address.pincode}
                </p>
              )}
              <p className="mt-5 mb-5">
                Payment Method: {orderData.order.payment_mode}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Shipping Information</h2>
              <p>Name: {customer.first_name}</p>
              <p>Phone: {customer.mobilenumber}</p>
              {address && (
                <>
                  <p>
                    Address: No {address.doorno} {address.street},{" "}
                    {address.location},
                  </p>
                  <p>
                    {address.city}, {address.state} {address.pincode}
                  </p>
                </>
              )}
              <p className="mt-5 mb-5">Shipping Method: Courier / Postal</p>
            </div>
          </div>

          {/* Table Section */}
          <div
            className={
              isPdfDownloading
                ? "px-4"
                : "overflow-x-auto overflow-y-auto max-h-64 px-4"
            }
          >
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr>
                  <th className="border-b-2 px-2 sm:px-4 py-2">Item#</th>
                  <th className="border-b-2 px-2 sm:px-4 py-2">Product</th>
                  <th className="border-b-2 px-2 sm:px-4 py-2">GST (%)</th>
                  <th className="border-b-2 px-2 sm:px-4 py-2">QTY</th>
                  <th className="border-b-2 px-2 sm:px-4 py-2">
                    Unit Price (₹)
                  </th>
                  <th className="border-b-2 px-2 sm:px-4 py-2">
                    Sub Total (₹)
                  </th>
                  <th className="border-b-2 px-2 sm:px-4 py-2">Tax (₹)</th>
                  <th className="border-b-2 px-2 sm:px-4 py-2">Total (₹)</th>
                </tr>
              </thead>
              {orderData.products && (
                <tbody>
                  {orderData.products.map((p, index: number) => {
                    const quantity = +orderData.orderDetails[index].quantity;
                    const gst = +p.product_sgst + +p.product_cgst;
                    const tax = ((+p.unit_price * gst) / 100) * quantity;
                    const total = +p.selling_price * quantity;
                    const price = +p.unit_price * quantity;

                    return (
                      <tr key={p.product_id}>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {p.product_name}
                        </td>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {gst.toFixed(2)}
                        </td>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {quantity}
                        </td>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {(+p.unit_price).toFixed(2)}
                        </td>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {price.toFixed(2)}
                        </td>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {tax.toFixed(2)}
                        </td>
                        <td className="border-b-2 px-2 sm:px-4 py-2">
                          {total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
              <tfoot>
                <tr>
                  <td className="px-2 sm:px-4 py-2 font-semibold" colSpan={3}>
                    Total
                  </td>
                  <td className="px-2 sm:px-4 py-2" colSpan={2}>
                    {totalQuantity}
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    {overAllSubTotal.toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{overAllTax.toFixed(2)}</td>
                  <td className="px-2 sm:px-4 py-2">
                    {(+orderData.order.invoice_amount).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 sm:mt-20 px-4">
            {/* Left column with CGST, SGST, and Amount in Words */}
            <div className="self-end">
              <p className="font-semibold">
                CGST: ₹{gstSplitUpAmount.toFixed(2)} | SGST: ₹
                {gstSplitUpAmount.toFixed(2)} | Delivery Charges: ₹
                {deliveryCharge.toFixed(2)}
              </p>
              <p className="font-semibold">
                Amount (In words):{" "}
                {toWords.convert(+orderData.order.total_amount)}
              </p>
            </div>

            {/* Right column with Total, Discount, Delivery Charges, and Grand Total */}
            <div className="flex justify-end">
              <div className="w-full sm:w-auto grid gap-2">
                <div className="flex justify-between">
                  <p className="text-md mr-5">Total:</p>
                  <p className="text-md">
                    ₹{(+orderData.order.invoice_amount).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md mr-5">Discount:</p>
                  <p className="text-md">
                    ₹{(+orderData.order.discount || 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md mr-5">Delivery Charges:</p>
                  <p className="text-md">₹{deliveryCharge.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold text-lg mr-5">Grand Total:</p>
                  <p className="font-bold text-lg">
                    ₹{(+orderData.order.total_amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  //   return (
  //     <div className="container mx-auto p-6 max-w-full">
  //       <div className="flex justify-between mb-4">
  //         <ButtonPrimary
  //           className="px-4 py-2 bg-blue-500 text-white rounded"
  //           onClick={handleBack}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="size-6 mr-3"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  //             />
  //           </svg>
  //           back
  //         </ButtonPrimary>
  //         <ButtonPrimary
  //           className="px-4 py-2 bg-blue-500 text-white rounded"
  //           onClick={handleDownload}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="size-6 mr-3"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
  //             />
  //           </svg>
  //           Download
  //         </ButtonPrimary>
  //       </div>
  //       {orderData?.order && (
  //         <div className="bg-white shadow-md rounded-lg p-6" ref={invoiceRef}>
  //           {/* Rest of your Invoice component */}
  //           {/* Logo Section */}
  //           <div className="flex justify-between items-center mb-6 px-4">
  //             <img src={almaaLogo} alt="Almaa Logo" className="h-[80px]" />
  //             <div className="text-right">
  //               <p className="font-bold">Almaa Herbal Nature Pvt Ltd</p>
  //               <p>#10, Pillaiyar Koil Street, Saidapet,</p>
  //               <p>Chennai - 600015, Tamil Nadu, India</p>
  //               <p>Phone: 044-4635 9999</p>
  //               <p>Mobile: 900 3000 888 / 740 140 3010</p>
  //               <p>Email: almaaonlinedata@gmail.com</p>
  //               <p>Website: www.almaaherbal.com</p>
  //             </div>
  //           </div>
  //           <div className="border-b-2 mt-5 mb-5"></div>
  //           {/* Invoice Details */}
  //           <div className="flex justify-end items-center mb-10 px-4">
  //             <div>
  //               <p className="font-semibold">
  //                 INVOICE No: {orderData.order.invoice_number}
  //               </p>
  //               <p>{orderData.order.created}</p>
  //             </div>
  //           </div>
  //           {/* Invoice Information */}
  //           <div className="flex justify-between items-center mb-6 px-4">
  //             <div>
  //               <h2 className="font-semibold">Billing Information</h2>
  //               <p>
  //                 Name: {customer.first_name} {customer.last_name}
  //               </p>
  //               <p>Phone: {customer.mobilenumber}</p>
  //               <p>Address: No 1/8 Pinjala Subramaniam St, T.nagar</p>
  //               <p className="mt-5 mb-5">
  //                 Payment Method: {orderData.order.payment_mode}
  //               </p>
  //             </div>
  //             <div>
  //               <h2 className="font-semibold">Shipping Information</h2>
  //               <p>Name: {customer.first_name}</p>
  //               <p>Phone: {customer.mobilenumber}</p>
  //               <p>Address: No 1/8 Pinjala Subramaniam St, T.nagar,</p>
  //               <p>Chennai, Tamil Nadu 600017</p>
  //               <p className="mt-5 mb-5">Shipping Method: Courier / Postal</p>
  //             </div>
  //           </div>
  //           {/* Table Section */}
  //           <div
  //             className={
  //               isPdfDownloading ? "px-4" : "overflow-x-auto max-h-64 px-4"
  //             }
  //           >
  //             <table className="w-full text-left border-collapse">
  //               <thead>
  //                 <tr>
  //                   <th className="border-b-2 px-4 py-2">Item#</th>
  //                   <th className="border-b-2 px-4 py-2">Product</th>
  //                   <th className="border-b-2 px-4 py-2">GST (%)</th>
  //                   <th className="border-b-2 px-4 py-2">QTY</th>
  //                   <th className="border-b-2 px-4 py-2">Unit Price (₹)</th>
  //                   <th className="border-b-2 px-4 py-2">Sub Total (₹)</th>
  //                   <th className="border-b-2 px-4 py-2">Tax (₹)</th>
  //                   <th className="border-b-2 px-4 py-2">Total (₹)</th>
  //                 </tr>
  //               </thead>
  //               {orderData.products && (
  //                 <tbody>
  //                   {orderData.products.map((p, index: number) => {
  //                     const quantity = +orderData.orderDetails[index].quantity;
  //                     const gst = +p.product_sgst + +p.product_cgst;
  //                     const tax = ((+p.unit_price * gst) / 100) * quantity;
  //                     const total = +p.selling_price * quantity;
  //                     const price = +p.unit_price * quantity;

  //                     return (
  //                       <tr key={p.product_id}>
  //                         <td className="border-b-2 px-4 py-2">{index + 1}</td>
  //                         <td className="border-b-2 px-4 py-2">
  //                           {p.product_name}
  //                         </td>
  //                         <td className="border-b-2 px-4 py-2">
  //                           {gst.toFixed(2)}
  //                         </td>
  //                         <td className="border-b-2 px-4 py-2">{quantity}</td>
  //                         <td className="border-b-2 px-4 py-2">
  //                           {(+p.unit_price).toFixed(2)}
  //                         </td>
  //                         <td className="border-b-2 px-4 py-2">
  //                           {price.toFixed(2)}
  //                         </td>
  //                         <td className="border-b-2 px-4 py-2">
  //                           {tax.toFixed(2)}
  //                         </td>
  //                         <td className="border-b-2 px-4 py-2">
  //                           {total.toFixed(2)}
  //                         </td>
  //                       </tr>
  //                     );
  //                   })}
  //                 </tbody>
  //               )}
  //               <tfoot>
  //                 <tr>
  //                   <td className="px-4 py-2 font-semibold" colSpan={3}>
  //                     Total
  //                   </td>
  //                   <td className="px-4 py-2" colSpan={2}>
  //                     {totalQuantity}
  //                   </td>
  //                   <td className="px-4 py-2">{overAllSubTotal.toFixed(2)}</td>
  //                   <td className="px-4 py-2">{overAllTax.toFixed(2)}</td>
  //                   <td className="px-4 py-2">
  //                     {(+orderData.order.invoice_amount).toFixed(2)}
  //                   </td>
  //                 </tr>
  //               </tfoot>
  //             </table>
  //           </div>
  //           {/* Summary */}
  //           <div className="grid grid-cols-2 gap-4 mt-20 px-4">
  //             {/* Left column with CGST, SGST, and Amount in Words */}
  //             <div className="col-span-1 self-end">
  //               <p className="font-semibold">
  //                 CGST: ₹{gstSplitUpAmount.toFixed(2)} | SGST: ₹
  //                 {gstSplitUpAmount.toFixed(2)} | Delivery Charges: ₹
  //                 {deliveryCharge.toFixed(2)}
  //               </p>
  //               <p className="font-semibold">
  //                 Amount (In words): Eight Hundred And Seventeen Only
  //               </p>
  //             </div>

  //             {/* Right column with Total, Discount, Delivery Charges, and Grand Total */}
  //             <div className="col-span-1 flex justify-end">
  //               <div className="grid gap-2">
  //                 <div className="flex justify-between">
  //                   <p className="text-md mr-5">Total:</p>
  //                   <p className="text-md">
  //                     ₹{(+orderData.order.invoice_amount).toFixed(2)}
  //                   </p>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <p className="text-md mr-5">Discount:</p>
  //                   <p className="text-md">
  //                     ₹{(+orderData.order.discount || 0).toFixed(2)}
  //                   </p>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <p className="text-md mr-5">Delivery Charges:</p>
  //                   <p className="text-md">₹{deliveryCharge.toFixed(2)}</p>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <p className="font-bold text-lg mr-5">Grand Total:</p>
  //                   <p className="font-bold text-lg">
  //                     ₹{(+orderData.order.total_amount).toFixed(2)}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default Invoice;
