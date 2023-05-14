import { createReducer } from '@reduxjs/toolkit';

export const memberReducer = createReducer(
  {},
  {
    memberLoginRequest: state => {
      state.loading = true;
    },
    memberLoginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.member = action.payload.member;
      state.message = action.payload.message;
    },
    memberLoginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    memberLoadUserRequest: state => {
      state.loading = true;
    },
    memberLoadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.member = action.payload;
    },
    memberLoadUserFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    memberLogoutRequest: state => {
      state.loading = true;
    },
    memberLogoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.member = null;
      state.message = action.payload;
    },
    memberLogoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    updateMemberDetailsRequest: state => {
      state.loading = true;
    },
    updateMemberDetailsSuccess: (state, action) => {
      state.loading = false;
      state.member = action.payload.member;
      state.message = action.payload.message;
    },
    updateMemberDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateMemberPasswordRequest: state => {
      state.loading = true;
    },
    updateMemberPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateMemberPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    memberForgotPasswordRequest: state => {
      state.loading = true;
    },
    memberForgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    memberForgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    memberResetPasswordRequest: state => {
      state.loading = true;
    },
    memberResetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    memberResetPasswordFailure: (state, action) => {
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
