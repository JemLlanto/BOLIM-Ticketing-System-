export const get_status_badge_color = (status: string) => {
  return status === "pending"
    ? "bg-amber-600"
    : status === "ongoing"
      ? "bg-yellow-400"
      : status === "resolved"
        ? "bg-green-500"
        : status === "unresolved"
          ? "bg-red-500"
          : "bg-neutral-50";
};
