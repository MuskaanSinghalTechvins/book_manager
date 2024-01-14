import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { Context } from "@/context";
import { Book, choice } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";

const Tab = ({ label, value }: choice) => {
  return (
    <div className="text-lg font-semibold mb-4">
      <p className="text-silver mb-1">{label}</p>
      <p>{value}</p>
    </div>
  );
};

const BookDetail = () => {
  const { bookId } = useRouter().query;
  const { bookList } = useContext(Context);
  const router = useRouter();
  const bookDetail = useMemo(() => {
    if (bookId) {
      const book = bookList?.find((item: Book) => item.id === bookId);
      if (book) return book;
      else router.push("/404");
    }
  }, [bookId]);

  return (
    <DashboardWrapper
      title={bookDetail?.title}
      containerStyles="relative min-h-[calc(100vh-125px)]"
    >
      <Tab label="Author Name" value={bookDetail?.author} />
      <Tab label="Publication Year" value={bookDetail?.publication_year} />
      <Tab label="Genre" value={bookDetail?.genre} />
      <Tab label="Description" value={bookDetail?.description || "-"} />
      {/* for UI */}
      <Image
        src={"/books.jpg"}
        alt="image of books"
        height={400}
        width={400}
        className="absolute inset-0 opacity-10 h-full w-full object-cover object-top"
      />
    </DashboardWrapper>
  );
};

export default BookDetail;
