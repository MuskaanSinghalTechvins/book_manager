import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  containerStyles?: string;
}

const DashboardWrapper = ({ children, containerStyles = "" }: Props) => {
  return (
    <div className="lg:max-w-[1280px] lg:mx-auto bg-secondary min-h-screen">
      <h1 className="h-[100px] text-center text-[36px] leading-[41px] font-bold text-white imageBg flex justify-center items-center drop-shadow-lg">
        MY BOOKS
      </h1>
      <div className={`${containerStyles} p-[50px]`}>{children}</div>
    </div>
  );
};

export default DashboardWrapper;
