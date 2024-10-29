import { Popover } from "@headlessui/react";

interface Props {
  id: string;
  name: string;
  active?: boolean;
  onClick: () => void;
}

const Chip = ({ id, name, active, onClick }: Props) => {
  return (
    <Popover>
      <Popover.Button
        onClick={onClick}
        className={`flex py-2.5 px-5 me-2 mb-5 text-sm font-medium  focus:outline-none ${
          active
            ? "bg-primary-800 text-white hover:bg-white hover:text-primary-800 hover:border-primary-800"
            : "bg-white text-gray-900 hover:bg-gray-100"
        } rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
      >
        <span className="mr-2">{name}</span>
      </Popover.Button>
    </Popover>
  );
};

export default Chip;
