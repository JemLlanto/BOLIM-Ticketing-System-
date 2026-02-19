import { Ticket, History } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  nav_toggle: boolean;
  set_nav_toggle: Dispatch<SetStateAction<boolean>>;
}
export const Side_Bar_Mobile = ({ nav_toggle, set_nav_toggle }: Props) => {
  const location = useLocation();

  const nav_style = (current_url: string, assigned_url: string) => {
    const current_path = current_url === assigned_url;
    const link_style = `relative text-neutral-50 flex justify-start items-center transition duration-300 ease-in-out rounded p-3 pe-4 
  ${current_path ? "bg-sky-700 hover:bg-sky-800" : "bg-sky-600 hover:bg-sky-500"}`;
    return link_style;
  };
  const nav_title_style = `absolute -right-52 top-0 w-50 ${nav_toggle ? "opacity-100 delay-200" : "opacity-0 group-hover:opacity-100 group-hover:"} group-hover:duration-900 transition duration-400 ease-in-out
    `;

  return (
    <div
      className={`absolute group h-full ${nav_toggle ? "min-w-20/20" : "-translate-x-20 min-w-1/30 hover:min-w-3/20"} flex lg:hidden flex-col gap-2 transition-all delay-100 duration-600 ease-in-out bg-neutral-100 p-3 z-20`}
    >
      <Link to={"/home"} onClick={() => set_nav_toggle(false)}>
        <div className={nav_style(location.pathname, "/home")}>
          <p className="relative">
            <Ticket />
            <h6 className={nav_title_style}>Tickets</h6>
          </p>
        </div>
      </Link>
      <Link to={"/ticket-history"} onClick={() => set_nav_toggle(false)}>
        <div className={nav_style(location.pathname, "/ticket-history")}>
          <p className="relative">
            <History />
            <h6 className={nav_title_style}>Ticket History</h6>
          </p>
        </div>
      </Link>
    </div>
  );
};
