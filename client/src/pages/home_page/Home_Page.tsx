import { useEffect, useState } from "react";
import { get_status_badge_color } from "../../helper/style.helper";
import { Adding_Ticket } from "./Adding_Ticket";
import { TicketPlus } from "lucide-react";
import {
  fetch_pending_ongoing_tickets,
  type Ticket,
} from "../../services/Ticket.Service";
import { useOutletContext } from "react-router-dom";
import { Ticket_Details } from "./Ticket_Details";
import type { user_type } from "../../services/User.Service";
import { timeAgo } from "../../helper/date.helper";

interface context_type {
  user: user_type;
  tickets: Ticket[];
  get_all_tickets: () => void;
}

export const Home_Page = () => {
  const { user } = useOutletContext<context_type>();
  const [tickets, set_tickets] = useState<Ticket[]>([]);

  const get_pending_ongoing_tickets = async (user_id?: number | null) => {
    const response = await fetch_pending_ongoing_tickets(user_id);

    if (response.success && response.data) {
      set_tickets(response.data);
      console.log("Tickets: ", response.data);
    }
  };
  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    get_pending_ongoing_tickets(!user.is_admin ? user.id : null);
  }, [user]);

  const [selected_ticket, set_selected_ticket] = useState<Ticket>();
  const [add_ticket_modal, set_add_ticket_modal] = useState(false);
  const open_modal_ticket = () => {
    set_add_ticket_modal(true);
  };
  const close_modal_ticket = () => {
    set_add_ticket_modal(false);
  };
  const [show_ticket_details, set_show_ticket_details] = useState(false);
  const open_ticket_details = () => {
    set_show_ticket_details(true);
  };
  const close_ticket_details = () => {
    set_show_ticket_details(false);
  };

  return (
    <>
      {/* ADDING MODAL */}
      <Adding_Ticket
        user={user}
        open={add_ticket_modal}
        handle_show={open_modal_ticket}
        handle_close={close_modal_ticket}
        get_all_tickets={get_pending_ongoing_tickets}
      />
      {/* TICKET DETAIL MODAL */}
      <Ticket_Details
        user={user}
        ticket={selected_ticket}
        open={show_ticket_details}
        handle_show={open_ticket_details}
        handle_close={close_ticket_details}
        get_all_tickets={get_pending_ongoing_tickets}
      />
      <div className="h-full w-full ">
        <div className="h-full bg-neutral-50 rounded p-2  lg:p-5">
          <h3>
            Ongoing Ticket/s: <strong>{tickets ? tickets.length : 0}</strong>
          </h3>
          <div className="h-94/100 overflow-auto border border-neutral-300 bg-neutral-100 rounded flex flex-col gap-2 mt-2 lg:mt-4 p-2 lg:p-5">
            {/* CREATE NEW TICKET MODAL */}
            {!user.is_admin ? (
              <>
                <div
                  className="h-30 w-full border border-neutral-200 bg-emerald-500 rounded hover:scale-[100.5%] transition duration-200 cursor-pointer"
                  onClick={open_modal_ticket}
                >
                  <div className="h-full flex justify-between items-center select-none p-5">
                    <div className="flex items-center gap-3 text-neutral-50">
                      <span>
                        <TicketPlus size={40} />
                      </span>
                      <h3 className="">New Ticket</h3>
                    </div>
                    <div className="size-20 flex justify-center items-center border-s-2 border-dashed border-neutral-50 ps-3">
                      <div
                        className={`size-5 rounded-full ${get_status_badge_color("")}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="h-30 w-full border border-neutral-200 bg-neutral-50 rounded hover:scale-[100.5%] transition duration-200 cursor-pointer"
                  onClick={() => {
                    set_selected_ticket(ticket);
                    open_ticket_details();
                  }}
                >
                  <div className="h-full flex justify-between items-center select-none p-5">
                    <div className="flex flex-col">
                      <h3 className="text-sky-800">
                        {ticket.department}: {ticket.station}{" "}
                      </h3>
                      <p className="text-neutral-700">
                        Reason: {ticket.reason}
                      </p>
                      <p className="text-sm text-neutral-400">
                        {ticket.createdAt && timeAgo(String(ticket.createdAt))}
                      </p>
                    </div>
                    <div className="size-20 flex justify-center items-center border-s-2 border-dashed border-neutral-300 ps-3">
                      <div
                        className={`size-5 rounded-full ${get_status_badge_color(ticket.status)}`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="h-5/10 flex justify-center items-center text-neutral-500">
                  <h3>No tickets.</h3>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
