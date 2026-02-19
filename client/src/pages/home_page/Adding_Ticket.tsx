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
import { create_ticket, type Ticket } from "../../services/Ticket.Service";
import Swal from "sweetalert2";
import type { user_type } from "../../services/User.Service";
import { Button } from "../../components/button/Button";
import { Loader } from "lucide-react";

import {
  fetch_departments,
  type department_type,
} from "../../services/Department.Service";
import {
  fetch_stations,
  type station_type,
} from "../../services/Station.Service";
import { fetch_reasons, type reason_type } from "../../services/Reason.Service";

type Props = {
  user: user_type;
  open: boolean;
  handle_show: () => void;
  handle_close: () => void;
  get_all_tickets: (user_id?: number | null) => void;
};

export const Adding_Ticket = ({
  user,
  open,
  handle_show,
  handle_close,
  get_all_tickets,
}: Props) => {
  const [form_data, set_form_data] = useState<Ticket>({
    user_id: 0,
    user: "",
    department: "",
    station: "",
    reason: "",
    other_reason: "",
    description: "",
    status: "pending",
  });
  const [is_loading, set_is_loading] = useState(false);

  const [departments, set_departments] = useState<department_type[]>([]);
  const [stations, set_stations] = useState<station_type[]>([]);
  const [reasons, set_reasons] = useState<reason_type[]>([]);

  // FETCHING TICKET SELECTS
  const get_select_data = async () => {
    try {
      const [dept_response, station_response, reason_response] =
        await Promise.all([
          fetch_departments(),
          fetch_stations(),
          fetch_reasons(),
        ]);

      if (dept_response.success) {
        set_departments(dept_response.data ?? []);
      }

      if (station_response.success) {
        set_stations(station_response.data ?? []);
      }

      if (reason_response.success) {
        set_reasons(reason_response.data ?? []);
      }
    } catch (error) {
      console.error("Error fetching select data:", error);
    }
  };
  useEffect(() => {
    get_select_data();
  }, []);

  const handle_change = (field: string, value: string | number) => {
    set_form_data((prev) => ({ ...prev, [field]: value }));
  };
  const handle_submit = async () => {
    try {
      set_is_loading(true);
      const response = await create_ticket(form_data);
      if (response.success) {
        setTimeout(
          () => {
            handle_close();
            // RESETTING FORM DATA
            set_form_data({
              user_id: 0,
              user: "",
              department: "",
              station: "",
              reason: "",
              other_reason: "",
              description: "",
              status: "pending",
            });
            // REFETCHING TICKETS
            get_all_tickets(!user.is_admin ? user.id : null);
            Swal.fire({
              icon: "success",
              title: "Ticket Submitted",
              text: "Please wait for updates.",
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
              title: "Submission Failed",
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
    if (!user) return;
    set_form_data((prev) => ({
      ...prev,
      user_id: user.id,
      user: user.user_name,
    }));
  }, [user]);
  return (
    <Dialog open={open} onClose={handle_close}>
      <DialogTitle>Ticket Details </DialogTitle>
      <DialogContent className=" flex flex-col gap-2">
        {/* SELECT FOR DEPARTMENT */}
        <FormControl variant="filled" className="w-50 md:w-120 mt-5">
          <InputLabel id="department">Department</InputLabel>
          <Select
            className=""
            labelId="department"
            id="department"
            value={form_data.department}
            label="department"
            onChange={(e) => handle_change("department", e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.department_name}>
                {dept.department_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* SELECT FOR STATION */}
        <FormControl variant="filled" className="w-50 md:w-120 mt-5">
          <InputLabel id="station">Station</InputLabel>
          <Select
            className=""
            labelId="station"
            id="station"
            value={form_data.station}
            label="station"
            onChange={(e) => handle_change("station", e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {stations.map((station) => (
              <MenuItem key={station.id} value={station.station_name}>
                {station.station_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* SELECT FOR REASON */}
        <FormControl variant="filled" className="w-50 md:w-120 mt-5">
          <InputLabel id="station">Reason</InputLabel>
          <Select
            className=""
            labelId="station"
            id="station"
            value={form_data.reason}
            label="reason"
            onChange={(e) => handle_change("reason", e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {reasons.map((reason) => (
              <MenuItem key={reason.id} value={reason.reason_name}>
                {reason.reason_name}
              </MenuItem>
            ))}
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
        {/* FOR SPECIFYING OTHER REASON */}
        {form_data.reason === "others" ? (
          <TextField
            className="w-50 md:w-120 mt-5"
            id="other-value"
            label="Specify"
            variant="filled"
            onChange={(e) => handle_change("other_reason", e.target.value)}
          />
        ) : null}
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          defaultValue={form_data.description}
          variant="filled"
          onChange={(e) => handle_change("description", e.target.value)}
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
