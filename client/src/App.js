import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Pricing from './components/Pricing';
import RegisterOrg from './components/RegisterOrg';
import LoginOrg from './components/LoginOrg';
import LoginUser from './components/LoginUser';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { organisationLoadUser } from './redux/actions/organisationAction';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import MemberSideBar from './components/MemberSideBar.js';
import { ProtectedRoute } from 'protected-route-react';
import ResponsiveSideBar from './components/ResponsiveSideBar';
import PaymentFailed from './components/PaymentFailed';
import PaymentSuccess from './components/PaymentSuccess';
import UpdateOrgDetails from './components/UpdateOrgDetails';
import UpdateOrgPassword from './components/UpdateOrgPassword';
import ForgotPasswordOrg from './components/ForgotPasswordOrg';
import ResetPasswordOrg from './components/ResetPasswordOrg';
import AddMemberOrganisation from './components/AddMemberOrganisation';
import RemoveMemberOrganisation from './components/RemoveMemberOrganisation';
import AllMembersOrganisation from './components/AllMembersOrganisation';
import { memberLoadUser } from './redux/actions/memberAction';
import UpdateMemberPassword from './components/UpdateMemberPassword';
import UpdateMemberDetails from './components/UpdateMemberDetails';
import ForgotPasswordMember from './components/ForgotPasswordMember';
import ResetPasswordMember from './components/ResetPasswordMember';
import ShowAllBooks from './components/ShowAllBooks';
import ViewAllIssuedReturnedBooks from './components/ViewAllIssuedReturnedBooks';
import ViewAllRecommendedBooks from './components/ViewAllRecommendedBooks';
import AddBookAdmin from './components/AddBookAdmin';
import UpdateBookAdmin from './components/UpdateBookAdmin';
import DeleteBookAdmin from './components/DeleteBookAdmin';
import ShowAllOrganisations from './components/ShowAllOrganisations.js';
import UpdateOrganisationSuperAdmin from './components/UpdateOrganisationSuperAdmin';

function App() {
  const {
    isAuthenticated: organisationIsAuthenticated,
    error: organisationError,
    message: organisationMessage,
    loading: organisationLoading,
    organisation,
  } = useSelector(state => state.organisation);

  const {
    isAuthenticated: memberIsAuthenticated,
    error: memberError,
    message: memberMessage,
    loading: memberLoading,
    member,
  } = useSelector(state => state.member);

  const { error: paymentError, message: paymentMessage } = useSelector(
    state => state.payment
  );

  const { error: bookError, message: bookMessage } = useSelector(
    state => state.book
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (organisationError) {
      toast.error(organisationError);
      dispatch({ type: 'clearError' });
    }
    if (organisationMessage) {
      toast.success(organisationMessage);
      dispatch({ type: 'clearMessage' });
    }
    if (paymentError) {
      toast.error(paymentError);
      dispatch({ type: 'clearError' });
    }
    if (paymentMessage) {
      toast.success(paymentMessage);
      dispatch({ type: 'clearMessage' });
    }
    if (memberError) {
      toast.error(memberError);
      dispatch({ type: 'clearError' });
    }
    if (memberMessage) {
      toast.success(memberMessage);
      dispatch({ type: 'clearMessage' });
    }
    if (bookError) {
      toast.error(bookError);
      dispatch({ type: 'clearError' });
    }
    if (bookMessage) {
      toast.success(bookMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [
    dispatch,
    organisationError,
    organisationMessage,
    paymentError,
    paymentMessage,
    memberError,
    memberMessage,
    bookError,
    bookMessage,
  ]);

  useEffect(() => {
    dispatch(organisationLoadUser());
    dispatch(memberLoadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {organisationLoading && memberLoading ? (
        <h1>LOADING</h1>
      ) : (
        <>
          {organisation ? (
            <ResponsiveSideBar />
          ) : member ? (
            <MemberSideBar />
          ) : (
            <ResponsiveAppBar />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/organisation/all"
              element={<ShowAllOrganisations />}
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/organisationregister"
              element={
                <ProtectedRoute
                  isAuthenticated={!organisationIsAuthenticated}
                  redirect="/pricing"
                >
                  <RegisterOrg />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisationlogin"
              element={
                <ProtectedRoute
                  isAuthenticated={!organisationIsAuthenticated}
                  redirect="/organisation/me"
                >
                  <LoginOrg />
                </ProtectedRoute>
              }
            />

            <Route
              path="/organisation/me"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <></>
                </ProtectedRoute>
              }
            />

            <Route
              path="/organisation/books"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <ShowAllBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/book/add"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <AddBookAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/book/update/:id"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <UpdateBookAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateorganisation/:id"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <UpdateOrganisationSuperAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/book/delete/:id"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <DeleteBookAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/me"
              element={
                <ProtectedRoute
                  isAuthenticated={memberIsAuthenticated}
                  redirect="/userlogin"
                >
                  <></>
                </ProtectedRoute>
              }
            />

            <Route
              path="/userlogin"
              element={
                <ProtectedRoute
                  isAuthenticated={!memberIsAuthenticated}
                  redirect="/member/me"
                >
                  <LoginUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/forgotpassword"
              element={<ForgotPasswordOrg />}
            />
            <Route
              path="/organisation/resetpassword/:token"
              element={<ResetPasswordOrg />}
            />
            <Route
              path="/member/forgotpassword"
              element={<ForgotPasswordMember />}
            />
            <Route
              path="/member/resetpassword/:token"
              element={<ResetPasswordMember />}
            />
            <Route path="/paymentfailed" element={<PaymentFailed />} />
            <Route path="/paymentsuccessful" element={<PaymentSuccess />} />
            <Route
              path="/organisation/update"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <UpdateOrgDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/update"
              element={
                <ProtectedRoute
                  isAuthenticated={memberIsAuthenticated}
                  redirect="/userlogin"
                >
                  <UpdateMemberDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/all"
              element={
                <ProtectedRoute
                  isAuthenticated={memberIsAuthenticated}
                  redirect="/userlogin"
                >
                  <ShowAllBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/issued"
              element={
                <ProtectedRoute
                  isAuthenticated={memberIsAuthenticated}
                  redirect="/userlogin"
                >
                  <ViewAllIssuedReturnedBooks issued={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/returned"
              element={
                <ProtectedRoute
                  isAuthenticated={memberIsAuthenticated}
                  redirect="/userlogin"
                >
                  <ViewAllIssuedReturnedBooks returned={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/recommended"
              element={
                <ProtectedRoute
                  isAuthenticated={memberIsAuthenticated}
                  redirect="/userlogin"
                >
                  <ViewAllRecommendedBooks returned={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/updatepassword"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <UpdateOrgPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/addmember"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <AddMemberOrganisation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/removemember"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <RemoveMemberOrganisation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/allmembers"
              element={
                <ProtectedRoute
                  isAuthenticated={organisationIsAuthenticated}
                  redirect="/organisationlogin"
                >
                  <AllMembersOrganisation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/updatepassword"
              element={
                <ProtectedRoute
                  isAuthenticated={memberIsAuthenticated}
                  redirect="/userlogin"
                >
                  <UpdateMemberPassword />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
