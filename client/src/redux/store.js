import { configureStore } from '@reduxjs/toolkit';
import { organisationReducer } from './reducers/organisationReducer';
import { paymentReducer } from './reducers/paymentReducer';

export const server = 'http://localhost:4000/api/v1';

const store = configureStore({
  reducer: {
    organisation: organisationReducer,
    payment: paymentReducer,
  },
});

export default store;
