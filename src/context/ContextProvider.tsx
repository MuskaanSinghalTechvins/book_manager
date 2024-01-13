import { ReactNode, useReducer, useState } from "react";
import { Context } from ".";
import { Book, GlobalState, action } from "@/types";
import { List } from "@/data/bookList";
import { CRUDReducer, OrderingReducer } from "./slices";

interface Props {
  children: ReactNode;
}

interface PageState {
  start: number;
}

interface actionObj {
  type: action;
  payload: any;
}

const reducer = (state: GlobalState, action: actionObj) => {
  const { type, payload } = action;
  let updatedState = CRUDReducer(type, payload, state);
  if (!updatedState) {
    updatedState = OrderingReducer(type, state);
  }
  return updatedState ? updatedState : state;
};

const ContextProvider = ({ children }: Props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, { bookList: List });

  return (
    <Context.Provider
      value={{
        initialLoading,
        setInitialLoading,
        bookList: state.bookList,
        bookDispatcher: dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
