export const get_dropdown_label = (date_range: string) => {
  const dropdown_label =
    date_range === "week"
      ? "This Week"
      : date_range === "month"
        ? "This Month"
        : date_range === "year"
          ? "This Year"
          : date_range === "custom"
            ? "Custom"
            : "Undefined";
  return dropdown_label;
};

export const new_status = (status: string) => {
  const new_status =
    status === "pending"
      ? "Ongoing"
      : status === "ongoing"
        ? "Resolved"
        : "invalid status";
  return new_status;
};
