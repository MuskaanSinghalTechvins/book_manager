import { ReactNode, useReducer, useState } from "react";
import { UIContext } from ".";

interface Props {
  children: ReactNode;
}

interface UI {
  screen: string;
  visible: boolean;
  assets: any;
}

interface actionObj {
  type: "OPEN_MODAL" | "CLOSE_MODAL";
  payload: any;
}

const reducer = (state: UI, action: actionObj) => {
  if (action.type === "OPEN_MODAL") {
    return { ...state, visible: true, ...action.payload };
  } else if (action.type === "CLOSE_MODAL") {
    return { ...state, visible: false, screen: "" };
  } else {
    return state;
  }
};

const UIProvider = ({ children }: Props) => {
  const [uiState, dispatch] = useReducer(reducer, {
    visible: false,
    screen: "",
    assets: {},
  });
  return (
    <UIContext.Provider value={{ uiState, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;
