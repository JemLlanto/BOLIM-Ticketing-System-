import { Button } from "@mui/material";
import { Drop_Down } from "../drop_down/Drop_Down";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { user_type } from "../../services/User.Service";
import { logout } from "../../services/Auth.Service";

type Props = {
  user?: user_type;
  toggle_set_show: () => void;
};

export const Nav_Bar = ({ user, toggle_set_show }: Props) => {
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
      <h5>BOLIM:Ticket System</h5>
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
