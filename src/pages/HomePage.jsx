import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allBooks,
  countBook,
  errorBook,
  getAllBooks,
  isBookLoading,
  totalBooksPage,
  setCurrentPage,
  currentPage,
} from "../reducers/booksSlice";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const books = useSelector(allBooks);
  console.log(books);
  const isLoading = useSelector(isBookLoading);
  console.log(isBookLoading);
  const count = useSelector(countBook);
  const totalPages = useSelector(totalBooksPage);
  const error = useSelector(errorBook);

  const onPageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  useEffect(() => {
    dispatch(getAllBooks({ page: 1, pageSize: 2 }));
  }, [dispatch]);

  return (
    <div>
      {books && books.map((book) => <p>{book.title}</p>)}
      ciaooooo
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default HomePage;
