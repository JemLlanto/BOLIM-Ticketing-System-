import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { Drop_Down } from "../../components/drop_down/Drop_Down";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  get_end_date,
  get_start_date,
  timeAgo,
} from "../../helper/date.helper";
import { get_dropdown_label } from "../../helper/general.helper";
import { useOutletContext } from "react-router-dom";
import {
  fetch_tickets_by_date,
  type Ticket,
} from "../../services/Ticket.Service";
import { get_status_badge_color } from "../../helper/style.helper";
import type { user_type } from "../../services/User.Service";
import { Ticket_Details } from "../home_page/Ticket_Details";

interface context_type {
  user: user_type;
}

export const Ticket_History = () => {
  const { user } = useOutletContext<context_type>();
  const [tickets, set_tickets] = useState<Ticket[]>([]);

  const get_pending_ongoing_tickets = async (
    start_date: Date,
    end_date: Date,
    user_id?: number | null,
  ) => {
    const response = await fetch_tickets_by_date(start_date, end_date, user_id);

    if (response.success && response.data) {
      set_tickets(response.data);
      console.log("Tickets by date: ", response.data);
    }
  };

  const [selected_ticket, set_selected_ticket] = useState<Ticket>();
  const [show_ticket_details, set_show_ticket_details] = useState(false);
  const open_ticket_details = () => {
    set_show_ticket_details(true);
  };
  const close_ticket_details = () => {
    set_show_ticket_details(false);
  };

  const [start_date, set_start_date] = useState<Date | null>(null);
  const [end_date, set_end_date] = useState<Date | null>(null);
  const [date_range, set_date_range] = useState("week");

  useEffect(() => {
    if (date_range === "custom") return;
    const set_date = () => {
      const newStart = get_start_date(date_range);
      const newEnd = get_end_date(date_range);

      set_start_date(newStart);
      set_end_date(newEnd);
    };
    set_date();
  }, [date_range]);

  // AUTOMATIC FETCHING OF TICKETS WHEN DATE RANGE CHANGES
  useEffect(() => {
    // console.log(`checking date range: ${start_date} - ${end_date}`);

    if (!user || !start_date || !end_date) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    get_pending_ongoing_tickets(
      start_date,
      end_date,
      !user.is_admin ? user.id : null,
    );
  }, [user, start_date, end_date]);

  return (
    <>
      {/* TICKET DETAIL MODAL */}
      <Ticket_Details
        user={user}
        ticket={selected_ticket}
        open={show_ticket_details}
        handle_show={open_ticket_details}
        handle_close={close_ticket_details}
      />
      <div className="h-full w-10/10 ">
        <div className="h-full w-10/10 bg-neutral-50 rounded p-5">
          <div className="relative flex flex-wrap items-center gap-2">
            <h3>Ticket History:</h3>

            <div className=" lg:left-50 flex flex-wrap items-center gap-2">
              <Drop_Down
                dropdown_label={
                  <>
                    <h4 className="select-none font-bold">
                      {get_dropdown_label(date_range)}
                    </h4>
                  </>
                }
                dropdown_style="hover:bg-neutral-200 rounded transition duration-300 ease-in-out px-1 cursor-pointer z-50"
              >
                <Button
                  text={
                    <>
                      <p className="font-medium">This Week</p>
                    </>
                  }
                  variant={date_range === "week" ? "primary" : "light"}
                  on_click={() => set_date_range("week")}
                ></Button>
                <Button
                  text={
                    <>
                      <p className="font-medium">This Month</p>
                    </>
                  }
                  variant={date_range === "month" ? "primary" : "light"}
                  on_click={() => set_date_range("month")}
                ></Button>
                <Button
                  text={
                    <>
                      <p className="font-medium">This Year</p>
                    </>
                  }
                  variant={date_range === "year" ? "primary" : "light"}
                  on_click={() => set_date_range("year")}
                ></Button>
                <Button
                  text={
                    <>
                      <p className="font-medium">Custom</p>
                    </>
                  }
                  variant={date_range === "custom" ? "primary" : "light"}
                  on_click={() => set_date_range("custom")}
                ></Button>
              </Drop_Down>
              <div className="flex gap-2">
                <DatePicker
                  className="w-28 outline-2 outline-neutral-300 focus:outline-sky-400 rounded py-1 px-2"
                  selected={start_date}
                  onChange={(date: Date | null) => {
                    set_date_range("custom");
                    set_start_date(date);
                  }}
                  placeholderText="Start Date"
                  dateFormat="MM-dd-yyyy"
                />
                {"-"}
                <DatePicker
                  className="w-28 outline-2 outline-neutral-300 focus:outline-sky-400 rounded py-1 px-2"
                  selected={end_date}
                  onChange={(date: Date | null) => {
                    set_date_range("custom");
                    set_end_date(date);
                  }}
                  placeholderText="Start Date"
                  dateFormat="MM-dd-yyyy"
                />
              </div>
            </div>
          </div>

          <div className="h-84/100 lg:h-94/100 max-w-10/10 overflow-x-auto border border-neutral-300 bg-neutral-100 rounded flex flex-col gap-2 mt-4 p-5">
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
