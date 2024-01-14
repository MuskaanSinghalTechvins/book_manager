import { faDoorOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  containerStyles?: string;
  title: string;
}

const DashboardWrapper = ({ children, containerStyles = "", title }: Props) => {
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("authorization");
    router.replace("/");
  };
  return (
    <div className=" bg-secondary min-h-screen">
      <header className="imageBg">
        <div className="lg:max-w-[1280px] lg:mx-auto grid grid-cols-3 p-2 ">
          <h1 className="h-[100px] text-center lg;text-[36px] lg:leading-[41px] text-[28px] font-bold text-white  flex justify-center items-center drop-shadow-lg col-start-2 ">
            {title}
          </h1>
          <div className="flex justify-end items-center ">
            <button
              className="text-white font-semibold lg:border lg:border-white rounded-[8px] px-4 py-1 hover:bg-white hover:text-black transition-all duration-300"
              onClick={logOut}
            >
              <span className="lg:inline-block hidden">Log Out</span>
              <FontAwesomeIcon icon={faDoorOpen} className="lg:hidden block" />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`${containerStyles} lg:p-[50px] p-5 lg:max-w-[1280px] lg:mx-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
