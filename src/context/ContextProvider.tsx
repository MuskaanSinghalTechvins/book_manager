import { ReactNode, useReducer, useState } from "react";
import { Context } from ".";
import { Book } from "@/types";
import { List } from "@/data/bookList";

interface Props {
  children: ReactNode;
}

interface State {
  bookList: Book[];
}

interface actionObj {
  type: "ADD_NEW_BOOK" | "EDIT_BOOK" | "DELETE_BOOK";
  payload: any;
}

const reducer = (state: State, action: actionObj) => {
  const { type, payload } = action;
  if (type === "ADD_NEW_BOOK") {
    return {
      ...state,
      bookList: [
        { id: crypto.randomUUID(), ...payload?.book },
        ...state.bookList,
      ],
    };
  } else if (type === "EDIT_BOOK") {
    const bookId = payload.book.id;
    const list = [...state.bookList];
    const selectedBookIdx = state.bookList.findIndex(
      (item) => item.id === bookId
    );
    if (selectedBookIdx >= 0) {
      list[selectedBookIdx] = { ...list[selectedBookIdx], ...payload.book };
    }

    console.log(payload.book, list, selectedBookIdx);

    return {
      ...state,
      bookList: list,
    };
  } else if (type === "DELETE_BOOK") {
    const bookId = payload.bookId;
    const list = state.bookList?.filter((item) => item.id !== bookId);
    console.log(list);
    return {
      ...state,
      bookList: list,
    };
  } else {
    return state;
  }
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
