import { Form, Formik, FormikValues } from "formik";
import CustomInput from "../utils/CustomInput";
import { FormInput } from "@/types";
import PrimaryButton from "../utils/PrimaryButton";
import * as Yup from "yup";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*?_])(?=.*[a-z])(?=.*[A-Z]).{7,}$/,
      "Atleast 1 uppercase, smallcase  letter, digit, special character is required"
    )
    .min(7, "Atleast 7 characters are required")
    .max(20, "Atmost 20 chars are allowed"),
});

const LoginForm = () => {
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: FormikValues) => {
    const { email, password } = values;
    if (email && password) {
      // generate random uuid
      const uuid = crypto.randomUUID();
      // storing uuid in local storage
      localStorage.setItem("authorization", uuid);
      // navigate to dashboard
      router.replace("/dashboard");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, values }: FormInput) => (
        <Form className="lg:w-[400px] w-[90%]  p-4 rounded-[10px] shadow-3xl bg-white bg-opacity-80">
          <h2 className="text-center text-lg mb-5 font-semibold">
            Sign Up / Sign In
          </h2>
          <CustomInput
            {...{
              errors,
              touched,
              name: "email",
              label: "Email",
              containerStyles: "mb-4",
            }}
          />
          <div className="relative">
            <CustomInput
              {...{
                errors,
                touched,
                name: "password",
                label: "Password",
                type: "password",
                containerStyles: "mb-[30px]",
                values,
              }}
            />
          </div>
          <PrimaryButton styles="block mx-auto" type="submit">
            Submit
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
