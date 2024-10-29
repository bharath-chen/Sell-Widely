const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 my-20">
      <div className="row">
        <div className="col-xs-12">
          <div className="row grid-offer-row">
            <h2 className="text-center text-2xl font-bold mb-6">
              <strong>Shipping Policy</strong>
            </h2>
            <p className="mb-4">
              <strong>Effective Date: 14 Oct 2024</strong>
            </p>
            <p className="mb-4">
              <strong>Shipping Options &amp; Delivery Times</strong>
            </p>
            <p className="mb-4">We offer the following shipping options:</p>
            <ul className="mb-4">
              <li>
                <strong>Standard Shipping</strong>: Delivery through India Post
                Services
              </li>
              <li className="my-4">
                <strong>Express Shipping</strong>: Delivery through Speed Post/
                Courier Services
              </li>
            </ul>
            <p className="mb-4">
              Shipping times vary depending on your location and the selected
              shipping method. Please note that delivery estimates are based on
              shipping providers, and we are not responsible for delays caused
              by external factors such as weather or carrier issues.
            </p>
            <h3 className="text-xl font-semibold mb-2">
              <strong>Shipping Rates</strong>
            </h3>
            <p className="mb-4">
              Shipping rates are calculated based on your location and the
              weight of your order. These rates will be displayed at checkout
              before finalizing your order.
            </p>
            <ul className="mb-4">
              <li>
                <strong>Standard Shipping</strong>: Starting Price - For
                TamilNadu: 50 INR | For Other States: 100 INR
              </li>
              <li className="my-4">
                <strong>Express Shipping</strong>: Starting Price- For
                TamilNadu: 85 INR | For Other States: 150 INR
              </li>
              <li>
                <strong>Free Shipping</strong>: Available on orders over 2,000
                INR, for selected regions only.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">
              <strong>Order Processing</strong>
            </h3>
            <p className="mb-4">
              Orders are processed within [1-2] business days. Orders placed on
              weekends or holidays will be processed on the next business day.
              After processing, you will receive a tracking number SMS/ from the
              Respective Postal/ Courier
            </p>
            <h3 className="text-xl font-semibold mb-2">
              <strong>International Shipping</strong>
            </h3>
            <p className="mb-4">We are not shipping outside India currently.</p>
            <h3 className="text-xl font-semibold mb-2">
              <strong>Tracking Your Order</strong>
            </h3>
            <p className="mb-4">
              Once your order is shipped, you will receive a confirmation SMS
              with a tracking number and link to track your order. If you do not
              receive this information within 3 working days from the date of
              ordering, please contact our customer service @ 9003000888.
            </p>
            {/* <p>&nbsp;</p>
            <p>&nbsp;</p> */}
            <h3 className="text-xl font-semibold mb-2">
              <strong>Lost or Damaged Packages</strong>
            </h3>
            <p className="mb-4">
              We are not responsible for packages lost or damaged during
              shipping. However,In case of any damages/ leakage in the parcel,
              Kindly contact our customer service @ 9003000888 or Whatsapp to
              9003000888 within 24 Hours from the date of delivery and we will
              work with the carrier to resolve the issue.
            </p>
            <h3 className="text-xl font-semibold mb-2">
              <strong>Changes to This Shipping Policy</strong>
            </h3>
            <p className="mb-4">
              We reserve the right to modify this shipping policy at any time.
              Any changes will be updated on this page, so please review it
              periodically.
            </p>
            <p>
              If you have any questions about our shipping policy, please
              contact us at almaahospital@gmail.com or 9003000888.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
