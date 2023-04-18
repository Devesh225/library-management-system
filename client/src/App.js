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

function App() {
  const {
    isAuthenticated,
    organisation,
    error: organisationError,
    message: organisationMessage,
    loading,
  } = useSelector(state => state.organisation);

  const { error: paymentError, message: paymentMessage } = useSelector(
    state => state.payment
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
  }, [
    dispatch,
    organisationError,
    organisationMessage,
    paymentError,
    paymentMessage,
  ]);

  useEffect(() => {
    dispatch(organisationLoadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <>
          {isAuthenticated ? (
            <ResponsiveSideBar organisation={organisation} />
          ) : (
            <ResponsiveAppBar />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/organisationregister"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
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
                  isAuthenticated={!isAuthenticated}
                  redirect="/organisation/me"
                >
                  <LoginOrg />
                </ProtectedRoute>
              }
            />
            <Route path="/userlogin" element={<LoginUser />} />
            <Route
              path="/organisation/forgotpassword"
              element={<ForgotPasswordOrg />}
            />
            <Route
              path="/organisation/resetpassword/:token"
              element={<ResetPasswordOrg />}
            />
            <Route path="/paymentfailed" element={<PaymentFailed />} />
            <Route path="/paymentsuccessful" element={<PaymentSuccess />} />
            <Route
              path="/organisation/update"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  redirect="/organisationlogin"
                >
                  <UpdateOrgDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organisation/updatepassword"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
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
                  isAuthenticated={isAuthenticated}
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
                  isAuthenticated={isAuthenticated}
                  redirect="/organisationlogin"
                >
                  <RemoveMemberOrganisation />
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
