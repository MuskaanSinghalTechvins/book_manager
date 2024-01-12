import { Context } from "@/context";
import { useAuth } from "@/hooks/useAuth";
import { Lato } from "next/font/google";
import { ReactNode, useContext } from "react";
import Modal from "./Modal";

const lato = Lato({ weight: ["400"], preload: false });

interface Props {
  children: ReactNode;
}

const SplashScreen = () => {
  return (
    <div className="h-screen bg-primary  flex justify-center items-center text-lg text-white font-bold">
      Loading...
    </div>
  );
};

const SplashWrapper = ({ children }: Props) => {
  useAuth();
  const { initialLoading } = useContext(Context);
  return initialLoading ? (
    <SplashScreen />
  ) : (
    <div className={lato.className}>
      {children}
      <Modal />
    </div>
  );
};

export default SplashWrapper;
