import { ReactNode, useReducer, useState } from "react";
import { Context } from ".";
import { Book, GlobalState, action } from "@/types";
import { List } from "@/data/bookList";
import { CRUDReducer, FilteringReducer, OrderingReducer } from "./slices";

interface Props {
  children: ReactNode;
}

interface actionObj {
  type: action;
  payload: any;
}

const reducer = (state: GlobalState, action: actionObj) => {
  const { type, payload } = action;
  console.log(type);
  let updatedState = CRUDReducer(type, payload, state);
  if (!updatedState) {
    updatedState = OrderingReducer(type, state);
    if (!updatedState) {
      updatedState = FilteringReducer(type, payload, state);
    }
  }
  return updatedState ? updatedState : state;
};

const ContextProvider = ({ children }: Props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    bookList: List,
    filteredList: [],
  });

  return (
    <Context.Provider
      value={{
        initialLoading,
        setInitialLoading,
        bookList: state.bookList,
        bookDispatcher: dispatch,
        filteredList: state.filteredList,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
