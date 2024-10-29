import CommonLayout from "./CommonLayout";

const AccountSupport = () => {
  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Support
          </h2>
          <div className="max-w-2xl prose prose-slate dark:prose-invert">
            <p>
              Almaa Siddha Doctors, Experts & Executives team are always ready
              and happy to support customer queries, provide solutions to
              diseases and problems, and help with product or order tracking.
            </p>
            <ul className="list-disc ml-5 space-y-2 text-gray-800 dark:text-gray-300">
              <li>
                <strong>Disease/ Treatment Support:</strong> 7401403000
              </li>
              <li>
                <strong>Product/ Usage Support:</strong> 9003000888
              </li>
              <li>
                <strong>Order/ Product Tracking:</strong> 9003000888
              </li>
            </ul>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountSupport;
