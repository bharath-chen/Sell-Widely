import { Disclosure } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Props {
  title: string;
  body: string;
}

const AppAccordion = ({ title, body }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Disclosure>
      {/* {({ open }) => ( */}
      {/* <> */}
      <Disclosure.Button
        onClick={toggle}
        className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 "
      >
        <span>{title}</span>
        {!isOpen ? (
          <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        ) : (
          <MinusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        )}
      </Disclosure.Button>
      {isOpen && (
        <Disclosure.Panel
          className="p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6"
          as="div"
          dangerouslySetInnerHTML={{ __html: body }}
        ></Disclosure.Panel>
      )}
      {/* </> */}
      {/* )} */}
    </Disclosure>
  );
};

export default AppAccordion;
