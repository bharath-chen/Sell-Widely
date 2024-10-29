const SimpleSteps = () => {
  return (
    <section className="bg-[url('./assets/images/earn.jpg')] bg-cover relative">
      <div className="py-8 container text-center px-4 background-image">
        <div className="relative bg-white mr-0 p-6 md:p-8 rounded-none shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-lg md:text-2xl text-left font-semibold mb-3">
            Let's Earn with
            <br />
            <span className="text-xl md:text-3xl font-bold text-[#b58c69]">
              JUST SIMPLE STEPS
            </span>
          </h2>
          <p className="text-lg md:text-xl text-left font-semibold">
            Opportunities to earn, save, and get <br />
            more benefits. Don't miss it!
          </p>
          <div className="mt-6 space-y-4 text-left">
            <label className="flex items-center space-x-3">
              <span className="h-6 w-10 bg-gray-600 rounded-3xl"></span>
              <span className="text-base md:text-lg text-gray-800">
                Reach more customers
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <span className="h-6 w-10 bg-gray-600 rounded-3xl"></span>
              <span className="text-base md:text-lg text-gray-800">
                Extend your brand globally
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <span className="h-6 w-10 bg-gray-600 rounded-3xl"></span>
              <span className="text-base md:text-lg text-gray-800">
                Earn more by selling
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <span className="h-6 w-10 bg-gray-600 rounded-3xl"></span>
              <span className="text-base md:text-lg text-gray-800">
                Become a premium seller
              </span>
            </label>
          </div>
          <button className="mt-6 bg-[#334a33] text-white mr-60 md:text-lg font-bold py-2 px-6 rounded-none hover:bg-stone-600">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimpleSteps;
