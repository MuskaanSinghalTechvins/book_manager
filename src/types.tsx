import { FormikErrors, FormikTouched } from "formik";

export interface FormInput {
  errors: FormikErrors<{ [field: string]: any }>;
  touched: FormikTouched<{ [field: string]: any }>;
}

export interface Book {
  title: string;
  author: string;
  publication_year: string;
  genre: string;
  id?: string;
  created_at?: string;
  description: string;
}

export interface choice {
  label: string;
  value: string;
}

export type action =
  | "ADD_NEW_BOOK"
  | "EDIT_BOOK"
  | "DELETE_BOOK"
  | "LATEST"
  | "OLDEST"
  | "PUBLICATION_YEAR"
  | "PUBLICATION_YEAR_REVERSE"
  | "FILTER"
  | "CLEAR_FILTERS";

export interface GlobalState {
  bookList: Book[];
  filteredList: Book[];
}
