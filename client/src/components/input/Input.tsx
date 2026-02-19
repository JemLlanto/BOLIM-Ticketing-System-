type Props = {
  type: string;
  value: string | number;
  onChange?: (e: string | number) => void;
  placeholder: string;
  name: string;
  disabled?: boolean;
  className?: string;
};

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  disabled = false,
  className = "",
}: Props) => {
  return (
    <input
      className={`h-10 w-full border border-neutral-400 bg-neutral-100/30 backdrop-blur-md rounded-lg outline-none focus:border-2 focus:border-blue-500 placeholder:text-neutral-400 px-3 py-2 ${className}`}
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
