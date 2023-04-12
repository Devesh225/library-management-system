import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Pricing from './components/Pricing';
import RegisterOrg from './components/RegisterOrg';
import RegisterUser from './components/RegisterUser';
import LoginOrg from './components/LoginOrg';
import LoginUser from './components/LoginUser';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { organisationLoadUser } from './redux/actions/organisationAction';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  const { isAuthenticated, organisation, error, message } = useSelector(
    state => state.organisation
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(organisationLoadUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/organisationregister" element={<RegisterOrg />} />
        <Route path="/organisationlogin" element={<LoginOrg />} />
        <Route path="/userregister" element={<RegisterUser />} />
        <Route path="/userlogin" element={<LoginUser />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
