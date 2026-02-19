import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card } from "./Card";
import {
  fetch_tickets_by_date,
  type Ticket,
} from "../../services/Ticket.Service";
import { Drop_Down } from "../../components/drop_down/Drop_Down";
import { Button } from "../../components/button/Button";
import { get_dropdown_label } from "../../helper/general.helper";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { get_end_date, get_start_date } from "../../helper/date.helper";

type Status = "pending" | "ongoing" | "resolved" | "unresolved";

export const Dashboard = () => {
  const [tickets, set_tickets] = useState<Ticket[]>([]);

  const get_pending_ongoing_tickets = async (
    start_date: Date,
    end_date: Date,
  ) => {
    const response = await fetch_tickets_by_date(start_date, end_date);

    if (response.success && response.data) {
      set_tickets(response.data);
      console.log("Tickets by date: ", response.data);
    }
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

    if (!start_date || !end_date) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    get_pending_ongoing_tickets(start_date, end_date);
  }, [start_date, end_date]);

  const total = tickets.length;
  const pending = tickets.filter((t) => t.status === "pending").length;
  const ongoing = tickets.filter((t) => t.status === "ongoing").length;
  const resolved = tickets.filter((t) => t.status === "resolved").length;
  const unresolved = tickets.filter((t) => t.status === "unresolved").length;

  const STATUS_COLORS: Record<Status, string> = {
    pending: "#ff8c1a", // orange
    ongoing: "#facc15", // yellow
    resolved: "#22c55e", // green
    unresolved: "#ef4444", // red
  };

  // ===== STATUS COUNTS =====
  const statusMap: Record<string, number> = {
    pending: 0,
    ongoing: 0,
    resolved: 0,
    unresolved: 0,
  };

  tickets.forEach((ticket) => {
    statusMap[ticket.status]++;
  });

  const statusData: { name: Status; value: number }[] = (
    Object.entries(statusMap) as [Status, number][]
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // ================= DEPARTMENT DATA =================
  const departmentMap: Record<string, number> = {};

  tickets.forEach((ticket) => {
    departmentMap[ticket.department] =
      (departmentMap[ticket.department] || 0) + 1;
  });

  const departmentData = Object.entries(departmentMap)
    .map(([department, count]) => ({
      department,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="h-10/10 w-full bg-neutral-50 rounded p-5 space-y-6">
      <div className="relative flex juce items-center gap-2 mb-4">
        <h3 className="">Dashboard:</h3>
        <div className="absolute left-40 flex items-center gap-2 z-10">
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

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card title="Total" value={total} />
        <Card title="Pending" value={pending} />
        <Card title="Ongoing" value={ongoing} />
        <Card title="Resolved" value={resolved} />
        <Card title="Unresolved" value={unresolved} />
      </div>

      <div className="grid h-71/100 grid-cols-2 gap-6">
        {/* ================= PIE CHART ================= */}
        <div className="bg-white flex justify-center items-center flex-col rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Status Distribution</h2>

          <div className="w-10/10 h-92">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.name]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= BAR CHART ================= */}
        <div className="bg-white flex justify-center items-center flex-col rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Tickets by Department</h2>

          <div className="w-10/10 h-92">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
