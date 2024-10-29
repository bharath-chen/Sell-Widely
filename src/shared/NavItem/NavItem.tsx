import React, { FC, ReactNode } from "react";
import twFocusClass from "../../utils/twFocusClass";

export interface NavItemProps {
  className?: string;
  radius?: string;
  onClick?: () => void;
  isActive?: boolean;
  renderX?: ReactNode;
  children?: React.ReactNode;
}

const NavItem: FC<NavItemProps> = ({
  className = "px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize",
  radius = "rounded-full",
  children,
  onClick = () => {},
  isActive = false,
  renderX,
}) => {
  return (
    <li className="nc-NavItem relative" data-nc-id="NavItem">
      {renderX && renderX}
      <button
        className={`block !leading-none font-medium whitespace-nowrap ${className} ${radius} ${
          isActive
            ? "bg-[#334a33] dark:bg-slate-100 text-white dark:text-slate-900 "
            : "bg-[#7f876f] text-white dark:text-slate-400 dark:hover:text-slate-100 hover:text-white hover:bg-[#334a33] dark:hover:bg-slate-800"
        } ${twFocusClass()}`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {children}
      </button>
    </li>
  );
};

export default NavItem;
