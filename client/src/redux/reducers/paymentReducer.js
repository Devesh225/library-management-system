import { createReducer } from '@reduxjs/toolkit';

export const paymentReducer = createReducer(
  {},
  {
    createSubscriptionRequest: state => {
      state.loading = true;
    },
    createSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.subscriptionID = action.payload.subscriptionID;
      state.message = action.payload.message;
    },
    createSubscriptionFailure: (state, action) => {
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
