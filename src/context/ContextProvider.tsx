import { ReactNode, useReducer, useState } from "react";
import { Context } from ".";
import { GlobalState, action } from "@/types";
import { List } from "@/data/bookList";
import { CRUDReducer, FilteringReducer, OrderingReducer } from "./slices";

interface Props {
  children: ReactNode;
}

interface actionObj {
  type: action;
  payload: any;
}

// Main reducer function for manipulating books related state
const reducer = (state: GlobalState, action: actionObj) => {
  const { type, payload } = action;

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
    // Global list
    bookList: List,
    // state for showing filtered list without manipulating original list
    filteredList: [],
  });

  return (
    <Context.Provider
      value={{
        initialLoading,
        setInitialLoading,
        bookList: state.bookList,
        // main action dispatcher for books related state management
        bookDispatcher: dispatch,
        filteredList: state.filteredList,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
