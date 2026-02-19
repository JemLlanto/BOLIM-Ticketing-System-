import { Outlet } from "react-router-dom";
import { Nav_Bar } from "../components/nav_bar/Nav_Bar";
import { Side_Nav_Bar } from "../components/nav_bar/Side_Nav_Bar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData, type user_type } from "../services/User.Service";
import Swal from "sweetalert2";
import { fetch_tickets, type Ticket } from "../services/Ticket.Service";

export const Main_Layout = () => {
  const [show, set_show] = useState(false);
  const [user, set_user] = useState<user_type>();
  const [tickets, set_tickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  const get_all_tickets = async () => {
    const response = await fetch_tickets();

    if (response.success && response.data) {
      set_tickets(response.data);
      console.log("Tickets: ", response.data);
    }
  };
  useEffect(() => {
    get_all_tickets();
  }, []);

  // TOKEN DETECTION AND VERIFICATION
  const verify_token = async (token: string) => {
    try {
      const response = await fetchUserData(token);
      if (response.success) {
        set_user(response.data);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: response.message || "Unable to verify.",
          confirmButtonColor: "#d33",
        });
        navigate("/");
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      // Invalid token format
      console.log(error);
      sessionStorage.removeItem("token");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      set_show(true);
    }, 0);

    const token = sessionStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Session",
        text: "Please login again...",
        confirmButtonColor: "#d33",
      });
      navigate("/");
      return;
    }

    setTimeout(() => {
      verify_token(token);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const toggle_set_show = () => {
    set_show((prev) => !prev);
  };

  return (
    <div
      className={`h-dvh w-dvw ${show ? "bg-sky-600  opacity-100" : "opacity-0"} delay-200 transition-all duration-1000 ease-in-out flex justify-center items-center overflow-x-hidden gap-10`}
    >
      {user ? (
        <>
          <Nav_Bar user={user} toggle_set_show={toggle_set_show} />
          <div className="h-full w-full pt-16 flex gap-5">
            <Side_Nav_Bar user={user} />
            <div className="h-96/100 w-full mt-5 me-5 rounded-xl">
              <Outlet
                context={{ user, tickets, get_all_tickets, toggle_set_show }}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
