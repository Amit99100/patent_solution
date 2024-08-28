// import React, { useEffect } from 'react'
// import './style/style.css';
// import Home from './pages/Home'
// import HowItWorks from './component/HowItWorks';
// import BookingPage from './component/bookingpage'
// import AskQuestions from './component/AskQuestions'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import ForgotPassword from './pages/forgetpassword'
// import ResetPassword from './pages/resetpassword'
// import UserDashboard from './pages/user/UserDashboard'
// import { BrowserRouter, Route, useHistory } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from './component/PrivateRoute';
// import AdminCreateProduct from './pages/admin/AdminCreateProduct';
// import AdminAddBanner from './pages/admin/AdminAddBanner';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import SignUpExpert from './pages/expertSignup'
// import DesignRegistration from './pages/publicinfo/design-registration'
// import PatentRegistration from './pages/publicinfo/patent-registration'
// import TrademarkRegistration from './pages/publicinfo/trademark-registration'
// import CopyrightRegistration from './pages/publicinfo/copyright-registration'
// import ResearchDevlopement from './pages/publicinfo/research-devlopment'
// import SeminarWorkshop from './pages/publicinfo/seminar-workshop'
// import Consultancy from './pages/publicinfo/consultancy'
// import prototypeDevlopment from './pages/publicinfo/prototype-devlopment'





// const App = () => {


//   const history = useHistory();

//   let isAuthenticated = false;
//   isAuthenticated = localStorage.getItem('token') !== null;

//   useEffect(() => {

//     if (isAuthenticated) {

//       history('/');
//     } else {
//       history('/signin');
//     }
//   }, [isAuthenticated, history]);

//   return (
//     <>
//       <ToastContainer />
//       <BrowserRouter>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/signup" component={SignUp} />
//         <Route exact path="/signup/expert" component={SignUpExpert} />
//         <Route exact path="/signin" component={SignIn} />
//         <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
//         <Route exact path="/admin/dashboard" component={AdminDashboard} />
//         <Route exact path="/admin/dashboard/product/create" component={AdminCreateProduct} />
//         <Route exact path="/admin/dashboard/banner/create" component={AdminAddBanner} />
//         <Route path="/forgot-password" component={ForgotPassword} />
//         {/* <Route path="/reset-password" component={ResetPassword} /> */}
//         <Route path="/api/reset-password" component={ResetPassword} />
//         <Route path="/book-call/:expertId" component={BookingPage} />
//         <Route path="/ask-questions/:expertId" component={AskQuestions} />
//         <Route path="/design-registration" component={DesignRegistration} />
//         <Route path="/patent-registration" component={PatentRegistration} />
//         <Route path="/trademark-registration" component={TrademarkRegistration} />
//         <Route path="/copyright-registration" component={CopyrightRegistration} />
//         <Route path="/research-devlopement" component={ResearchDevlopement} />
//         <Route path="/seminar-workshop" component={SeminarWorkshop} />
//         <Route path="/consultancy" component={Consultancy} />
//         <Route path="/prototype-devlopement" component={prototypeDevlopment} />
//         <Route path="/HowItWorks" component={HowItWorks} />


//       </BrowserRouter>
//     </>

//   )
// }

// export default App


import React, { useEffect } from 'react';
import './style/style.css';
import Home from './pages/Home';
import HowItWorks from './component/HowItWorks';
import BookingPage from './component/bookingpage';
import AskQuestions from './component/AskQuestions';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/forgetpassword';
import ResetPassword from './pages/resetpassword';
import UserDashboard from './pages/user/UserDashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './component/PrivateRoute';
import AdminCreateProduct from './pages/admin/AdminCreateProduct';
import AdminAddBanner from './pages/admin/AdminAddBanner';
import AdminDashboard from './pages/admin/AdminDashboard';
import SignUpExpert from './pages/expertSignup';
import DesignRegistration from './pages/publicinfo/design-registration';
import PatentRegistration from './pages/publicinfo/patent-registration';
import TrademarkRegistration from './pages/publicinfo/trademark-registration';
import CopyrightRegistration from './pages/publicinfo/copyright-registration';
import ResearchDevlopement from './pages/publicinfo/research-devlopment';
import SeminarWorkshop from './pages/publicinfo/seminar-workshop';
import Consultancy from './pages/publicinfo/consultancy';
import PrototypeDevlopment from './pages/publicinfo/prototype-devlopment';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Switch>
        {/* Home page is accessible without authentication */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup/expert" component={SignUpExpert} />
        <Route exact path="/signin" component={SignIn} />
        {/* Protect routes that require authentication */}
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <PrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <PrivateRoute exact path="/admin/dashboard/product/create" component={AdminCreateProduct} />
        <PrivateRoute exact path="/admin/dashboard/banner/create" component={AdminAddBanner} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/api/reset-password" component={ResetPassword} />
        <Route path="/book-call/:expertId" component={BookingPage} />
        <Route path="/ask-questions/:expertId" component={AskQuestions} />
        <Route path="/design-registration" component={DesignRegistration} />
        <Route path="/patent-registration" component={PatentRegistration} />
        <Route path="/trademark-registration" component={TrademarkRegistration} />
        <Route path="/copyright-registration" component={CopyrightRegistration} />
        <Route path="/research-devlopement" component={ResearchDevlopement} />
        <Route path="/seminar-workshop" component={SeminarWorkshop} />
        <Route path="/consultancy" component={Consultancy} />
        <Route path="/prototype-devlopement" component={PrototypeDevlopment} />
        <Route path="/HowItWorks" component={HowItWorks} />
      </Switch>
    </>
  );
};

const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
