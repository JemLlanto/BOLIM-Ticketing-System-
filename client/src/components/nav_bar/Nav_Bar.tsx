import { Button } from "@mui/material";
import { Drop_Down } from "../drop_down/Drop_Down";
import { LogOut, Menu, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { user_type } from "../../services/User.Service";
import { logout } from "../../services/Auth.Service";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  user?: user_type;
  toggle_set_show: () => void;
  nav_toggle: boolean;
  set_nav_toggle: Dispatch<SetStateAction<boolean>>;
};

export const Nav_Bar = ({
  user,
  toggle_set_show,
  nav_toggle,
  set_nav_toggle,
}: Props) => {
  const navigate = useNavigate();
  const handle_logout = async () => {
    logout();
    toggle_set_show();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div className="fixed top-0 left-0 w-dvw flex justify-between items-center p-3 bg-neutral-100 shadow z-10">
      <div className="flex items-center gap-2">
        <h5>
          <span className="hidden md:inline">BOLIM:</span>Ticket System
        </h5>
        {/* NAV TOGGLER */}
        <div
          className="top-5 -right-4 size-8 border-2 border-neutral-50 rounded flex lg:hidden justify-center items-center bg-sky-600 z-10"
          onClick={() => set_nav_toggle((prev) => !prev)}
        >
          <span className="text-neutral-50">
            {nav_toggle ? <Menu size={17} /> : <X size={17} />}
          </span>
        </div>
      </div>
      <div>
        <Drop_Down
          dropdown_label={
            <>
              <p className="select-none">
                {user ? user.user_name : "unknown user"}
              </p>
            </>
          }
        >
          <Button
            variant="contained"
            color="success"
            endIcon={<User size={16} strokeWidth={2.75} />}
          >
            Account
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<LogOut size={16} strokeWidth={2.75} />}
            onClick={handle_logout}
          >
            Logout <span></span>
          </Button>
        </Drop_Down>
      </div>
    </div>
  );
};
