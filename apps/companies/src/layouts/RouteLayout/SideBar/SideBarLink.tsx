import { NavLink as RouterNavLink } from "react-router-dom";
import React from "react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactElement;
  labelKey: string;
  iconProps?: React.SVGProps<SVGSVGElement>;
}

export const SidebarLink = ({
  to,
  icon,
  labelKey,
  iconProps,
}: SidebarLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        ` rounded-[10px] flex flex-row items-center justify-start p-2 
        ${
          isActive
            ? "bg-primary-orange-100 text-white"
            : "text-secondary-bleu-100"
        }
        hover:bg-primary-orange-100 hover:text-white group font-chakra font-medium leading-md`
      }
      end
    >
      {React.cloneElement(icon, {
        ...iconProps,
        className: `mr-3 ${iconProps?.className ?? ""} group-hover:text-white`,
      })}
      <span className="leading-md font-chakra font-medium">{labelKey}</span>
    </RouterNavLink>
  );
};
