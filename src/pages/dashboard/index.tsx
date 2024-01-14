import BookCard from "@/components/dashboard/BookCard";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import PrimaryButton from "@/components/utils/PrimaryButton";
import CustomSelect from "@/components/utils/CustomSelect";
import { Context, UIContext } from "@/context";
import { Book } from "@/types";
import { useContext, useEffect, useMemo } from "react";
import { Sort_Options } from "@/data/constants";
import FilterBtn from "@/components/utils/FilterBtn";
import { useRouter } from "next/router";
import Pagination from "@/components/utils/Pagination";

const PER_PAGE = 6;

const Dashboard = () => {
  const { dispatch } = useContext(UIContext);
  const { bookList, bookDispatcher, filteredList } = useContext(Context);
  const { sort, title, author, genre, year, start = 1 } = useRouter().query;

  const openForm = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { screen: "ADD_BOOK", assets: {} },
    });
  };

  useEffect(() => {
    if (sort) {
      bookDispatcher({ type: sort });
    }
    if (title || author || genre || year) {
      bookDispatcher({
        type: "FILTER",
        payload: {
          title,
          author,
          genre,
          year,
        },
      });
    } else {
      bookDispatcher({ type: "CLEAR_FILTERS", payload: {} });
    }
  }, [sort, title, author, genre, year]);
  const getList = () => {
    let list;
    if (title || author || genre || year) {
      list = filteredList;
    } else {
      list = bookList;
    }
    return list;
  };

  const finalList = useMemo(() => {
    return getList().slice(+start - 1, +start - 1 + PER_PAGE);
  }, [
    title,
    author,
    genre,
    year,
    start,
    JSON.stringify(bookList),
    JSON.stringify(filteredList),
  ]);

  const nextPage = useMemo(() => {
    const total = +start + finalList.length;
    if (total <= getList().length) {
      return total;
    }
  }, [JSON.stringify(finalList), start]);
  return (
    <DashboardWrapper title="My Books">
      <div className="lg:flex justify-between items-center">
        <PrimaryButton onClick={openForm} styles="w-[150px] mb-4 lg:mb-0">
          Add New Book +
        </PrimaryButton>
        <div className="lg:flex justify-start items-center lg:gap-x-4 space-y-4 lg:space-y-0">
          <FilterBtn />
          <CustomSelect
            options={Sort_Options}
            label="Sort"
            placeholder="Select"
          />
        </div>
      </div>

      <p className="text-lg font-semibold my-5">
        Total books: {getList()?.length}
      </p>

      {finalList?.length > 0 && (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-8">
          {finalList.map((book: Book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      )}
      {finalList?.length === 0 && (
        <p className="text-lg font-semibold my-5 text-center h-[200px] flex justify-center items-center">
          No books added yet
        </p>
      )}

      <Pagination next={nextPage} prev={start !== 1} />
    </DashboardWrapper>
  );
};

export default Dashboard;
