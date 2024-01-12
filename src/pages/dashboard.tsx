import BookCard from "@/components/dashboard/BookCard";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import PrimaryButton from "@/components/utils/PrimaryButton";
import { Context, UIContext } from "@/context";
import { Book } from "@/types";
import { useContext } from "react";

const Dashboard = () => {
  const { dispatch } = useContext(UIContext);
  const { bookList } = useContext(Context);

  const openForm = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { screen: "ADD_BOOK", assets: {} },
    });
  };

  return (
    <DashboardWrapper>
      <PrimaryButton onClick={openForm} styles="w-[150px]">
        Add New Book +
      </PrimaryButton>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {bookList.map((book: Book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
