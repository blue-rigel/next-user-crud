import { FieldErrors, UseFormRegister } from "react-hook-form";

const Input = ({
  label,
  field,
  register,
  required,
  errors
}: {
  label: string;
  field: "username" | "first_name" | "last_name";
  register: UseFormRegister<{
    username: string;
    first_name: string;
    last_name: string | undefined;
  }>;
  required?: boolean;
  errors: FieldErrors<{
    username: string;
    first_name: string;
    last_name: string | undefined;
  }>;
}) => (
  <div className="my-10 relative py-3">
    <input
      id={"id-" + field}
      type="text"
      placeholder={label}
      {...register(field, { required })}
      className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
    />
    <label
      htmlFor={"id-" + field}
      className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
    >
      {label}
    </label>
    <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition ">
      <span className="text-red-600">{errors[field]?.message}</span>
    </small>
  </div>
);

export default Input;
