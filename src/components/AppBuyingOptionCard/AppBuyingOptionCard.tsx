interface Props {
  buyingOptions: {
    id: number;
    offer: number;
    pack: number;
    originalPrice: number;
    discountedPrice: number;
  };
  selected: boolean;
  onClick: () => void;
}

const AppBuyingOptionCard = ({ buyingOptions, selected, onClick }: Props) => {
  return (
    <div className="cursor-pointer h-full" onClick={onClick}>
      <fieldset
        className={`flex flex-col justify-end rounded relative overflow-hidden h-full p-4 desktop:p-6 border ${
          selected ? "bg-green-100 border-green-400" : ""
        } `}
      >
        <legend className="max-w-fit">
          <p className="text-green-800 text-lg font-bold mt-1">
            {buyingOptions.offer}% off
          </p>
        </legend>
        <div className="flex flex-col gap-2">
          <div className="pt-2">
            <p className="text-base text-gray-700 leading-5 desktop:leading-6">
              {/* 100g x Pack of 1 */}
              Buy {buyingOptions.pack}
            </p>
          </div>
          <div className="flex items-end gap-2 pb-2 desktop:pb-3">
            <div>
              <p className="text-xl text-gray-900 leading-6 font-bold">
                ₹{buyingOptions.discountedPrice}
              </p>
            </div>
            <div>
              <p className="text-base text-gray-500 line-through leading-5">
                ₹{buyingOptions.originalPrice}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-start text-gray-700 text-sm desktop:text-base">
          ₹2.44/g
        </div> */}
      </fieldset>
    </div>
  );
};

export default AppBuyingOptionCard;
