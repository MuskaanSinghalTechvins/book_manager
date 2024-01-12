import { FormInput } from "@/types";
import { Field } from "formik";

interface Props extends FormInput {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
  containerStyles?: string;
}

const CustomInput = ({
  containerStyles = "",
  label,
  errors,
  touched,
  name,
  ...props
}: Props) => {
  return (
    <div className={containerStyles}>
      <label className="text-sm mb-2 block font-semibold">{label}</label>
      <Field
        {...props}
        name={name}
        className="w-full rounded-[10px] border shadow-3xl py-2 px-4"
      />
      {errors[name] && touched[name] && (
        <p className="text-xs text-red-500 mt-2">{errors[name] as string}</p>
      )}
    </div>
  );
};

export default CustomInput;
