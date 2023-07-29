import "./style.css";

import { useNavigate } from "react-router-dom";

// const primaryColor = "#3bb19b";
// const secondaryColor = "rgb(9, 67, 95)";
const layoutColor = "antiquewhite";
const bannerColor = "rgb(197, 124, 28)";

export default function Confirmation() {
  const navigate = useNavigate();

  const handleLogout = () => {
		localStorage.removeItem("userID");
    localStorage.removeItem("userIDT");
		navigate("/");
	};
  const navigateToNextPage = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="navbar">
        <div className="col-3 px-4 d-flex justify-content-start align-items-center">
          <img src={require("./images/logo.png")} alt="" height="50" />
        </div>
        <div className="col-6 bullets d-flex">
          <span className="bullet active">
            <i className="fa fa-ticket" style={{ fontSize: "24px" }}></i>
          </span>
          <span className="bullet active">
            <i className="fa fa-map-o" style={{ fontSize: "24px" }}></i>
          </span>
          <span
            className="bullet active"
            
          >
            <i className="fa fa-cc-visa" style={{ fontSize: "24px" }}></i>
          </span>
          <span className="bullet active" style={{ boxShadow: `0px 0px 20px white` }}>
            <i className="fa fa-check" style={{ fontSize: "24px" }}></i>
          </span>
        </div>
        <div className="col-3 px-2 d-flex justify-content-end">
          <button className="white_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
<div className="container my-5 p-2" style={{backgroundColor:layoutColor}}>
        <div className="col p-2">
          <div
            className="row mx-auto p-2 d-flex justify-content-center"
            style={{backgroundColor:bannerColor}}
          >
            <h2>THANK YOU !</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col">
          <div className="row d-flex justify-content-center">
            <img
              src={require("./images/tick.gif")}
              alt=""
              srcset=""
              style={{width:"max-content"}}
            />
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
    </>
  );
}
