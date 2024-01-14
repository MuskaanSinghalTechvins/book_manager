import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  containerStyles?: string;
  title: string;
}

const DashboardWrapper = ({ children, containerStyles = "", title }: Props) => {
  return (
    <div className=" bg-secondary min-h-screen">
      <h1 className="h-[100px] text-center text-[36px] leading-[41px] font-bold text-white imageBg flex justify-center items-center drop-shadow-lg">
        {title}
      </h1>
      <div
        className={`${containerStyles} p-[50px] lg:max-w-[1280px] lg:mx-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
