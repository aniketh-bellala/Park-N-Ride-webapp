// import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style1.css";
import "./style2.css";

// import { useNavigate } from "react-router-dom";

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
// const layoutColor = "antiquewhite";
// const bannerColor = "rgb(197, 124, 28)";

export default function AdminHome() {

  const navigate = useNavigate();

  useEffect(()=>{
    const user = localStorage.getItem("userID");
		  if(!user){
			navigate("/adminLogin")
		  }
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem("userID");
		navigate("/adminLogin");
  }

  const getProfile = ()=>{
    navigate("/adminProfile");
  }

  const getContact = ()=>{
    navigate("/contact");
  }

  const getReq = ()=>{
    navigate("/activeRequests");
  }

  const getSlot = ()=>{
    navigate("/serviceSlot");
  }

  return (
    <>
      {/* <Link to="/Func1">Profile</Link>
        <br />
        <Link to="/Func2">Contact Service Agents</Link>
        <br />
        <Link to="/Func31">Service Requests</Link>
        <br />
        <Link to="/Func4">Service Faulty Slots</Link> */}

      <div className="navbar" style={{ position: "fixed" }}>
        <div className="col-3 px-4 d-flex justify-content-start align-items-center">
          <img
            src={require("./images/logo.png")}
            alt=""
            srcset=""
            height="50"
          />
        </div>

        <div className="col-4">
          {/* <div className="row">
            <div className="col-12">
              <a className="nav-link p-3" href="#actions">
                Actions
              </a>
            </div>
          </div> */}
        </div>

        <div className="col-3 px-2 d-flex justify-content-end">
          <button className="white_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ height: "10vh", width: "20vw" }}></div>

      <div className="container my-5 mx-auto">
        <div className="col-12 mx-auto mb-5">
          <div
            className="row d-flex justify-content-center align-items-center text-center mx-5 mb-5"
            style={{ height: "75vh", backgroundColor: secondaryColor }}
          >
            <h1 style={{ fontSize: "48px", color: "white" }}>
              <strong style={{ color: "#f6b219" }}>Hello </strong>Admin!
            </h1>
          </div>
        </div>

        <div className="container" style={{ height: "75vh" }}>
          <div style={{ paddingTop: "120px" }} id="actions"></div>
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>
                  <strong className="yellow">Admin </strong>Dashboard
                </h2>
                <h3>
                  Park N Ride, Bengaluru welcomes you! 
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-6 d-flex justify-content-center align-self-stretch"
            >
              <div className="food_box">
                <br />
                <button type="button" onClick={getProfile} className="btn btn-warning"><strong>Profile</strong></button>
                <br />
                <br />
                <p>
                   An admin profile is a collection of settings and information associated with a admin. It contains critical information that is used to identify an individual, such as their name, age, portrait photograph and individual characteristics such as knowledge or expertise.
                </p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-self-stretch">
              <div className="food_box">
                <br />
                <button type="button" onClick={getContact} className="btn btn-warning"><strong>Contact service agents</strong></button>
                <br />
                <br />
                <p>
                  In search of external service agencies? Why worry, when we are here. We help you by reaching out the finest third party service agencies to get your work done in minutes.
                  Visit here to contact the service agencies you may like!  
                </p>
              </div>
            </div>
            <div
              className="col-md-6 d-flex justify-content-center align-self-stretch"
            >
              <div className="food_box">
                <br />
                <button type="button" onClick={getReq} className="btn btn-warning"><strong>Service Requests</strong></button>
                <br />
                <br />
                <p>
                  This section allows you to check and take action on any pending service requests raised by user. You could also take action on any feedbacks provided by users to develop the Park N Ride complex and improve customer's experience.
                </p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-self-stretch">
              <div className="food_box">
                <br />
                <button type="button" onClick={getSlot} className="btn btn-warning"><strong>Service faulty slots</strong></button>
                <br />
                <br />
                <p>
                  It displays the visual layout of the Park N Ride complex in detail. Each is parking slot's status is displayed (vacant, occupied, faulty). You could also update the faulty slot's status on servicing it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
