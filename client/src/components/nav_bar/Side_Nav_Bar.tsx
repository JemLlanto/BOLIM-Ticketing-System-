import { Ticket, History, LayoutDashboard, FolderKanban } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { user_type } from "../../services/User.Service";

interface Props {
  user: user_type;
}

export const Side_Nav_Bar = ({ user }: Props) => {
  const location = useLocation();

  const nav_style = (current_url: string, assigned_url: string) => {
    const current_path = current_url === assigned_url;
    const link_style = `relative text-neutral-50 flex justify-start items-center transition duration-300 ease-in-out rounded p-3 pe-4 
  ${current_path ? "bg-sky-700 hover:bg-sky-800" : "bg-sky-600 hover:bg-sky-500"}`;
    return link_style;
  };
  const nav_title_style = `absolute right-5 top-3 w-50 opacity-0 group-hover:opacity-100 group-hover:delay-200 group-hover:duration-900 transition duration-400 ease-in-out
    `;

  return (
    <div
      className={`group h-full min-w-1/30 hover:min-w-3/20 flex flex-col gap-2 transition-all delay-100 duration-600 ease-in-out bg-neutral-100 p-3`}
    >
      {user.is_admin ? (
        <Link to={"/dashboard"}>
          <div className={nav_style(location.pathname, "/dashboard")}>
            <p>
              <LayoutDashboard />
            </p>
            <h6 className={nav_title_style}>Dashboard</h6>
          </div>
        </Link>
      ) : null}

      <Link to={"/home"}>
        <div className={nav_style(location.pathname, "/home")}>
          <p>
            <Ticket />
          </p>
          <h6 className={nav_title_style}>Tickets</h6>
        </div>
      </Link>
      <Link to={"/ticket-history"}>
        <div className={nav_style(location.pathname, "/ticket-history")}>
          <p>
            <History />
          </p>
          <h6 className={nav_title_style}>Ticket History</h6>
        </div>
      </Link>
      {user.is_admin ? (
        <Link to={"/system-manager"}>
          <div className={nav_style(location.pathname, "/system-manager")}>
            <p>
              <FolderKanban />
            </p>
            <h6 className={nav_title_style}>System Manager</h6>
          </div>
        </Link>
      ) : null}
    </div>
  );
};
