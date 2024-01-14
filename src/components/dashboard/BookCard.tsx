import { Context, UIContext } from "@/context";
import { Book } from "@/types";
import { formatDate } from "@/utility";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

interface Props {
  book: Book;
}
const BookCard = ({ book }: Props) => {
  const { title, publication_year, genre, author, id, created_at } = book;
  const { dispatch } = useContext(UIContext);
  const { bookDispatcher } = useContext(Context);

  const editBook = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { screen: "ADD_BOOK", assets: { book, isEditable: true } },
    });
  };

  const deleteBook = () => {
    bookDispatcher({ type: "DELETE_BOOK", payload: { bookId: id } });
  };
  return (
    <div className="relative">
      <button className="block  text-left p-4 rounded-r-[10px] border shadow-3xl bg-silver bg-opacity-30 hover:bg-white transition-all duration-300 hover:-translate-y-[10px] w-full">
        <span className="italic bg-primary text-white px-[6px] py-[2px] rounded text-xs font-semibold">
          {genre}
        </span>
        <p className="my-2 text-lg font-bold">{title}</p>
        <p className="text-md text-primary text-opacity-85 font-semibold mb-1">
          {author}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-silver font-semibold">
            <span className="text-primary font-medium">Published in:</span>
            &nbsp;
            {publication_year}
          </p>
          <p className="text-sm text-silver font-semibold">
            <span className="text-primary font-medium">Created On:</span>&nbsp;
            {formatDate(created_at)}
          </p>
        </div>
      </button>
      <div className="absolute top-3 right-3 space-x-3">
        <button onClick={editBook}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button onClick={deleteBook}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
