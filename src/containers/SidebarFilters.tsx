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
  brands: TabFilterItem[];
  ingredients: TabFilterItem[];
  certifications: TabFilterItem[];
  skinType: TabFilterItem[];
  health: TabFilterItem[];
  packaging: TabFilterItem[];
  sortOrderRadios: { name: string; id: string; value: string }[];
}

const PRICE_RANGE = [100, 500];

const SidebarFilters = ({
  selectedSortOrder,
  onSort,
  selectedFilter,
  onFilterChange,
  brands: productForms,
  ingredients,
  certifications,
  skinType,
  health,
  packaging,
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
            heading="Brands"
            items={productForms}
            onItemCheck={handleProductFormChange}
          />
        )}
      </div>
      <div className="py-8 pr-2">
        {ingredients.length > 0 && (
          <AppFilterTabs
            heading="Ingredients"
            items={ingredients}
            onItemCheck={handleProductFormChange}
          />
        )}
      </div>
      <div className="py-8 pr-2">
        {certifications.length > 0 && (
          <AppFilterTabs
            heading="Certifications"
            items={certifications}
            onItemCheck={handleProductFormChange}
          />
        )}
      </div>
      <div className="py-8 pr-2">
        {health.length > 0 && (
          <AppFilterTabs
            heading="Health"
            items={health}
            onItemCheck={handleProductFormChange}
          />
        )}
      </div>
      <div className="py-8 pr-2">
        {packaging.length > 0 && (
          <AppFilterTabs
            heading="Packaging"
            items={packaging}
            onItemCheck={handleProductFormChange}
          />
        )}
      </div>
      <div className="py-8 pr-2">
        {skinType.length > 0 && (
          <AppFilterTabs
            heading="Skin Type"
            items={skinType}
            onItemCheck={handleProductFormChange}
          />
        )}
      </div>
      {/* <div className="py-8 pr-2">
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
      </div> */}
      {renderTabsSortOrder()}
    </div>
  );
};

export default SidebarFilters;
