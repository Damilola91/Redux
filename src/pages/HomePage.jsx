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
  const isLoading = useSelector(isBookLoading);
  const count = useSelector(countBook);
  const totalPages = useSelector(totalBooksPage);
  const currentBookPage = useSelector(currentPage);
  const error = useSelector(errorBook);

  const onPageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(getAllBooks({ page: newPage, pageSize: 2 }));
  };

  useEffect(() => {
    dispatch(getAllBooks({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {books &&
        books.map((book) => (
          <div
            key={book.asin}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h2>{book.title}</h2>
            <img
              src={book.img}
              alt={book.title}
              style={{ maxWidth: "100px" }}
            />
            <p>
              <strong>Categoria:</strong> {book.category}
            </p>
            <p>
              <strong>Prezzo:</strong> €
              {Number(book.price?.$numberDecimal || book.price || 0).toFixed(2)}
            </p>
          </div>
        ))}
      <ResponsivePagination
        current={currentBookPage}
        total={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default HomePage;
