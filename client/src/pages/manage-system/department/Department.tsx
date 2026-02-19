import { Loader, Plus, SquarePen, Trash } from "lucide-react";
import { Button } from "../../../components/button/Button";
import { useEffect, useState } from "react";
import { Add_Department } from "./Add_Department";
import {
  fetch_departments,
  remove_department,
  type department_type,
} from "../../../services/Department.Service";
import { Edit_Department } from "./Edit_Department";
import Swal from "sweetalert2";

export const Department = () => {
  const [departments, set_departments] = useState<department_type[]>([]);
  const [selected_department, set_selected_department] =
    useState<department_type>();

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
  const handle_delete = async (department: department_type) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This action cannot be undone. Delete "${department.department_name.toUpperCase()}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;
    try {
      set_is_loading(department.id!);
      const response = await remove_department(department.id);
      if (response.success) {
        setTimeout(
          () => {
            get_all_departments();
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
  const get_all_departments = async () => {
    const response = await fetch_departments();

    if (response.success) {
      set_departments(response.data!);
    }
  };
  useEffect(() => {
    get_all_departments();
  }, []);

  return (
    <>
      <Add_Department
        open={add_modal}
        handle_show={open_add_modal}
        handle_close={close_add_modal}
        refresh_data={get_all_departments}
      />
      <Edit_Department
        data={selected_department!}
        open={edit_modal}
        handle_show={open_edit_modal}
        handle_close={close_edit_modal}
        refresh_data={get_all_departments}
      />
      <div className="h-30/90 bg-white">
        <div className="h-full rounded shadow p-3">
          <div className="flex justify-between items-center">
            <h4>Department: </h4>
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
            {departments.map((department) => (
              <div
                key={department.id}
                className="flex justify-between items-center rounded shadow bg-neutral-50 text-neutral-600 p-2"
              >
                <p className="w-3/10">{department.department_name}</p>
                <div className="flex gap-2">
                  <div
                    className="bg-green-500 hover:bg-green-600 text-neutral-50 transition duration-300 ease-in-out p-1 rounded cursor-pointer "
                    onClick={() => {
                      set_selected_department(department);
                      open_edit_modal();
                    }}
                  >
                    <SquarePen />
                  </div>
                  <div
                    className="bg-red-600 hover:bg-red-700 text-neutral-50 transition duration-300 ease-in-out p-1 rounded cursor-pointer "
                    onClick={() => handle_delete(department)}
                  >
                    {is_loading === department.id ? (
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
