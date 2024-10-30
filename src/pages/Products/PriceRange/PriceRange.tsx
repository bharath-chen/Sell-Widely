import { ChangeEvent, useState } from "react";
import "./PriceRange.css";
import ButtonPrimary from "../../../shared/Button/ButtonPrimary";
import Input from "../../../shared/Input/Input";

interface Props {
  min: number;
  max: number;
  onPriceChange: (priceRange: [number, number]) => void;
}

const PriceRange = ({ min = 100, max = 10000, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([min, max]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = [...priceRange];
    value[e.target.dataset.index] = Number(e.target.value);
    setPriceRange(value);
    if (onPriceChange) onPriceChange(value); // Send range to parent component
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md max-w-sm mx-auto">
      <label className="text-lg font-semibold">Price Range</label>

      <div className="flex items-center gap-4 mt-3">
        <input
          type="range"
          min={min}
          max={max}
          value={priceRange[0]}
          data-index="0"
          onChange={handleChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={priceRange[1]}
          data-index="1"
          onChange={handleChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <Input
          type="number"
          value={priceRange[0]}
          onChange={(e) => handleChange(e)}
          data-index="0"
          className="w-full rounded-md"
        />
        <span className="mx-2"> - </span>
        <Input
          type="number"
          value={priceRange[1]}
          onChange={(e) => handleChange(e)}
          data-index="1"
          className="w-full rounded-md"
        />
      </div>

      <ButtonPrimary
        onClick={() => setPriceRange([min, max])}
        className="mt-4 w-full py-2 text-white font-semibold rounded-md transition-colors"
      >
        Reset
      </ButtonPrimary>
    </div>
  );
};

export default PriceRange;
