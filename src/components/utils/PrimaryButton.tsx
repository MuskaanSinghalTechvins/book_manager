import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  styles?: string;
  type?: "button" | "submit";
  onClick?: (p1: React.SyntheticEvent) => any;
}

const PrimaryButton = ({
  children,
  styles = "",
  type,
  onClick = () => {},
}: Props) => {
  return (
    <button
      className={`px-4 py-2 rounded-[8px] bg-primary text-white font-semibold text-sm shadow-3xl ${styles}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
