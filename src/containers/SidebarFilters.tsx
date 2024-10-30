import Radio from "../shared/Radio/Radio";
import MySwitch from "../components/MySwitch";
import AppFilterTabs, {
  TabFilterItem,
} from "../components/AppFilterTabs/AppFilterTabs";
import { SortOrder } from "../models/sort-order";
import PriceRange from "../pages/Products/PriceRange/PriceRange";

export interface Filters {
  is_nutraceutical: boolean;
  pres_req: boolean;
  herb_type: boolean;
  nat_of_prod: string[];
  sortBy?: string;
}

interface Props {
  selectedSortOrder: SortOrder;
  onSort: (selectedSortOrder: SortOrder) => void;
  selectedFilter: Filters;
  onFilterChange: (filter: Filters, productForms: TabFilterItem[]) => void;
  productForms: TabFilterItem[];
  sortOrderRadios: { name: string; id: string; value: string }[];
}

const PRICE_RANGE = [100, 500];

const SidebarFilters = ({
  selectedSortOrder,
  onSort,
  selectedFilter,
  onFilterChange,
  productForms,
  sortOrderRadios,
}: Props) => {
  const handleProductFormChange = (
    productForm: TabFilterItem,
    checked: boolean
  ) => {
    const items = [...productForms].map((item) => {
      if (item.id === productForm.id) item.checked = checked;
      return item;
    });
    const checkedItems = items.filter((item) => item.checked).map((c) => c.id);
    onFilterChange({ ...selectedFilter, nat_of_prod: checkedItems }, items);
  };

  const renderTabsSortOrder = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Sort By</h3>
        {sortOrderRadios.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioNameSort"
            label={item.name}
            checked={selectedSortOrder?.id === item.id}
            sizeClassName="w-5 h-5"
            onChange={() => onSort(item)}
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  const renderXClear = () => {
    return (
      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      <div className="py-8 pr-2">
        <PriceRange
          min={100}
          max={1000000}
          onPriceChange={(priceRange) => console.log(priceRange)}
        />
      </div>
      <div className="py-8 pr-2">
        {productForms.length > 0 && (
          <AppFilterTabs
            heading="Nature of Products"
            items={productForms}
            onItemCheck={handleProductFormChange}
          />
        )}
      </div>
      <div className="py-8 pr-2">
        <MySwitch
          className="pt-5"
          desc=""
          label="Nutraceutical Product"
          enabled={selectedFilter.is_nutraceutical}
          onChange={(enabled) =>
            onFilterChange(
              { ...selectedFilter, is_nutraceutical: enabled },
              productForms
            )
          }
        />
        <MySwitch
          className="pt-5"
          label="Prescription Required"
          desc=""
          enabled={selectedFilter.pres_req}
          onChange={(enabled) =>
            onFilterChange(
              { ...selectedFilter, pres_req: enabled },
              productForms
            )
          }
        />

        <MySwitch
          desc=""
          className="pt-5"
          label="Single herb"
          enabled={selectedFilter.herb_type}
          onChange={(enabled) =>
            onFilterChange(
              { ...selectedFilter, herb_type: enabled },
              productForms
            )
          }
        />
      </div>
      {renderTabsSortOrder()}
    </div>
  );
};

export default SidebarFilters;
