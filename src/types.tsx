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
  id?: number;
}
