const Button = ({
  label,
  className,
  disabled,
  type,
}: {
  label: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      className={
        "inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-lg focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-md focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none " +
        (className || "")
      }
      disabled={disabled || false}
      type={type || "button"}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
