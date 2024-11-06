import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  books: [],
  error: "",
  count: 0,
  totalPages: 0,
  currentPage: 1,
};

export const getAllBooks = createAsyncThunk(
  "books/GETbooks",
  async ({ page = 1, pageSize = 10 }) => {
    try {
      const response = await fetch(
        `http://localhost:3061/books?page=${page}&pageSize=${pageSize}`
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

const allBookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        state.count = action.payload.count;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllBooks.rejected, (state) => {
        state.isLoading = false;
        state.error = "Impossibile recuperare i libri";
      });
  },
});

export const allBooks = (state) => state.bookSlice.books;
export const totalBooksPage = (state) => state.bookSlice.totalPages;
export const countBook = (state) => state.bookSlice.count;
export const isBookLoading = (state) => state.bookSlice.isLoading;
export const errorBook = (state) => state.bookSlice.error;
export const { setCurrentPage } = allBookSlice.actions;
export default allBookSlice.reducer;
