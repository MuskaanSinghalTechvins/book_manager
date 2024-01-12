import { Book } from "@/types";

interface Props {
  book: Book;
}
const BookCard = ({ book }: Props) => {
  const { title, publication_year, genre, author } = book;
  return (
    <button className="block  text-left p-4 rounded-r-[10px] border shadow-3xl bg-silver bg-opacity-30 hover:bg-white transition-all duration-300 hover:-translate-y-[10px]">
      <span className="italic bg-primary text-white px-[6px] py-[2px] rounded text-xs font-semibold">
        {genre}
      </span>
      <p className="my-2 text-lg font-bold">{title}</p>
      <p className="text-md text-primary text-opacity-85 font-semibold mb-1">
        {author}
      </p>
      <p className="text-sm text-silver font-semibold">
        <span className="text-primary font-medium">Published in:</span>&nbsp;
        {publication_year}
      </p>
    </button>
  );
};

export default BookCard;
