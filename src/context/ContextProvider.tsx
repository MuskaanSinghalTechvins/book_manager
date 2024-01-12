import { ReactNode, useState } from "react";
import { Context } from ".";

interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  return (
    <Context.Provider value={{ initialLoading, setInitialLoading }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
