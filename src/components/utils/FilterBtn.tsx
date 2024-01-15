import { Form, Formik } from "formik";
import CustomInput from "./CustomInput";
import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { removeEmptyFieldsFromObject } from "@/utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const schema = Yup.object({
  author: Yup.string().matches(/^[a-zA-Z ]+$/),
  year: Yup.string().matches(/^[1,2]{1}[0-9]{3}$/, "Please enter a valid year"),
  genre: Yup.string().matches(/^[a-zA-Z ]+$/),
});

interface State {
  title?: string;
  author?: string;
  genre?: string;
}
const FilterBtn = () => {
  const router = useRouter();
  const { title, author, genre, year } = router.query;
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  useEffect(() => {
    const obj = { title, author, genre, year };
    const initVals = removeEmptyFieldsFromObject(obj);
    setInitialValues(initVals);
  }, [title, author, genre, year]);

  const onSubmit = (values: State) => {
    const query = removeEmptyFieldsFromObject(values);
    const { start, ...rest } = router.query;
    router.push({
      pathname: router.pathname,
      query: { ...rest, ...query },
    });
    setOpen(false);
  };

  const clearFilters = () => {
    const { title, author, genre, year, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest });
  };

  return (
    <div className="relative">
      <div>
        <button
          className="text-primary font-semibold bg-white px-2 py-1 text-md rounded-[4px]"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          Filter
        </button>
        {(title || author || genre || year) && (
          <button
            className="text-sm ml-2"
            title="clear filters"
            onClick={clearFilters}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>

      {open && (
        <div
          className={`bg-white w-[300px] absolute top-[110%] right-3 z-10 p-4 rounded-[4px]`}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form>
                <CustomInput
                  {...{
                    errors,
                    touched,
                    name: "title",
                    label: "Title Contains",
                    containerStyles: "mb-4",
                    placeholder: "Eg: Harry Potter...",
                  }}
                />
                <CustomInput
                  {...{
                    errors,
                    touched,
                    name: "author",
                    label: "Author Name contains",
                    containerStyles: "mb-4",
                    placeholder: "Eg: JK Rowling...",
                  }}
                />
                <CustomInput
                  {...{
                    errors,
                    touched,
                    name: "genre",
                    label: "Genre contains",
                    containerStyles: "mb-4",
                    placeholder: "Eg: Fantasy...",
                  }}
                />
                <CustomInput
                  {...{
                    errors,
                    touched,
                    name: "year",
                    label: "Publication Year",
                    containerStyles: "mb-4",
                    placeholder: "Eg: 2012...",
                    minLength: 4,
                    maxLength: 4,
                  }}
                />
                <PrimaryButton type="submit" styles="block mx-auto">
                  Apply
                </PrimaryButton>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default FilterBtn;
