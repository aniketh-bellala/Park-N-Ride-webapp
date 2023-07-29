import "./style.css";
import "./feedback.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
// const layoutColor = "antiquewhite";
// const bannerColor = "rgb(197, 124, 28)";

export default function UserHome() {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
      "name":"",
      "phone":"",
      "email":""
    });


    useEffect(async () => {
    
    try {
      const user = localStorage.getItem("userID");
		  if(!user){
			navigate("/")
		  }
      const data = {
        "email":user
      }

			const url = "http://localhost:8080/api/user/profile";
			var resp = await axios.post(url, data);
      resp = resp.data
			if(resp.message==='logged in successfully')
			{
        setUserInfo(resp.data)
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

  },[]);

	const handleLogout = () => {
		localStorage.removeItem("userID");
    localStorage.removeItem("userIDT");
		navigate("/");
	};



    const getProfile = ()=>{
      navigate("/profile");
    }

    const getTicket = ()=>{
      navigate("/ticket");
    }

    const handleFeedback = async()=>{
      const url = "http://localhost:8080/api/feedback/addFeedback";

      const data = {
        "userID":localStorage.getItem("userIDT"),
        "comments":document.getElementById("yourfeedback").value
      }

			var resp = await axios.post(url, data);
      resp = resp.data
      
			if(resp.message==='Feedback submitted')
			{
        alert("Sent feedback successfully!");
        window.location.reload();
      }
      else
      {
        alert("Please try again later!");
        window.location.reload();
      }
    }


  return (
    <>
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
          <div className="row">
            <div className="col-4">
              <a className="nav-link p-3" href="#actions">
                Actions
              </a>
            </div>
            <div className="col-4">
              <a className="nav-link p-3" href="#srvcs">
                Services
              </a>
            </div>
            
            <div className="col-4">
              <a className="nav-link p-3" href="#fdbck">
                Feedback
              </a>
            </div>
          </div>
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
              <strong style={{ color: "#f6b219" }}>Hello </strong>User!
            </h1>
          </div>
        </div>

        <div className="container" style={{ height: "75vh" }}>
          <div style={{ paddingTop: "120px" }} id="actions"></div>
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>
                  <strong className="yellow">User </strong>Dashboard
                </h2>
                <h3>
                  Park N Ride, Bengaluru welcomes you! 
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-self-stretch">
              <div className="food_box">
                <br />
                <button type="button" onClick={getProfile} className="btn btn-warning"><strong>Profile</strong></button>
                <br />
                <br />
                <p>
                  A user profile is a collection of settings and information associated with a user. It contains critical information that is used to identify an individual, such as their name, age, portrait photograph and individual characteristics such as knowledge or expertise.
                </p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-self-stretch">
              <div className="food_box">
                <br />
                <button type="button" onClick={getTicket} className="btn btn-warning"><strong>Request Parking Slot</strong></button>
                <br />
                <br />
                <p>
                  A user could request ticket for parking his vehicle in the complex. On subject to availability of vacant slots, user is assigned a ticket. Fare would be calculated in the end based on checkout time and the premium services opted.
                </p>
                <p><strong>Parking Fare : 15 INR / hour</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="works pt-5 row" id="srvcs">
          {/* <div style={{paddingTop:"100px"}} id="srvcs"></div> */}
          <div className="container mt-5" style={{ height: "72vh" }} id="srvcs">
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="titlepage text-center">
                  <span>PARK N RIDE @ your convinience</span>
                  <h2>
                    <strong className="yellow">Premium </strong>Services
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 d-flex align-self-stretch">
                <div id="white_bg" className="works_box">
                  <h4>01</h4>
                  <p style={{ textAlign: "center" }}>CAR WASH</p>
                  <p>
                    Selecting a full-service car wash service can be more
                    expensive because of the attention to detail involved in
                    cleaning your vehicle. We offer customized plans so you can
                    choose what works best for your vehicle and budget from the
                    available options.
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex align-self-stretch">
                <div id="white_bg" className="works_box">
                  <h4>02</h4>
                  <p style={{ textAlign: "center" }}>EV CHARGING</p>
                  <p>
                    Providing EV owner the convenience of charging their
                    vehicles while parking in order to use their time
                    productively. You will get updates on charging,
                    recommendations on paying charges online!
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex align-self-stretch">
                <div id="white_bg" className="works_box">
                  <h4>03</h4>
                  <p style={{ textAlign: "center" }}>TYRES RELATED</p>
                  <p>
                    Whether it’s a tubeless tyre puncture repair, air fill or a
                    stepney change, why look for a puncture shop when PARK N
                    RIDE arrives at your parking slot ? We get you moving!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

          <div className="container p-5">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "75vh" }}
          id="fdbck"
        >
          <div className="col-2"></div>
          <div className="col-4">
            <div className="col feedback_alert">
              <h1>Your</h1>
              <h1>Feedback</h1>
              <h1>is our</h1>
              <h1>Priority !</h1>
            </div>
          </div>
          <div className="col-6">
            <div className="row d-flex justify-content-center">
              <div className="wrapper">
                <h3 style={{ textAlign: "center" }}>Feedback Form</h3>
                <div id="error_message"></div>
                <form id="myform" onsubmit="return validate();">
                  <div className="input_field">
                    <input type="text" placeholder="Name" id="name" value={userInfo.name} />
                  </div>
                  <div className="input_field">
                    <input type="text" placeholder="Phone" id="phone" value={userInfo.phone}/>
                  </div>
                  <div className="input_field">
                    <input type="text" placeholder="Email" id="email" value={userInfo.email}/>
                  </div>
                  <div className="input_field">
                    <textarea
                      placeholder="Your Feedback"
                      id="yourfeedback"
                    ></textarea>
                  </div>
                  <button type="button" onClick={handleFeedback} className="btn btn-warning btn-block"><strong>Submit</strong></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* <div style={{ height: "10vh", width: "20vw" }}></div>

      <div className="container my-5 mx-auto">
        <div className="col-12 mx-auto mb-5">
          <div
            className="row d-flex justify-content-center align-items-center text-center mx-5 mb-5"
            style={{ height: "75vh", backgroundColor: secondaryColor }}
          >
            <h1 style={{ fontSize: "48px", color: "white" }}>
              <strong style={{ color: "#f6b219" }}>Hello </strong>User!
            </h1>
          </div>
        </div>

        <div className="container" style={{ height: "75vh" }}>
          <div style={{ paddingTop: "120px" }} id="actions"></div>
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>
                  <strong className="yellow">User </strong>Dashboard
                </h2>
                <span>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majorityomised words which don't look even
                  slightly believable
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-self-stretch">
              <div className="food_box">
                <br /> */}
                {/* <a
                  href="/Func1"
                  className="btn btn-warning btn-lg"
                  role="button"
                >
                  <strong>Profile</strong>
                </a> */}
                {/* <button type="button" onClick={getProfile} className="btn btn-warning"><strong>Profile</strong></button>
                <br />
                <br />
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable
                </p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-self-stretch">
              <div className="food_box">
                <br /> */}
                {/* <a
                  href="/Page1"
                  className="btn btn-warning btn-lg"
                  role="button"
                >
                  <strong>Request Parking Slot</strong>
                </a> */}
                {/* <button type="button" onClick={getTicket} className="btn btn-warning"><strong>Request Parking Slot</strong></button>
                <br />
                <br />
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="works p-5 row"> */}
          {/* <div style={{paddingTop:"100px"}} id="srvcs"></div> */}
          {/* <div className="container mt-5" style={{ height: "72vh" }} id="srvcs">
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="titlepage text-center">
                  <span>PARK N RIDE @ your convinience</span>
                  <h2>
                    <strong className="yellow">Premium </strong>Services
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 d-flex align-self-stretch">
                <div id="white_bg" className="works_box">
                  <h4>01</h4>
                  <p style={{ textAlign: "center" }}>CAR WASH</p>
                  <p>
                    Selecting a full-service car wash service can be more
                    expensive because of the attention to detail involved in
                    cleaning your vehicle. We offer customized plans so you can
                    choose what works best for your vehicle and budget from the
                    available options.
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex align-self-stretch">
                <div id="white_bg" className="works_box">
                  <h4>02</h4>
                  <p style={{ textAlign: "center" }}>EV CHARGING</p>
                  <p>
                    Providing EV owner the convenience of charging their
                    vehicles while parking in order to use their time
                    productively. You will get updates on charging,
                    recommendations on paying charges online!
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex align-self-stretch">
                <div id="white_bg" className="works_box">
                  <h4>03</h4>
                  <p style={{ textAlign: "center" }}>TYRES RELATED</p>
                  <p>
                    Whether it's a tubeless tyre puncture repair, air fill or a
                    stepney change, why look for a puncture shop when PARK N
                    RIDE arrives at your parking slot ? We get you moving!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
