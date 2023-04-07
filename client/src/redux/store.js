import { configureStore } from '@reduxjs/toolkit';
import { organisationReducer } from './reducers/organisationReducer';

export const server = 'https://libraly-app.vercel.app/api/v1';

const store = configureStore({
  reducer: {
    organisation: organisationReducer,
  },
});

export default store;
