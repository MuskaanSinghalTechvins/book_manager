import { Book, FormInput } from "@/types";
import { Form, Formik } from "formik";
import CustomInput from "../utils/CustomInput";
import PrimaryButton from "../utils/PrimaryButton";
import { useContext, useEffect, useRef, useState } from "react";
import { Context, UIContext } from "@/context";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { removeEmptyFieldsFromObject } from "@/utility";

const schema = Yup.object({
  title: Yup.string().required("This field is required"),
  author: Yup.string()
    .required("This field is required")
    .matches(/^[a-zA-Z ]+$/),
  publication_year: Yup.string()
    .required("This field is required")
    .matches(/^[1,2]{1}[0-9]{3}$/, "Please enter a valid year"),
  genre: Yup.string()
    .required("This field is required")
    .matches(/^[a-zA-Z ]+$/),
});

const CreateBook = () => {
  const { bookDispatcher } = useContext(Context);
  const ref = useRef<any>(null);
  const {
    dispatch,
    uiState: { assets = {} },
  } = useContext(UIContext);
  const [initialValues, setInitialValues] = useState<Book>({
    title: "",
    author: "",
    publication_year: "",
    genre: "",
    description: "",
  });

  const { title, author, genre, year } = useRouter().query;
  const handleSubmit = (values: Book) => {
    if (+values?.publication_year > 2024) {
      ref.current?.setFieldError(
        "publication_year",
        "Please enter a valid year"
      );
      return;
    }
    const filterObj = { title, author, genre, year };
    const query = removeEmptyFieldsFromObject(filterObj);

    if (assets?.isEditable && values?.id) {
      bookDispatcher({
        type: "EDIT_BOOK",
        payload: { book: values, filters: query },
      });
    } else {
      bookDispatcher({
        type: "ADD_NEW_BOOK",
        payload: { book: values, filters: query },
      });
    }
    dispatch({ type: "CLOSE_MODAL" });
  };

  useEffect(() => {
    if (assets?.book && assets?.isEditable) {
      setInitialValues(assets?.book);
    }
  }, [JSON.stringify(assets)]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validationSchema={schema}
      innerRef={ref}
    >
      {({ errors, touched }: FormInput) => (
        <Form className="w-[700px] p-4 rounded-[10px] shadow-3xl bg-white max-h-[calc(100vh-100px)] overflow-y-auto">
          <h2 className="text-center text-lg mb-5 font-semibold">
            Add New Book
          </h2>
          <CustomInput
            {...{
              errors,
              touched,
              name: "title",
              label: "Title",
              containerStyles: "mb-4",
              placeholder: "Eg: Harry Potter...",
            }}
          />
          <CustomInput
            {...{
              errors,
              touched,
              name: "author",
              label: "Author",
              containerStyles: "mb-4",
              placeholder: "Eg: JK Rowling...",
            }}
          />
          <CustomInput
            {...{
              errors,
              touched,
              name: "publication_year",
              label: "Publication Year",
              containerStyles: "mb-4",
              placeholder: "Eg: 2024...",
              minLength: 4,
              maxLength: 4,
            }}
          />
          <CustomInput
            {...{
              errors,
              touched,
              name: "genre",
              label: "Genre",
              containerStyles: "mb-4",
              placeholder: "Eg: Fiction...",
            }}
          />

          <CustomInput
            {...{
              errors,
              touched,
              name: "description",
              label: "Description",
              containerStyles: "mb-4",
              placeholder: "Eg: Once upon a time...",
              inputStyles: "min-h-[80px] max-h-[300px]",
              as: "textarea",
            }}
          />

          <PrimaryButton styles="block mx-auto" type="submit">
            Submit
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBook;
