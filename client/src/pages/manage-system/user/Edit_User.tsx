import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  update_user,
  type update_user_type,
  type user_type,
} from "../../../services/User.Service";
import { Button } from "../../../components/button/Button";
import { Loader } from "lucide-react";

type Props = {
  data: user_type;
  open: boolean;
  handle_show: () => void;
  handle_close: () => void;
  refresh_data: (user_id?: number | null) => void;
};

export const Edit_User = ({
  data,
  open,
  handle_show,
  handle_close,
  refresh_data,
}: Props) => {
  const [form_data, set_form_data] = useState<update_user_type>({
    user_name: "",
    password: "",
    is_admin: 0,
  });
  const [is_loading, set_is_loading] = useState(false);
  const handle_change = (field: string, value: string | number) => {
    set_form_data((prev) => ({ ...prev, [field]: value }));
  };

  const handle_update = async () => {
    try {
      set_is_loading(true);
      const response = await update_user(data.id, form_data);
      if (response.success) {
        setTimeout(
          () => {
            handle_close();
            // RESETTING FORM DATA
            set_form_data({ user_name: "", password: "", is_admin: 0 });
            // REFETCHING DATA
            refresh_data();
            Swal.fire({
              icon: "success",
              title: "User Updated.",
              text: "User details updated.",
              confirmButtonColor: "#3085d6",
            });
          },
          import.meta.env.VITE_TIME_OUT,
        );
      } else {
        setTimeout(
          () => {
            handle_close();
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: response.message || "Something went wrong.",
              confirmButtonColor: "#d33",
            }).then(() => handle_show());
          },
          import.meta.env.VITE_TIME_OUT,
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(
        () => {
          set_is_loading(false);
        },
        import.meta.env.VITE_TIME_OUT,
      );
    }
  };

  useEffect(() => {
    if (!data) return;
    set_form_data((prev) => ({
      ...prev,
      user_name: data.user_name,
      is_admin: data.is_admin,
    }));
  }, [data]);

  return (
    <Dialog open={open} onClose={handle_close}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent className=" flex flex-col gap-2">
        {/* FOR USERNAME */}
        <TextField
          id="username"
          label="Username"
          defaultValue={form_data.user_name}
          variant="filled"
          onChange={(e) => handle_change("user_name", e.target.value)}
        />
        {/* FOR PASSWORD */}
        <TextField
          id="password"
          label="Password"
          defaultValue={form_data.password}
          variant="filled"
          onChange={(e) => handle_change("password", e.target.value)}
        />
        {/* SELECT FOR REASON */}
        <FormControl variant="filled" className="w-50 md:w-120 mt-5">
          <InputLabel id="is_admin">Is Admin</InputLabel>
          <Select
            className=""
            labelId="is_admin"
            id="is_admin"
            value={form_data.is_admin}
            label="reais_adminson"
            onChange={(e) => handle_change("is_admin", e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <div className="flex w-50/100 gap-2 me-4 mb-4">
          <Button
            variant="secondary"
            text={
              <>
                <p className="">Cancel</p>
              </>
            }
            on_click={handle_close}
          />
          <Button
            text={
              <>
                <p className="">Submit</p>
              </>
            }
            loading_text={
              <>
                <p className="animate-[spin_2s_linear_infinite]">
                  <Loader />
                </p>
              </>
            }
            disabled={is_loading}
            is_loading={is_loading}
            on_click={handle_update}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};
