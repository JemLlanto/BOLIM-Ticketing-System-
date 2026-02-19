import { Loader, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetch_users,
  remove_user,
  type user_type,
} from "../../../services/User.Service";
import { Edit_User } from "./Edit_User";
import Swal from "sweetalert2";

export const Users = () => {
  const [users, set_users] = useState<user_type[]>([]);
  const [selected_user, set_selected_user] = useState<user_type>();
  const [is_loading, set_is_loading] = useState(0);
  const get_all_users = async () => {
    const response = await fetch_users();

    if (response.success) {
      set_users(response.data!);
    }
  };
  useEffect(() => {
    get_all_users();
  }, []);

  const [edit_modal, set_edit_modal] = useState(false);

  const open_edit_modal = () => {
    set_edit_modal(true);
  };

  const close_edit_modal = () => {
    set_edit_modal(false);
  };
  const handle_delete = async (user: user_type) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This action cannot be undone. Delete "${user.user_name.toUpperCase()}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;
    try {
      set_is_loading(user.id);
      const response = await remove_user(user.id);
      if (response.success) {
        setTimeout(
          () => {
            get_all_users();
            Swal.fire({
              icon: "success",
              title: "User Removed.",
              text: "User successfully removed.",
              confirmButtonColor: "#3085d6",
            });
          },
          import.meta.env.VITE_TIME_OUT,
        );
      } else {
        setTimeout(
          () => {
            Swal.fire({
              icon: "error",
              title: "Remove Failed",
              text: response.message || "Something went wrong.",
              confirmButtonColor: "#d33",
            });
          },
          import.meta.env.VITE_TIME_OUT,
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(
        () => {
          set_is_loading(0);
        },
        import.meta.env.VITE_TIME_OUT,
      );
    }
  };

  return (
    <>
      <Edit_User
        data={selected_user!}
        open={edit_modal}
        handle_show={open_edit_modal}
        handle_close={close_edit_modal}
        refresh_data={get_all_users}
      />
      <div className="h-full">
        <div>
          <h4>Users: {users?.length}</h4>
        </div>
        <div className="mt-2 h-95/100 overflow-y-auto flex flex-col gap-2">
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center rounded shadow bg-neutral-50 text-neutral-600 p-2"
            >
              <p className="w-3/10">{user.user_name}</p>
              <p>{user.is_admin ? "Admin" : "Not admin"}</p>
              <div className="flex gap-2">
                <div
                  className="bg-green-500 hover:bg-green-600 text-neutral-50 transition duration-300 ease-in-out p-1 rounded cursor-pointer "
                  onClick={() => {
                    set_selected_user(user);
                    open_edit_modal();
                  }}
                >
                  <SquarePen />
                </div>
                <div
                  className="bg-red-600 hover:bg-red-700 text-neutral-50 transition duration-300 ease-in-out p-1 rounded cursor-pointer "
                  onClick={() => {
                    handle_delete(user);
                  }}
                >
                  {is_loading === user.id ? (
                    <p className="animate-[spin_2s_linear_infinite]">
                      <Loader />
                    </p>
                  ) : (
                    <Trash />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
