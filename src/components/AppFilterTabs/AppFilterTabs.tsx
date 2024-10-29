import Checkbox from "../../shared/Checkbox/Checkbox";

export interface TabFilterItem {
  id: string;
  name: string;
  checked?: boolean;
}

interface Props {
  heading: string;
  items: TabFilterItem[];
  onItemCheck: (item: TabFilterItem, checked: boolean) => void;
}

const AppFilterTabs = ({ heading, items, onItemCheck }: Props) => {
  return (
    <div className="mb-3">
      <h3 className="font-semibold mb-2.5">{heading}</h3>
      <div
        className={`relative flex flex-col pl-1 pt-1 pb-8 space-y-4 h-32 ${
          items.length > 4 ? "overflow-y-auto" : ""
        }`}
      >
        {items.map((item) => (
          <div key={item.id}>
            <Checkbox
              name={item.name}
              label={item.name}
              defaultChecked={item.checked}
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              onChange={(checked: boolean) => onItemCheck(item, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppFilterTabs;
