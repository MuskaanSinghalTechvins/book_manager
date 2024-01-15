import { FormInput } from "@/types";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field } from "formik";
import { useState } from "react";

interface Props extends FormInput {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
  containerStyles?: string;
  inputStyles?: string;
}

const CustomInput = ({
  containerStyles = "",
  label,
  errors,
  values = {},
  touched,
  name,
  inputStyles = "",
  type,
  ...props
}: Props) => {
  const [typeVal, setTypeVal] = useState(type);
  return (
    <div className={containerStyles}>
      <label className="text-sm mb-2 block font-semibold">{label}</label>
      <div className="relative">
        <Field
          {...props}
          type={typeVal}
          name={name}
          className={`w-full rounded-[10px] border shadow-3xl py-2 px-4 ${inputStyles}`}
        />

        {type && type === "password" && (
          <button
            className="text-sm text-primary absolute bottom-[15px] right-4 disabled:opacity-30"
            disabled={!values[name]}
            type="button"
            onClick={(e) => {
              setTypeVal((prev) => (prev === "password" ? "text" : "password"));
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon
              icon={typeVal === "password" ? faEye : faEyeSlash}
            />
          </button>
        )}
      </div>
      {errors[name] && touched[name] && (
        <p className="text-xs text-red-500 mt-2">{errors[name] as string}</p>
      )}
    </div>
  );
};

export default CustomInput;
