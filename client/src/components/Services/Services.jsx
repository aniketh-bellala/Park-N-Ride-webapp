import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
const layoutColor = "antiquewhite";
const bannerColor = "rgb(197, 124, 28)";

export default function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState({ wash: 0, fuel: 0, tyre: 0 });

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("userIDT");
    navigate("/");
  };

  const navigateToNextPage = async () => {
    const data = {
      userID: localStorage.getItem("userIDT"),
      carWashStatus: services.wash,
      fuelStatus: services.fuel,
      tyreworkStatus: services.tyre,
    };
    const url = "http://localhost:8080/api/ticket/addService";
    var resp = await axios.post(url, data);
    resp = resp.data;

    if (resp.message === "No Ticket exists") {
      navigate("/dashboard");
    } else {
      navigate("/payment");
    }
  };

  const handleCart = (event) => {
    const btn = document.getElementById(event.currentTarget.id);
    const target = event.currentTarget;
    if (btn.innerText === "Add to Cart") {
      setServices({ ...services, [target.name]: 1 });
      btn.innerText = "Remove from Cart";
      console.log(services);
    } else {
      setServices({ ...services, [target.name]: 0 });
      btn.innerText = "Add to Cart";
      console.log(services);
    }
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
          <span
            className="bullet active"
            style={{ boxShadow: `0px 0px 20px white` }}
          >
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
          <button className="white_btn" disabled>
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
            <h2>Premium Services</h2>
          </div>
          <div
            className="row m-5 py-4 px-5 d-flex justify-content-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <div className="col">
              <div className="row d-flex justify-content-center">
                <h4 style={{ color: layoutColor, textAlign: "center" }}>
                  Experience our below services @ discounted price !
                </h4>
              </div>
              <hr />
              <div className="row">
                <div className="col-4 d-flex justify-content-center">
                  <div
                    className="card text-center"
                    style={{
                      width: "18rem",
                      backgroundColor: "rgb(255, 196, 0)",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Car Wash</h5>
                      <p className="card-text">
                        Car Wash services available by Wash247 @ flat 20%
                        discount !
                      </p>
                      <p className="card-text">PRICE : 300 INR</p>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id="car-wash"
                        name="wash"
                        onClick={handleCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div
                    className="card text-center"
                    style={{
                      width: "18rem",
                      backgroundColor: "rgb(255, 196, 0)",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">EV Charging / Fuelling</h5>
                      <p className="card-text">
                        EV charging services available by PowerNxt @ flat 25%
                        discount !
                      </p>
                      <p className="card-text">PRICE : 100 INR</p>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id="ev-fill"
                        name="fuel"
                        onClick={handleCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div
                    className="card text-center"
                    style={{
                      width: "18rem",
                      backgroundColor: "rgb(255, 196, 0)",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Tyres Related</h5>
                      <p className="card-text">
                        Tyres filling services available by Tyrefig99 @ flat 32%
                        discount !
                      </p>
                      <p className="card-text">PRICE : 50 INR</p>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id="tyre-fill"
                        name="tyre"
                        onClick={handleCart}
                      >
                        Add to Cart
                      </button>
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
