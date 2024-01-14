import { GlobalState, action } from "@/types";
import { checkIfObjectCanBeFiltered, updateBookList } from "@/utility";

// Code for handling states related to books

// Helper function for books related CRUD
export const CRUDReducer = (type: action, payload: any, state: GlobalState) => {
  // For book creation
  if (type === "ADD_NEW_BOOK") {
    const newBook = {
      // generate id for newly created book
      id: crypto.randomUUID(),
      // creation date
      created_at: new Date().toISOString(),
      ...payload?.book,
    };
    return {
      ...state,
      // check if new object satisfies the filter applied then append into the list
      filteredList: checkIfObjectCanBeFiltered(payload.book, payload.filters)
        ? [newBook, ...state.filteredList]
        : state.filteredList,
      // adding new book to global list
      bookList: [newBook, ...state.bookList],
    };
  } else if (type === "EDIT_BOOK") {
    const bookId = payload.book.id;
    // update book based on id
    const updatedBookList = updateBookList(
      state.bookList,
      bookId,
      payload.book
    );
    const updatedFilteredList = updateBookList(
      state.filteredList,
      bookId,
      payload.book,
      payload.filters
    );

    return {
      ...state,
      filteredList: updatedFilteredList,
      bookList: updatedBookList,
    };
  } else if (type === "DELETE_BOOK") {
    const bookId = payload.bookId;
    const list = state.bookList?.filter((item) => item.id !== bookId);
    const filteredList = state.filteredList?.filter(
      (item) => item.id !== bookId
    );
    return {
      ...state,
      filteredList,
      bookList: list,
    };
  }
};

const getTimestamp = (iso?: string) => {
  return iso ? new Date(iso)?.getTime() : 0;
};

// Helper function for handling ordering of books
export const OrderingReducer = (type: action, state: GlobalState) => {
  // Filtering based on creation date
  if (type === "LATEST" || type === "OLDEST") {
    const list = state.bookList?.sort((b, a) => {
      const bSec = getTimestamp(b.created_at);
      const aSec = getTimestamp(a.created_at);
      return type === "LATEST" ? aSec - bSec : bSec - aSec;
    });
    return {
      ...state,
      bookList: list,
    };
  }
  //   DESCENDING
  // Filtering based on publication year
  else if (type === "PUBLICATION_YEAR" || type === "PUBLICATION_YEAR_REVERSE") {
    const list = state.bookList?.sort((b, a) => {
      return type === "PUBLICATION_YEAR"
        ? +b.publication_year - +a.publication_year
        : +a.publication_year - +b.publication_year;
    });
    return {
      ...state,
      bookList: list,
    };
  }
};

// Helper function for handling filtering of books
export const FilteringReducer = (
  type: action,
  payload: any,
  state: GlobalState
) => {
  if (type === "FILTER") {
    const { title, author, genre, year } = payload;
    const titleRegex = new RegExp(title, "i");
    const authorRegex = new RegExp(author, "i");
    const genreRegex = new RegExp(genre, "i");
    const { bookList } = state;
    const list = bookList?.filter((item) => {
      return (
        (title ? item.title?.search(titleRegex) >= 0 : true) &&
        (author ? item.author?.search(authorRegex) >= 0 : true) &&
        (genre ? item.genre?.search(genreRegex) >= 0 : true) &&
        (year ? +item.publication_year === +year : true)
      );
    });

    return {
      ...state,
      filteredList: list,
    };
  } else if (type === "CLEAR_FILTERS") {
    return {
      ...state,
      filteredList: [],
    };
  }
};
