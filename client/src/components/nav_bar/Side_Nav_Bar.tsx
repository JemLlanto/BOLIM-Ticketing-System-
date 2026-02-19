import type { user_type } from "../../services/User.Service";
import { type Dispatch, type SetStateAction } from "react";
import { Side_Bar_Web } from "./Side_Bar_Web";
import { Side_Bar_Mobile } from "./Side_Bar_Mobile";

interface Props {
  user: user_type;
  nav_toggle: boolean;
  set_nav_toggle: Dispatch<SetStateAction<boolean>>;
}

export const Side_Nav_Bar = ({ user, nav_toggle, set_nav_toggle }: Props) => {
  return (
    <>
      <Side_Bar_Web
        user={user}
        nav_toggle={nav_toggle}
        set_nav_toggle={set_nav_toggle}
      />
      <Side_Bar_Mobile
        nav_toggle={nav_toggle}
        set_nav_toggle={set_nav_toggle}
      />
    </>
  );
};
