import { Loader, Plus, SquarePen, Trash } from "lucide-react";
import { Button } from "../../../components/button/Button";
import { useEffect, useState } from "react";
import { Add_Reason } from "./Add_Reason";
import {
  fetch_reasons,
  remove_reason,
  type reason_type,
} from "../../../services/Reason.Service";
import { Edit_Reason } from "./Edit_Reason";
import Swal from "sweetalert2";

export const Reason = () => {
  const [reasons, set_reasons] = useState<reason_type[]>([]);
  const [selected_reason, set_selected_reason] = useState<reason_type>();

  // FOR ADD MODAL
  const [add_modal, set_add_modal] = useState(false);
  const open_add_modal = () => {
    set_add_modal(true);
  };
  const close_add_modal = () => {
    set_add_modal(false);
  };

  // FOR UPDATE MODAL
  const [edit_modal, set_edit_modal] = useState(false);
  const open_edit_modal = () => {
    set_edit_modal(true);
  };
  const close_edit_modal = () => {
    set_edit_modal(false);
  };

  // FOR DELETING
  const [is_loading, set_is_loading] = useState(0);
  const handle_delete = async (reason: reason_type) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This action cannot be undone. Delete "${reason.reason_name.toUpperCase()}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;
    try {
      set_is_loading(reason.id!);
      const response = await remove_reason(reason.id);
      if (response.success) {
        setTimeout(
          () => {
            get_all_reasons();
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

  // FETCHING DEPARATMENTS
  const get_all_reasons = async () => {
    const response = await fetch_reasons();

    if (response.success) {
      set_reasons(response.data!);
    }
  };
  useEffect(() => {
    get_all_reasons();
  }, []);

  return (
    <>
      <Add_Reason
        open={add_modal}
        handle_show={open_add_modal}
        handle_close={close_add_modal}
        refresh_data={get_all_reasons}
      />
      <Edit_Reason
        data={selected_reason!}
        open={edit_modal}
        handle_show={open_edit_modal}
        handle_close={close_edit_modal}
        refresh_data={get_all_reasons}
      />
      <div className="h-30/90 bg-white">
        <div className="h-full rounded shadow p-3">
          <div className="flex justify-between items-center">
            <h4>Reason: </h4>
            <div className="size-10">
              <Button
                variant="success"
                text={
                  <>
                    <p>
                      <Plus />
                    </p>
                  </>
                }
                on_click={open_add_modal}
              />
            </div>
          </div>
          <div className="mt-2 h-80/100 overflow-y-auto flex flex-col gap-2">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="flex justify-between items-center rounded shadow bg-neutral-50 text-neutral-600 p-2"
              >
                <p className="w-3/10">{reason.reason_name}</p>
                <div className="flex gap-2">
                  <div
                    className="bg-green-500 hover:bg-green-600 text-neutral-50 transition duration-300 ease-in-out p-1 rounded cursor-pointer "
                    onClick={() => {
                      set_selected_reason(reason);
                      open_edit_modal();
                    }}
                  >
                    <SquarePen />
                  </div>
                  <div
                    className="bg-red-600 hover:bg-red-700 text-neutral-50 transition duration-300 ease-in-out p-1 rounded cursor-pointer "
                    onClick={() => handle_delete(reason)}
                  >
                    {is_loading === reason.id ? (
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
      </div>
    </>
  );
};
