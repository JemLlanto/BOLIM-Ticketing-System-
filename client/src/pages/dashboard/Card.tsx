interface CardProps {
  title: string;
  value: number;
}
export const Card = ({ title, value }: CardProps) => {
  const bg_color =
    title === "Total"
      ? "bg-sky-600 text-neutral-50"
      : title === "Pending"
        ? "bg-amber-600/20 border-l-3 border-amber-600 text-neutral-700"
        : title === "Ongoing"
          ? "bg-yellow-400/20 border-l-3 border-yellow-400 text-neutral-700"
          : title === "Resolved"
            ? "bg-green-500/20 border-l-3 border-green-500 text-neutral-700"
            : title === "Unresolved"
              ? "bg-red-300/20 border-l-3 border-red-600 text-neutral-700"
              : "bg-white";
  return (
    <div
      className={`h-40 ${bg_color} p-4 rounded shadow-lg hover:scale-102 transition duration-300 ease-in-out cursor-pointer`}
    >
      <h5 className="opacity-80">{title}</h5>
      <h1 className="font-semibold">{value}</h1>
    </div>
  );
};
