import { createReducer } from '@reduxjs/toolkit';

export const bookReducer = createReducer(
  {},
  {
    showAllBooksRequest: state => {
      state.loading = true;
    },
    showAllBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload.books;
    },
    showAllBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewAllIssuedBooksRequest: state => {
      state.loading = true;
    },
    viewAllIssuedBooksSuccess: (state, action) => {
      state.loading = false;
      state.issuedBooks = action.payload.issuedBooks;
      state.books = action.payload.books;
    },
    viewAllIssuedBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewAllReturnedBooksRequest: state => {
      state.loading = true;
    },
    viewAllReturnedBooksSuccess: (state, action) => {
      state.loading = false;
      state.returnedBooks = action.payload.returnedBooks;
      state.books = action.payload.books;
    },
    viewAllReturnedBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    issueBookRequest: state => {
      state.loading = true;
    },
    issueBookSuccess: (state, action) => {
      state.loading = false;
      state.borrowedBook = action.payload.borrowedBook;
      state.message = action.payload.message;
    },
    issueBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    returnBookRequest: state => {
      state.loading = true;
    },
    returnBookSuccess: (state, action) => {
      state.loading = false;
      state.lateFine = action.payload.lateFine;
      state.borrowedBook = action.payload.borrowedBook;
      state.message = action.payload.message;
    },
    returnBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewAllRecommendedBooksRequest: state => {
      state.loading = true;
    },
    viewAllRecommendedBooksSuccess: (state, action) => {
      state.loading = false;
      state.recommendedBooks = action.payload.recommendedBooks;
    },
    viewAllRecommendedBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
