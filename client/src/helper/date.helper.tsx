export const today = new Date();

export const get_start_date = (date_range: string): Date => {
  const now = new Date();

  switch (date_range) {
    case "week": {
      // Start of current week (Monday)
      const dayOfWeek = now.getDay(); // 0 = Sunday
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
    }

    case "month":
      // Start of current month
      return new Date(now.getFullYear(), now.getMonth(), 1);

    case "year":
      // Start of current year
      return new Date(now.getFullYear(), 0, 1);

    default:
      return new Date();
  }
};

export const get_end_date = (date_range: string): Date => {
  const now = new Date();

  switch (date_range) {
    case "week": {
      // End of current week (Sunday)
      const dayOfWeek = now.getDay();
      const diff = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
    }

    case "month":
      // End of current month (day 0 of next month = last day of current month)
      return new Date(now.getFullYear(), now.getMonth() + 1, 0);

    case "year":
      // End of current year
      return new Date(now.getFullYear(), 12, 0); // Dec 31

    default:
      return new Date();
  }
};

export const timeAgo = (dateString: string) => {
  const now = new Date();
  const created = new Date(dateString);

  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};
