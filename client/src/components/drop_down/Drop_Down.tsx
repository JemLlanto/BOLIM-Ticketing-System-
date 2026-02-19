import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  dropdown_label: ReactNode;
  dropdown_style?: string;
};

export const Drop_Down = ({
  children,
  dropdown_label,
  dropdown_style,
}: Props) => {
  const [show, set_show] = useState(false);
  const [animating, set_animating] = useState<boolean>(false);
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const drop_down_ref = useRef<HTMLDivElement>(null);

  const handle_drop_down = () => {
    set_show((prev) => !prev);
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        set_is_visible(true);
      }, 0);
      setTimeout(() => {
        set_animating(true);
      }, 100);
    } else {
      setTimeout(() => {
        set_animating(false);
      }, 0);
      setTimeout(() => {
        set_is_visible(false);
      }, 500);
    }
  }, [show]);

  // CLOSE DROPDOWN WHEN PRESSED OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drop_down_ref.current &&
        !drop_down_ref.current.contains(event.target as Node)
      ) {
        set_show(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={drop_down_ref}>
      <div
        className={
          dropdown_style
            ? dropdown_style
            : `rounded-lg px-4 py-2 hover:bg-neutral-200 trnasition duration-300 ease-in-out cursor-pointer
            ${show ? "bg-neutral-300 hover:bg-neutral-300" : ""}`
        }
        onClick={handle_drop_down}
      >
        {dropdown_label}
      </div>
      <div
        className={`absolute right-0 min-h-20 min-w-35 flex flex-col gap-2 p-2 rounded-lg bg-neutral-100 shadow-xl transition-all duration-200 ease-in-out 
            ${animating ? "top-14 opacity-100" : "top-0 opacity-0 delay-200"}
            ${is_visible ? "visible" : "hidden"}`}
        onClick={handle_drop_down}
      >
        {children}
      </div>
    </div>
  );
};
