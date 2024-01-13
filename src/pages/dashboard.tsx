import BookCard from "@/components/dashboard/BookCard";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import PrimaryButton from "@/components/utils/PrimaryButton";
import CustomSelect from "@/components/utils/CustomSelect";
import { Context, UIContext } from "@/context";
import { Book } from "@/types";
import { useContext } from "react";
import { Sort_Options } from "@/data/constants";

const Dashboard = () => {
  const { dispatch } = useContext(UIContext);
  const { bookList } = useContext(Context);

  const openForm = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { screen: "ADD_BOOK", assets: {} },
    });
  };

  console.log(bookList);

  return (
    <DashboardWrapper>
      <div className="flex justify-between items-center">
        <PrimaryButton onClick={openForm} styles="w-[150px]">
          Add New Book +
        </PrimaryButton>
        <div className="flex justify-start items-center gap-x-4">
          <CustomSelect options={[]} label="Filter" placeholder="Select" />
          <CustomSelect
            options={Sort_Options}
            label="Sort"
            placeholder="Select"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-8">
        {bookList.map((book: Book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
