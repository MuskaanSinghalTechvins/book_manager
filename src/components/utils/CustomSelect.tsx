import { Context } from "@/context";
import { choice } from "@/types";
import { useContext } from "react";

interface Props {
  options: choice[];
  label: string;
  placeholder: string;
}

const CustomSelect = ({ label, options, placeholder }: Props) => {
  const { bookDispatcher } = useContext(Context);
  const handleSelect = (e: React.SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      bookDispatcher({ type: value });
    }
  };
  return (
    <div className="flex justify-start items-center gap-x-3">
      <p className="text-primary font-semibold text-md">{label} :</p>
      <select
        className="p-1 bg-white bg-opacity-70 rounded-[5px] text-sm"
        onChange={handleSelect}
      >
        <option value={""} hidden>
          {placeholder}
        </option>
        {options?.map(({ label, value }, idx) => (
          <option key={`option-${idx}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
