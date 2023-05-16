import { createReducer } from '@reduxjs/toolkit';

export const organisationReducer = createReducer(
  {},
  {
    loginRequest: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.organisation = action.payload.organisation;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    registerRequest: state => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.organisation = action.payload.organisation;
      state.message = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loadUserRequest: state => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.organisation = action.payload;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.organisation = null;
      state.message = action.payload;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    updateDetailsRequest: state => {
      state.loading = true;
    },
    updateDetailsSuccess: (state, action) => {
      state.loading = false;
      state.organisation = action.payload.organisation;
      state.message = action.payload.message;
    },
    updateDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest: state => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest: state => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest: state => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMemberRequest: state => {
      state.loading = true;
    },
    addMemberSuccess: (state, action) => {
      state.loading = false;
      state.member = action.payload.member;
      state.message = action.payload.message;
    },
    addMemberFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeMemberRequest: state => {
      state.loading = true;
    },
    removeMemberSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    removeMemberFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBookAdminRequest: state => {
      state.loading = true;
    },
    addBookAdminSuccess: (state, action) => {
      state.loading = false;
      state.book = action.payload.book;
      state.message = action.payload.message;
    },
    addBookAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookAdminRequest: state => {
      state.loading = true;
    },
    updateBookAdminSuccess: (state, action) => {
      state.loading = false;
      state.book = action.payload.book;
      state.message = action.payload.message;
    },
    updateBookAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getBookAdminRequest: state => {
      state.loading = true;
    },
    getBookAdminSuccess: (state, action) => {
      state.loading = false;
      state.book = action.payload.book;
    },
    getBookAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookAdminRequest: state => {
      state.loading = true;
    },
    deleteBookAdminSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteBookAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allMembersRequest: state => {
      state.loading = true;
    },
    allMembersSuccess: (state, action) => {
      state.loading = false;
      state.members = action.payload.members;
    },
    allMembersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allOrganisationsRequest: state => {
      state.loading = true;
    },
    allOrganisationsSuccess: (state, action) => {
      state.loading = false;
      state.organisations = action.payload.organisations;
    },
    allOrganisationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDetailsSuperAdminRequest: state => {
      state.loading = true;
    },
    updateDetailsSuperAdminSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateDetailsSuperAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSuperAdminRequest: state => {
      state.loading = true;
    },
    deleteSuperAdminSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteSuperAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orgDetailsRequest: state => {
      state.loading = true;
    },
    orgDetailsSuccess: (state, action) => {
      state.loading = false;
      state.updateorg = action.payload.updateorg;
    },
    orgDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrganisationRequest: state => {
      state.loading = true;
    },
    createOrganisationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createOrganisationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allBooksRequest: state => {
      state.loading = true;
    },
    allBooksSuccess: (state, action) => {
      state.loading = false;
      state.totalBooks = action.payload.totalBooks;
      state.outOfStockBooks = action.payload.outOfStockBooks;
    },
    allBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allMembersSuperAdminRequest: state => {
      state.loading = true;
    },
    allMembersSuperAdminSuccess: (state, action) => {
      state.loading = false;
      state.totalMembers = action.payload.totalMembers;
    },
    allMembersSuperAdminFailure: (state, action) => {
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
