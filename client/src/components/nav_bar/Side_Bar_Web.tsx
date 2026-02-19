import {
  Ticket,
  History,
  LayoutDashboard,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { user_type } from "../../services/User.Service";
import { Link, useLocation } from "react-router-dom";

interface Props {
  user: user_type;
  nav_toggle: boolean;
  set_nav_toggle: Dispatch<SetStateAction<boolean>>;
}
export const Side_Bar_Web = ({ user, nav_toggle, set_nav_toggle }: Props) => {
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
      className={`relative group h-full ${nav_toggle ? "min-w-70" : "min-w-1/30 hover:min-w-70"} hidden lg:flex flex-col gap-2 transition-all delay-100 duration-600 ease-in-out bg-neutral-100 p-3`}
    >
      {/* NAV TOGGLER */}
      <div
        className="absolute top-5 -right-4 size-8 border-2 border-neutral-50 rounded-full flex justify-center items-center bg-sky-600 z-10"
        onClick={() => set_nav_toggle((prev) => !prev)}
      >
        <span className="text-neutral-50">
          {nav_toggle ? <Menu size={17} /> : <X size={17} />}
        </span>
      </div>
      {user.is_admin ? (
        <Link to={"/dashboard"}>
          <div className={nav_style(location.pathname, "/dashboard")}>
            <p className="relative">
              <LayoutDashboard />
              <h6 className={nav_title_style}>Dashboard</h6>
            </p>
          </div>
        </Link>
      ) : null}

      <Link to={"/home"}>
        <div className={nav_style(location.pathname, "/home")}>
          <p className="relative">
            <Ticket />
            <h6 className={nav_title_style}>Tickets</h6>
          </p>
        </div>
      </Link>
      <Link to={"/ticket-history"}>
        <div className={nav_style(location.pathname, "/ticket-history")}>
          <p className="relative">
            <History />
            <h6 className={nav_title_style}>Ticket History</h6>
          </p>
        </div>
      </Link>
      {user.is_admin ? (
        <Link to={"/system-manager"}>
          <div className={nav_style(location.pathname, "/system-manager")}>
            <p className="relative">
              <FolderKanban />
              <h6 className={nav_title_style}>System Manager</h6>
            </p>
          </div>
        </Link>
      ) : null}
    </div>
  );
};
