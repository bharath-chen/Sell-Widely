interface Props {
  label: string;
  items: { id: number; label: string }[];
  selectedItem: { id: number; label: string };
  onItemChange: (item: { id: number; label: string }) => void;
}

const AppProductChip = ({
  label,
  items,
  selectedItem,
  onItemChange,
}: Props) => {
  return (
    <div className="my-2">
      <h4 className="text-sm font-semibold">{label}</h4>
      <ul className="flex flex-wrap gap-2 mb-3">
        {items.map((item) => (
          <li
            className="mr-2 mt-4"
            key={item.id}
            onClick={() => onItemChange(item)}
          >
            <span
              className={
                "cursor-pointer border-2 border-primary-900 dark:border-white text-md font-medium px-3.5 py-1 rounded-full " +
                (item.id === selectedItem.id
                  ? "bg-primary-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-white-100 text-primary-800 dark:bg-slate-900 dark:text-white")
              }
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppProductChip;
