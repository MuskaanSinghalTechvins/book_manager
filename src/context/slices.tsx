import { GlobalState, action } from "@/types";

export const CRUDReducer = (type: action, payload: any, state: GlobalState) => {
  if (type === "ADD_NEW_BOOK") {
    return {
      ...state,
      bookList: [
        {
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          ...payload?.book,
        },
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
  }
};

const getTimestamp = (iso?: string) => {
  return iso ? new Date(iso)?.getTime() : 0;
};

export const OrderingReducer = (type: action, state: GlobalState) => {
  if (type === "LATEST" || type === "OLDEST") {
    const list = state.bookList?.sort((b, a) => {
      const bSec = getTimestamp(b.created_at);
      const aSec = getTimestamp(a.created_at);
      return type === "LATEST" ? aSec - bSec : bSec - aSec;
    });
    return {
      bookList: list,
    };
  }
  //   DESCENDING
  else if (type === "PUBLICATION_YEAR" || type === "PUBLICATION_YEAR_REVERSE") {
    const list = state.bookList?.sort((b, a) => {
      return type === "PUBLICATION_YEAR"
        ? +b.publication_year - +a.publication_year
        : +a.publication_year - +b.publication_year;
    });
    return {
      bookList: list,
    };
  }
};
