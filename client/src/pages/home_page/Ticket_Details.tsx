import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  update_status,
  type Ticket,
  type update_ticket_status_type,
} from "../../services/Ticket.Service";
import Swal from "sweetalert2";
import { Button } from "../../components/button/Button";
import { Loader, StepForward, TicketX } from "lucide-react";
import { new_status } from "../../helper/general.helper";
import type { user_type } from "../../services/User.Service";

type Props = {
  user: user_type;
  ticket?: Ticket;
  open: boolean;
  handle_show: () => void;
  handle_close: () => void;
  get_all_tickets?: () => void;
};
export const Ticket_Details = ({
  user,
  ticket,
  open,
  handle_show,
  handle_close,
  get_all_tickets,
}: Props) => {
  const [form_data, set_form_data] = useState<update_ticket_status_type>({
    id: 0,
    remarks: "",
    new_status: "",
    it_personel: "",
  });
  const [is_loading, set_is_loading] = useState(false);

  const handle_update_status = async (
    update_data: update_ticket_status_type,
  ) => {
    if (!ticket) return;
    handle_close();
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: `You are about to update the ticket status to ${new_status(ticket.status).toUpperCase()}.`,
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    handle_show();
    if (!result.isConfirmed) return;

    try {
      set_is_loading(true);
      const response = await update_status(update_data);
      if (response.success) {
        setTimeout(
          () => {
            handle_close();
            // RESETTING FORM DATA
            set_form_data({
              id: 0,
              remarks: "",
              new_status: "",
              it_personel: "",
            });
            // REFETCHING TICKETS
            get_all_tickets?.();
            Swal.fire({
              icon: "success",
              title: "Ticket Updated",
              text: "Status updated.",
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
    if (!ticket) return;

    set_form_data((prev) => ({
      ...prev,
      id: ticket.id,
      new_status: new_status(ticket.status).toLowerCase(),
      it_personel: user.user_name,
    }));
  }, [user, ticket]);

  if (!ticket) return;

  const status_color =
    ticket.status === "pending"
      ? "text-amber-600"
      : ticket.status === "ongoing"
        ? "text-yellow-500"
        : ticket.status === "resolved"
          ? "text-green-500"
          : ticket.status === "unresolved"
            ? "text-red-600"
            : "text-neutral-500";

  return (
    <Dialog open={open} onClose={handle_close}>
      <DialogTitle>
        <div className="flex flex-col">
          <div>
            Ticket Details:{" "}
            <span className={`${status_color}`}>
              {ticket.status.toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-neutral-500">
            Submitted by: {ticket.user}(
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })
              : ""}
            )
          </span>
          {ticket.it_personel ? (
            <span className="text-sm text-neutral-500">
              IT Personel: {ticket.it_personel}
            </span>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent className=" flex flex-col gap-2">
        <div className="lg:w-120 flex flex-col gap-2">
          {/* SELECT FOR DEPARTMENT */}
          <div>
            <h5 className="text-neutral-600">DEPARTMENT:</h5>
            <p>{ticket?.department}</p>
          </div>
          {/* SELECT FOR STATION */}
          <div>
            <h5 className="text-neutral-600">STATION:</h5>
            <p>{ticket?.station}</p>
          </div>
          {/* SELECT FOR REASON */}
          <div>
            <h5 className="text-neutral-600">REASON:</h5>
            <p>{ticket?.reason}</p>
          </div>
          {/* DESCRIPTION */}
          <div>
            <h5 className="text-neutral-600">DESCRIPTION:</h5>
            <p>{ticket?.description}</p>
          </div>
          {/* REMARKS */}
          {["ongoing", "pending"].includes(ticket.status) && user.is_admin ? (
            <TextField
              id="remarks"
              label="Remarks"
              multiline
              rows={4}
              defaultValue={form_data.remarks}
              variant="filled"
              onChange={(e) =>
                set_form_data((prev) => ({ ...prev, remarks: e.target.value }))
              }
            />
          ) : ticket.remarks ? (
            <div>
              <h5 className="text-neutral-600">Remarks:</h5>
              <p>{ticket.remarks}</p>
            </div>
          ) : null}
        </div>
      </DialogContent>
      {["pending", "ongoing"].includes(ticket.status) && user.is_admin ? (
        <DialogActions>
          <div className="flex w-80/100 lg:w-70/100 gap-2 me-4 mb-4">
            <Button
              variant="secondary"
              text={
                <>
                  <p className="flex justify-center items-center gap-2">
                    Close
                  </p>
                </>
              }
              on_click={handle_close}
            />
            <Button
              variant="danger"
              text={
                <>
                  <p className="flex justify-center items-center gap-2">
                    Cancel <TicketX size={17} />
                  </p>
                </>
              }
              on_click={() => {
                handle_update_status({
                  id: form_data.id,
                  new_status: "unresolved",
                  remarks: form_data.remarks,
                  it_personel: user.user_name,
                });
              }}
            />
            <Button
              text={
                <>
                  <p className="flex justify-center items-center gap-2">
                    {new_status(ticket.status)} <StepForward size={17} />
                  </p>
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
              on_click={() => handle_update_status(form_data)}
            />
          </div>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};
