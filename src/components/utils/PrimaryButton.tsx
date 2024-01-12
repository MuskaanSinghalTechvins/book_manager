import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  styles?: string;
  type?: "button" | "submit";
  onClick?: Function;
}

const PrimaryButton = ({ children, styles = "", type }: Props) => {
  return (
    <button
      className={`px-4 py-2 rounded-[8px] bg-primary text-white font-semibold text-sm shadow-3xl w-full ${styles}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
