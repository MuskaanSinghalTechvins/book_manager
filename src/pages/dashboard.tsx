import BookCard from "@/components/dashboard/BookCard";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import PrimaryButton from "@/components/utils/PrimaryButton";
import { UIContext } from "@/context";
import { List } from "@/data/bookList";
import { useContext } from "react";

const Dashboard = () => {
  const { dispatch } = useContext(UIContext);

  const openForm = () => {
    dispatch({ type: "OPEN_MODAL", payload: "ADD_BOOK" });
  };

  return (
    <DashboardWrapper>
      <PrimaryButton onClick={openForm} styles="w-[150px]">
        Add New Book +
      </PrimaryButton>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {List.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
