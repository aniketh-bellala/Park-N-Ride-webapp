import "./style.css"

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
const layoutColor = "antiquewhite";
const bannerColor = "rgb(197, 124, 28)";

export default function ContactAgents() {
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

  const navigateToNextPage = () => {
    navigate("/adminHome");
  };
  return (
    <>
      <nav className="navbar">
        <div className="col-3 px-4 d-flex justify-content-start align-items-center">
          <img src={require("./images/logo.png")} alt="" srcset="" height="50" />
        </div>
        <div className="col-3 px-2 d-flex justify-content-end">
          <button className="white_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div
        className="container mt-5 p-2"
        style={{ backgroundColor: layoutColor }}
      >
        <div className="col p-2">
          <div
            className="row mx-auto p-2 d-flex justify-content-center"
            style={{ backgroundColor: bannerColor }}
          >
            <h2>Contact Service Agents</h2>
          </div>
          <div
            className="col my-5 pt-4 pb-3 px-5"
            style={{ backgroundColor: secondaryColor }}
          >
            <div className="row d-flex">
              <div className="col-4 d-flex justify-content-center p-0">
                <div className="card pt-1">
                  <img
                    src={require("./images/admin.png")}
                    alt="Jane"
                    height="100"
                    width="100"
                  />
                  <div className="container mt-2">
                    <h2>Jane Doe</h2>
                    <p className="title">CEO & Founder</p>
                    <p>jane@example.com</p>
                    <p>
                      <button className="button">Contact</button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-4 d-flex justify-content-center p-0">
                <div className="card pt-1">
                  <img
                    src={require("./images/admin.png")}
                    alt="Jane"
                    height="100"
                    width="100"
                  />
                  <div className="container mt-2">
                    <h2>Mike Ross</h2>
                    <p className="title">CEO & Founder</p>
                    <p>mike@example.com</p>
                    <p>
                      <button className="button">Contact</button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-4 d-flex justify-content-center p-0">
                <div className="card pt-1">
                  <img
                    src={require("./images/admin.png")}
                    alt="Jane"
                    height="100"
                    width="100"
                  />
                  <div className="container mt-2">
                    <h2>John Doe</h2>
                    <p className="title">CEO & Founder</p>
                    <p>john@example.com</p>
                    <p>
                      <button className="button">Contact</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-3 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={navigateToNextPage}
              >
                Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
