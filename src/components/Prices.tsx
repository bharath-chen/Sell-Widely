import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-primary-900 rounded-lg ${contentClass}`}
      >
        <span className="text-primary-900 !leading-none">
          ₹{price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Prices;
