import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "../../../components/button/Button";
import { Loader } from "lucide-react";
import {
  create_deparmtent,
  type create_station_type,
} from "../../../services/Station.Service";

type Props = {
  open: boolean;
  handle_show: () => void;
  handle_close: () => void;
  refresh_data: () => void;
};

export const Add_Station = ({
  open,
  handle_show,
  handle_close,
  refresh_data,
}: Props) => {
  const [form_data, set_form_data] = useState<create_station_type>({
    station_name: "",
  });
  const [is_loading, set_is_loading] = useState(false);
  const handle_change = (field: string, value: string | number) => {
    set_form_data((prev) => ({ ...prev, [field]: value }));
  };

  const handle_submit = async () => {
    try {
      set_is_loading(true);
      const response = await create_deparmtent(form_data);
      if (response.success) {
        setTimeout(
          () => {
            handle_close();
            // RESETTING FORM DATA
            set_form_data({ station_name: "" });
            // REFETCHING DATA
            refresh_data();
            Swal.fire({
              icon: "success",
              title: "Station Added.",
              text: "Station added successfully.",
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
              title: "Add Failed",
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

  return (
    <Dialog open={open} onClose={handle_close}>
      <DialogTitle>Add Station</DialogTitle>
      <DialogContent className="w-110 flex flex-col gap-2">
        {/* FOR DEPARTMENT NAME */}
        <TextField
          id="station name"
          label="Station Name"
          defaultValue={form_data.station_name}
          variant="filled"
          onChange={(e) => handle_change("station_name", e.target.value)}
        />
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
            on_click={handle_submit}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};
