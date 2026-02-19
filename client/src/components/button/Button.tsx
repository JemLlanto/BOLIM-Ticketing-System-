import type { ReactNode } from "react";

type Props = {
  text: ReactNode;
  loading_text?: ReactNode;
  variant?: string;
  size?: string;
  is_loading?: boolean;
  disabled?: boolean;
  on_click?: () => void;
};

export const Button = ({
  text,
  loading_text,
  variant,
  size,
  is_loading,
  disabled,
  on_click,
}: Props) => {
  const border_radius =
    size === "sm"
      ? "rounded-sm"
      : size === "lg"
        ? "rounded-lg"
        : size === "xl"
          ? "rounded-lg"
          : "rounded-sm";
  const color =
    variant === "light"
      ? "bg-neutral-50 text-neutral-800 hover:bg-neutral-300 "
      : variant === "secondary"
        ? "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 "
        : variant === "danger"
          ? "bg-red-500 text-neutral-50 hover:bg-red-600 "
          : variant === "success"
            ? "bg-green-600 text-neutral-50 hover:bg-green-700 "
            : "bg-sky-600 text-neutral-50 hover:bg-sky-700";
  return (
    <button
      className={`h-10 w-full ${border_radius} ${color} flex justify-center items-center p-0 ${is_loading ? "cursor-progress" : "cursor-pointer"} transition duration-300 ease-in-out`}
      disabled={disabled}
      onClick={on_click}
    >
      {is_loading ? <>{loading_text}</> : <>{text}</>}
    </button>
  );
};
