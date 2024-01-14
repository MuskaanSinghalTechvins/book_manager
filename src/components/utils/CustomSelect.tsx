import { choice } from "@/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  options: choice[];
  label: string;
  placeholder: string;
}

const CustomSelect = ({ label, options, placeholder }: Props) => {
  const router = useRouter();
  const { sort } = router.query;
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected((sort as string) || "");
  }, [sort]);
  const handleSelect = (e: React.SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSelected(value);
    if (value) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, sort: value },
      });
    }
  };

  const closeHandler = () => {
    const { sort, ...rest } = router.query;
    router.push({
      pathname: router.pathname,
      query: rest,
    });
  };
  return (
    <div className="flex justify-start items-center gap-x-3">
      <p className="text-primary font-semibold text-md">{label} :</p>
      <select
        className="p-1 bg-white bg-opacity-70 rounded-[5px] text-sm"
        onChange={handleSelect}
        value={selected}
      >
        <option value={""} hidden>
          {placeholder}
        </option>
        {options?.map(({ label, value }, idx) => (
          <option key={`option-${idx}`} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        className="text-sm ml-2"
        onClick={closeHandler}
        title="clear sorting"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default CustomSelect;
