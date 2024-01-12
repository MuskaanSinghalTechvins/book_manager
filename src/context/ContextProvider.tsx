import { ReactNode } from "react";
import { Context } from ".";

interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default ContextProvider;
