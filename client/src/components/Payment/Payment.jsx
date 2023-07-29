import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
const layoutColor = "antiquewhite";
const bannerColor = "rgb(197, 124, 28)";

export default function Payment() {
  const navigate = useNavigate();

  const date = new Date();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [services, setServices] = useState([]);
  const [amt, setAmt] = useState(null);
  var arr = [];
  useEffect(async () => {
    const data = {
      userID: localStorage.getItem("userIDT"),
    };
    const url = "http://localhost:8080/api/ticket/checkout";
    var resp = await axios.post(url, data);
    resp = resp.data;
    console.log(resp);
    setTicketDetails(resp);
    // setTime(new Date(ticketDetails.existTicket.inTime))
    if (JSON.stringify(resp.existReq) !== "{}") {
      if (resp.existReq.carWashStatus > 0) arr.push("Car wash");
      if (resp.existReq.fuelStatus > 0) arr.push("Fueling");
      if (resp.existReq.tyreworkStatus > 0) arr.push("Tyre work");
      setServices(arr);
      // console.log((Math.abs(date-ticketDetails.existTicket.inTime)/36e5)*10)
      // console.log(date)
    }
    console.log(services);
    if (JSON.stringify(resp.existTicket) !== "{}") {
      const date1 = new Date(resp.existTicket.inTime);
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1) / 36e5;
      var a = 0;
      if (
        JSON.stringify(resp.existReq) !== "{}" &&
        resp.existReq.status == false
      ) {
        a += resp.existReq.carWashStatus * 300;
        a += resp.existReq.fuelStatus * 100;
        a += resp.existReq.tyreworkStatus * 50;
      }
      setAmt(Math.ceil(diffTime) * 15 + a);
    }
    console.log(amt);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("userIDT");
    navigate("/");
  };

  const navigateToNextPage = async () => {
    const data = {
      userID: localStorage.getItem("userIDT"),
      amount: amt,
    };
    const url = "http://localhost:8080/api/ticket/payment";
    var resp = await axios.post(url, data);
    resp = resp.data;
    console.log(resp);
    navigate("/confirm");
  };

  return (
    <>
      {ticketDetails && services && (
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
                style={{ boxShadow: `0px 0px 20px white` }}
              >
                <i className="fa fa-cc-visa" style={{ fontSize: "24px" }}></i>
              </span>
              <span className="bullet active">
                <i className="fa fa-check" style={{ fontSize: "24px" }}></i>
              </span>
            </div>
            <div className="col-3 px-2 d-flex justify-content-end">
              <button className="white_btn" onClick={handleLogout}>
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
                <h2>Payment Gateway</h2>
              </div>
              <div
                className="col mt-5 p-3 mb-4"
                style={{ backgroundColor: secondaryColor }}
              >
                <div className="row d-flex justify-content-center">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    View Ticket Summary
                  </button>

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Ticket History
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <table className="table table-hover table-bordered table-dark">
                            <tbody>
                              <tr>
                                <th>Ticket ID</th>
                                <td>
                                  {ticketDetails &&
                                    ticketDetails.existTicket._id}
                                </td>
                              </tr>
                              <tr>
                                <th>In Time</th>
                                <td>
                                  {ticketDetails &&
                                    ticketDetails.existTicket.inTime.substring(
                                      0,
                                      10
                                    ) +
                                      " " +
                                      ticketDetails.existTicket.inTime.substring(
                                        11,
                                        19
                                      )}
                                </td>
                              </tr>

                              <tr>
                                <th>Services</th>
                                <td>
                                  {services &&
                                    services.map((item) => {
                                      return <li>{item}</li>;
                                    })}
                                </td>
                              </tr>
                              <tr>
                                <th>Status</th>
                                <td>
                                  {ticketDetails &&
                                  ticketDetails.existReq.status == true
                                    ? "In progress"
                                    : "Done"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                  <h3 style={{ color: layoutColor }}>Grand Total: {amt} INR</h3>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                  <h4 style={{ color: layoutColor }}>
                    Thank you for choosing our services!
                  </h4>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                  <h4 style={{ color: layoutColor }}>
                    How would you like to pay the bill?
                  </h4>
                </div>
                <hr />
                <div className="row p-3">
                  <div className="col d-flex align-items-center justify-content-end px-5">
                    <i
                      className="fa-solid fa-qrcode fa-3x"
                      style={{ marginRight: "0.6em" }}
                    ></i>
                    <button type="button" className="btn btn-warning">
                      Google Pay / UPI
                    </button>
                  </div>
                  <div className="col d-flex align-items-center justify-content-start px-5">
                    <i
                      className="fa-regular fa-credit-card fa-3x"
                      style={{ marginRight: "0.6em" }}
                    ></i>
                    <button type="button" className="btn btn-warning">
                      Credit / Debit Card
                    </button>
                  </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
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
        </>
      )}
    </>
  );
}
