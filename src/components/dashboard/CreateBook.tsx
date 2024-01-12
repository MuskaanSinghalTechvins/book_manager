import { FormInput } from "@/types";
import { Form, Formik } from "formik";
import CustomInput from "../utils/CustomInput";
import PrimaryButton from "../utils/PrimaryButton";

const CreateBook = () => {
  const initialValues = {};
  const handleSubmit = () => {};
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //   validationSchema={validationSchema}
    >
      {({ errors, touched }: FormInput) => (
        <Form className="w-[400px] p-4 rounded-[10px] shadow-3xl bg-white">
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

          <PrimaryButton styles="block mx-auto" type="submit">
            Submit
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBook;
