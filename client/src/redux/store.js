import { configureStore } from '@reduxjs/toolkit';
import { organisationReducer } from './reducers/organisationReducer';
import { paymentReducer } from './reducers/paymentReducer';
import { memberReducer } from './reducers/memberReducer';
import { bookReducer } from './reducers/bookReducer';
export const server = 'http://localhost:4000/api/v1';

const store = configureStore({
  reducer: {
    organisation: organisationReducer,
    payment: paymentReducer,
    member: memberReducer,
    book: bookReducer,
  },
});

export default store;
