import { FormikErrors, FormikTouched } from "formik";

export interface FormInput {
  errors: FormikErrors<{ [field: string]: any }>;
  touched: FormikTouched<{ [field: string]: any }>;
}
