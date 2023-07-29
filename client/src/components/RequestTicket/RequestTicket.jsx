import "./style1.css";
import "./style2.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
const layoutColor = "antiquewhite";
const bannerColor = "rgb(197, 124, 28)";

export default function RequestTicket() {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const navigateToNextPage = () => {
    navigate("/service");
  };

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("userIDT");
    navigate("/");
  };

  useEffect(async () => {
    try {
      const user = localStorage.getItem("userIDT");
      if (!user) {
        navigate("/");
      }
      const data = {
        userID: user,
      };

      const url = "http://localhost:8080/api/ticket/generate";
      var resp = await axios.post(url, data);
      resp = resp.data;

      if(resp.message==='Ticket exists')
      {
        navigate("/payment");
      }
      else if(resp.message==="Ticket created successfully"){
        localStorage.setItem("ticketID", resp.tid);
        setData(resp.details)
      }
      else {
        alert("Sorry no slots available!!");
        navigate("/dashboard")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.message);
      }
    }
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="col-3 px-4 d-flex justify-content-start align-items-center">
          <img src={require("./images/logo.png")} alt="" height="50" />
        </div>
        <div className="col-6 bullets d-flex">
          <span
            className="bullet active"
            style={{ boxShadow: `0px 0px 20px white` }}
          >
            <i className="fa fa-ticket" style={{ fontSize: "24px" }}></i>
          </span>
          <span className="bullet active">
            <i className="fa fa-map-o" style={{ fontSize: "24px" }}></i>
          </span>
          <span className="bullet active">
            <i className="fa fa-cc-visa" style={{ fontSize: "24px" }}></i>
          </span>
          <span className="bullet active">
            <i className="fa fa-check" style={{ fontSize: "24px" }}></i>
          </span>
        </div>
        <div className="col-3 px-2 d-flex justify-content-end">
          <button className="white_btn" onClick={handleLogout} disabled>
            Logout
          </button>
        </div>
      </div>

      <div
        className="container my-5 p-2"
        style={{ backgroundColor: layoutColor }}
      >
        <div className="col p-2">
          <div
            className="row mx-auto p-2 d-flex justify-content-center"
            style={{ backgroundColor: bannerColor }}
          >
            <h2>Parking Ticket</h2>
          </div>
          <div
            className="row m-5 py-4 px-5 d-flex justify-content-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <div className="col">
              <div className="row d-flex justify-content-center py-2">
                <div className="row" >
                  <table class="table table-bordered table-dark table-hover" style={{width:"24vw"}}>
                    <tbody>
                      <tr>
                        <th scope="row">Ticket ID</th>
                        <td>{data && localStorage.getItem("ticketID")}</td>
                      </tr>
                      <tr>
                        <th scope="row">Vehicle N.O.</th>
                        <td>{data && data.vehicleNo}</td>
                      </tr>
                      <tr>
                        <th scope="row">In Time</th>
                        <td>{data && data.inTime}</td>
                      </tr>
                      <tr>
                        <th scope="row">Location</th>
                        <td>BANGALORE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row p-3 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={navigateToNextPage}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
