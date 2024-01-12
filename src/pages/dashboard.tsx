import BookCard from "@/components/dashboard/BookCard";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { List } from "@/data/bookList";

const Dashboard = () => {
  return (
    <DashboardWrapper containerStyles="grid grid-cols-3 gap-5">
      {List.map((book) => (
        <BookCard book={book} />
      ))}
    </DashboardWrapper>
  );
};

export default Dashboard;
