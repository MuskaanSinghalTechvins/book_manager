import { Book } from "./types";

export const formatDate = (isoStr?: string) => {
  if (!isoStr) return;
  const dateObj = new Date(isoStr);
  const date = new Intl.DateTimeFormat("en-in", { dateStyle: "short" }).format(
    dateObj
  );
  return date;
};

export const removeEmptyFieldsFromObject = (input: any) => {
  const output: any = {};
  for (let key in input) {
    const value = input[key];
    if (value) {
      output[key] = value;
    }
  }
  return output;
};

export const checkIfObjectCanBeFiltered = (inp: any, filterObj: any) => {
  const { title, author, genre, year } = filterObj;
  const titleRegex = new RegExp(title, "i");
  const authorRegex = new RegExp(author, "i");
  const genreRegex = new RegExp(genre, "i");

  return (
    (title ? inp.title?.search(titleRegex) >= 0 : true) &&
    (author ? inp.author?.search(authorRegex) >= 0 : true) &&
    (genre ? inp.genre?.search(genreRegex) >= 0 : true) &&
    (year ? +inp.publication_year === +year : true)
  );
};

export const updateBookList = (
  list: Book[],
  bookId: string,
  updatedData: Book,
  filters?: any
) => {
  const selectedBookIdx = list?.findIndex((book) => book.id === bookId);

  if (selectedBookIdx >= 0) {
    const updatedObject = { ...list[selectedBookIdx], ...updatedData };
    if (filters) {
      if (checkIfObjectCanBeFiltered(updatedObject, filters)) {
        list[selectedBookIdx] = updatedObject;
      } else {
        return list?.filter((item) => item.id !== bookId);
      }
    } else {
      list[selectedBookIdx] = updatedObject;
    }
  }
  return list;
};
