import { Fragment, useEffect, useState } from "react";
import Prices from "../../components/Prices";
import { Product } from "../../models/product";
import CommonLayout from "./CommonLayout";
import orderService from "../../services/order-service";
import { CanceledError } from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../state/store";
import { clearCart } from "../../features/cart/cartSlice";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { getFormattedDate } from "../../utils/date-utils";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { useNavigate } from "react-router-dom";
import { OrderData, ProductDetailData } from "../../models/order";

export interface ViewOrder {
  order_detail_id: string;
  order_id: string;
  product_id: string;
  quantity: string;
  amount: string;
  order_detail_status: string;
  order_detail_created: string;
  order_detail_updated: string;
}

export interface OrdersPayload {
  viewOrders: ViewOrder[];
  productDetail: Product[];
}

export interface OrderHistory {
  order_id: string;
  indexes: any[];
  orders: ViewOrder[];
  products: Product[];
}

const AccountOrder = () => {
  const [orders, setOrders] = useState<{ orders: OrderData[] }>({ orders: [] });
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null); // For selected order
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const customer = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { request, cancel } = orderService.get<
      { orders: OrderData[] },
      { gofor: string; customer_id: string }
    >({
      gofor: "vieworders",
      customer_id: customer?.customer_id,
    });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        dispatch(clearCart());
        setOrders(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        console.log(err.message);
      });

    return () => cancel();
  }, []);

  const renderProductItem = (product: ProductDetailData, index: number) => {
    const {
      product_image1,
      product_name,
      selling_price,
      product_id,
      suitablefor,
    } = product;
    return (
      <div key={product_id} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product_image1}
            alt={product_name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">
                  {product_name}
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm">
                  {suitablefor}
                </p>
              </div>
              <Prices price={+selling_price} className="mt-0.5 ml-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">
                {+selectedOrder.orderDetails[index].quantity}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = (order: OrderData) => {
    const handleViewInvoice = () => {
      navigate("/invoice", {
        state: {
          order,
        },
      });
    };

    return (
      <div className="w-full mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-4">
          {/* Left section: Order Details */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Order Details
            </h2>
            <p className="text-gray-600 dark:text-gray-300 my-2">
              Invoice Number:{" "}
              <span className="font-semibold">
                {order.order.invoice_number}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Order ID:{" "}
              <span className="font-semibold">{order.order.order_id}</span>
            </p>
          </div>

          {/* Right section: View Invoice Button */}
          <div className="text-left md:text-right">
            <ButtonPrimary
              className="px-4 w-full bg-primary-900 hover:bg-primary-900 text-white rounded-lg"
              onClick={handleViewInvoice}
            >
              View Invoice
            </ButtonPrimary>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Order Date:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {getFormattedDate(order.order.date)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Total Amount:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ₹{order.order.total_amount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Delivery Charge:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ₹{order.order.delivery_charge}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Payment Mode:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {order.order.payment_mode === "cod"
                ? "Cash on delivery"
                : "Online payment"}
            </span>
          </div>
          {order.order.delivered_date && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Delivered Date:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {new Date(order.order.delivered_date).toLocaleDateString()}
              </span>
            </div>
          )}
          {order.order.tracking_id && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Tracking ID:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {order.order.tracking_id}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Order Status:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {order.order.order_status === "PEN" ? "Pending" : "Order Placed"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Currency:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {order.order.currency}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <ButtonPrimary
            sizeClass="py-3 px-4 w-full bg-primary-900 hover:bg-primary-900 text-white rounded-lg"
            fontSize="text-sm font-medium"
            onClick={() => handleViewOrder(order)}
          >
            View Order Detail
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  // Function to handle viewing an order
  const handleViewOrder = (order: OrderData) => {
    setSelectedOrder(order); // Set the selected order
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const routeToProducts = () => {
    navigate("/products");
  };

  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>

          {!orders?.orders?.length && (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v2a9 9 0 009 9h6m-6-9h6a9 9 0 009-9V3"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No orders found!
              </h3>
              <p className="text-gray-500 mb-4">
                It seems you haven't placed any orders yet.
              </p>
              <ButtonPrimary
                onClick={routeToProducts}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Start Shopping
              </ButtonPrimary>
            </div>
          )}

          {orders.orders &&
            orders.orders.length > 0 &&
            orders.orders.map((o) => (
              <Fragment key={o.order.invoice_number}>{renderOrder(o)}</Fragment>
            ))}
        </div>
      </CommonLayout>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-8 sm:p-10 overflow-y-auto max-h-[80vh] relative">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">
                Order: {selectedOrder.order.invoice_number}
              </h3>
              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={handleCloseModal}
                aria-label="Close Modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {selectedOrder.products.map((product, index) => (
                <Fragment key={product.product_id}>
                  {renderProductItem(product, index)}
                </Fragment>
              ))}
            </div>

            <div className="border-t border-gray-300 my-6"></div>

            <div className="flex flex-col space-y-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>SubTotal</span>
                <span className="text-gray-800">
                  ₹{selectedOrder.order.invoice_amount}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Delivery Charges</span>
                <span className="text-gray-800">
                  ₹{selectedOrder.order.delivery_charge}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-gray-400 pt-3 mt-3">
                <span>Total</span>
                <span className="text-gray-900">
                  ₹{selectedOrder.order.total_amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountOrder;
