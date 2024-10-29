import { useEffect, useState } from "react";

export interface OfferCode {
  id: string;
  code: string;
  description: string;
  discount: number;
}

interface Props {
  offerCodes: OfferCode[];
  onApply: (code: string) => void;
}

const AppOfferCodes = ({ offerCodes, onApply }: Props) => {
  const [viewAll, setViewAll] = useState(false);
  const [codes, setCodes] = useState<OfferCode[]>([]);

  useEffect(() => {
    setCodes(viewAll ? offerCodes : offerCodes.slice(0, 1));
  }, [viewAll, offerCodes]);

  return (
    <>
      <div
        className={
          "mt-4 relative p-4  " +
          (viewAll ? "overflow-y-scroll h-36" : "overflow-y-hidden h-28")
        }
      >
        <div className="flex flex-col gap-x-10 gap-y-4">
          {codes.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between border-2 border-slate-200 rounded-lg bg-slate-200 p-4"
            >
              <div>
                <p className="text-xs font-semibold border-2 w-20 border-primary-900 text-primary-900 bg-white rounded-lg px-3 py-1">
                  {item.code}
                </p>
                <p className="text-xs mt-3 text-primary-900 px-1 py-1">
                  {item.description}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="cursor-pointer text-white bg-primary-900 hover:text-primary-900 border border-primary-900 hover:bg-white focus:ring-0 focus:outline-none focus:ring-primary-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  onClick={() => onApply(item.code)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="mt-3"
          onClick={() => setViewAll(!viewAll)}
        >
          View {viewAll ? "Less" : "All"}
        </button>
      </div>
    </>
  );
};

export default AppOfferCodes;
