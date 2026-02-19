import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Login_Need_Help } from "./Login_Need_Help";
import { Login_IT_Team } from "./Login_IT_Team";

type Props = {
  title: string;
  img: string;
  active: string;
  hidden: string;
  opt: string;
  set_opt: Dispatch<SetStateAction<string>>;
  set_login: Dispatch<SetStateAction<boolean>>;
};

export const Card = ({
  title,
  img,
  active,
  opt,
  set_opt,
  set_login,
}: Props) => {
  const [show, set_show] = useState(false);

  useEffect(() => {
    if (opt !== "") {
      setTimeout(() => {
        set_show(true);
      }, 0);
    } else {
      setTimeout(() => {
        set_show(false);
      }, 500);
    }
  }, [opt]);

  return (
    <div
      className={`relative group transition-all ease-in-out bg-neutral-100 rounded-2xl flex justify-center items-center overflow-hidden cursor-pointer shadow-2xl 
        ${opt === active ? `size-70 lg:h-8/10 lg:w-7/10 duration-700` : `size-50 lg:size-80 hover:scale-103 duration-700`} `}
      onClick={(e) => {
        e.stopPropagation();
        set_opt((prev) => (prev === active ? "" : active));
      }}
    >
      <div
        className={`absolute w-50 lg:w-100 flex justify-center items-center 
          ${
            opt === active
              ? `visible ${show ? "translate-y-0 opacity-100  delay-100" : "translate-y-20 opacity-0 delay-100"}`
              : `translate-y-20 opacity-0 delay-100 pointer-events-none ${show ? "" : "hidden"}`
          }
          transition-all duration-500 ease-in-out z-20`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {active === "it" ? (
          <Login_IT_Team set_login={set_login} />
        ) : (
          <Login_Need_Help set_login={set_login} />
        )}
      </div>
      <div
        className={`h-full w-full ${opt !== "" && opt === active ? "" : "opacity-0 group-hover:opacity-100"} flex justify-center items-center bg-neutral-50/90 transition-all duration-500 ease-in-out z-10`}
      >
        <h3
          className={`${opt === active ? "opacity-0" : "opacity-100 delay-300"} transition duration-200 ease-in-out`}
        >
          {title}
        </h3>
      </div>
      <div
        className={`absolute flex items-center justify-center ${opt === active ? "w-150" : `w-70`} transition-all duration-700 ease-in-out`}
      >
        <img src={img} alt="" />
      </div>
    </div>
  );
};
