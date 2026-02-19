import need_help from "../../assets/need_help.png";
import it_team from "../../assets/it_team.png";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface JwtPayload {
  exp: number;
  sub: string; // user id (if you stored it there)
}

export const Landing_Page = () => {
  const [opt, set_opt] = useState<string>("");
  const [login, set_login] = useState<boolean>(false);
  const [loging_in, set_loging_in] = useState(false);

  const [is_page_loading, set_is_page_loading] = useState(true);

  const navigate = useNavigate();

  // CHECKING IF TOKEN EXIST AND VERIFYING IF ITS EXPIRED
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const currentTime = Date.now() / 1000; // in seconds

      if (decoded.exp > currentTime) {
        navigate("/home", { replace: true });
      } else {
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      // Invalid token format
      console.log(error);
      sessionStorage.removeItem("token");
    }
  }, [navigate]);

  useEffect(() => {
    const handleLoad = () => {
      set_is_page_loading(false);
    };

    if (document.readyState === "complete") {
      setTimeout(() => {
        set_is_page_loading(false);
      }, 1000);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (login) {
      setTimeout(() => {
        set_loging_in(true);
      }, 0);
    } else {
      setTimeout(() => {
        set_loging_in(false);
      }, 500);
    }
  }, [login]);

  return (
    <div
      className="relative h-dvh w-dvw bg-sky-600 overflow-hidden flex justify-center items-center"
      onClick={() => set_opt("")}
    >
      <div
        className={`absolute transition-all delay-200 duration-1000 ease-in-out rounded-full bg-neutral-50 z-50
        ${is_page_loading ? "size-1000" : "size-0"}  
        ${loging_in ? "size-1000" : "size-0"}
        `}
      ></div>
      <div
        className={`h-full w-full flex justify-center items-center overflow-x-hidden gap-10 
        ${is_page_loading ? "translate-y-25 opacity-0" : "translate-y-0 opacity-100"}
        transition delay-800 duration-900 ease-in-out`}
      >
        <Card
          title={"Need Help?"}
          img={need_help}
          active={"help"}
          hidden={"it"}
          opt={opt}
          set_opt={set_opt}
          set_login={set_login}
        />
        <Card
          title={"IT Team"}
          img={it_team}
          active={"it"}
          hidden={"help"}
          opt={opt}
          set_opt={set_opt}
          set_login={set_login}
        />
      </div>
    </div>
  );
};
