import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

interface Props {
  next?: number;
  prev?: boolean;
}
const Pagination = ({ next, prev }: Props) => {
  const router = useRouter();
  const handlePrev = () => {
    router.back();
  };

  const handleNext = () => {
    const { start, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: { ...rest, start: next } });
  };
  return (
    <div className="flex justify-between items-center mt-8">
      {prev ? (
        <button onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp; Prev
        </button>
      ) : (
        <div></div>
      )}
      {next ? (
        <button onClick={handleNext}>
          Next &nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
