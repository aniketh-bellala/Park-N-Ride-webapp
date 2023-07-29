import { Route, Routes } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import UserDash from "./components/User/UserDash";
import Profile from "./components/Profile/Profile";
import Ticket from "./components/RequestTicket/RequestTicket";
import Services from "./components/Services/Services";
import Payment from "./components/Payment/Payment";
import Confirmation from "./components/Confirmation/Confirmation";
import AdminLogin from "./components/AdminLogin/index";
import AdminSignup from "./components/AdminSingup/index";
import AdminHome from "./components/AdminHome/AdminHome";
import ContactAgents from "./components/ContactAgents/ContactAgents";
import AdminProfile from "./components/AdminProfile/Profile";
import ServiceSlot from "./components/ServiceSlot/ServiceSlot";
import ActiveRequests from "./components/ActiveRequests/ActiveRequests";
import ActiveFeedback from "./components/ActiveFeedback/ActiveFeedback";
import ArchiveRequests from "./components/ArchiveRequests/ArchiveRequests";
import ArchiveFeedback from "./components/ArchiveFeedback/ArchiveFeedback";

function App() {
  // const user = localStorage.getItem("userID");

  return (
    <Routes>
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/" exact element={<Login />} />
      <Route path="/dashboard" exact element={<UserDash />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/ticket" exact element={<Ticket />} />
      <Route path="/service" exact element={<Services />} />
      <Route path="/payment" exact element={<Payment />} />
      <Route path="/confirm" exact element={<Confirmation />} />
      <Route path="/adminLogin" exact element={<AdminLogin />} />
      <Route path="/adminSignup" exact element={<AdminSignup />} />
      <Route path="/adminHome" exact element={<AdminHome />} />
      <Route path="/contact" exact element={<ContactAgents />} />
      <Route path="/adminProfile" exact element={<AdminProfile />} />
      <Route path="/serviceSlot" exact element={<ServiceSlot />} />
      <Route path="/activeRequests" exact element={<ActiveRequests />}></Route>
      <Route path="/activeFeedback" exact element={<ActiveFeedback />}></Route>
      <Route
        path="/archiveRequests"
        exact
        element={<ArchiveRequests />}
      ></Route>
      <Route
        path="/archiveFeedback"
        exact
        element={<ArchiveFeedback />}
      ></Route>
    </Routes>
  );
}
/* <Route path="/userPage" element={<Navigate replace to="/login" />} /> */

export default App;
