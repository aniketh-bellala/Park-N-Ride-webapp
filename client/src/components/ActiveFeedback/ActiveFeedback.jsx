import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
const layoutColor = "antiquewhite";
const bannerColor = "rgb(197, 124, 28)";

export default function ActiveFeedback() {

  const navigate = useNavigate();
  const [feedbackInfo, setfeedbackInfo] = useState(null);

  const handleLogout = ()=>{
    localStorage.removeItem("userID");
		navigate("/adminLogin");
  }

  useEffect(async () => {
    try {
      const user = localStorage.getItem("userID");
      if (!user) {
        navigate("/adminLogin");
      }

      const url = "http://localhost:8080/api/feedback/viewFeedback";
      var resp = await axios.post(url,{status:true});
      resp = resp.data;
      if (resp.message) {
        console.log(resp.reviews[0]);
        setfeedbackInfo(resp.reviews);
        console.log(feedbackInfo)
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

  const archiveFeedback = async (event)=>{
    
      const url = "http://localhost:8080/api/feedback/updateFeedback";

      // console.log("clicked!")

      const idx = event.currentTarget.id;

      console.log(idx);

			var resp = await axios.post(url, {"UserID":idx});
      resp = resp.data

      console.log(resp.message);  
      
			if(resp.message==='Archived Feedback!')
			{
        alert("Archived feedback successfully!");
        window.location.reload();
      }
      else
      {
        alert("Please try again later!");
        window.location.reload();
      }
  }

  const tdData = () => {
    return feedbackInfo&&feedbackInfo.map((data,index) => {

      return (
        <tr>
          <th scope="row">{index+1}</th>
          <td>{data.userID}</td>
          <td>Feedback</td>
          <td>{data.comments}</td>
          <td>
            <button type="button" className="btn btn-danger btn-sm" id={data.userID} onClick={archiveFeedback}>
              Take Action
            </button>
          </td>
        </tr>
      );
    });
  };



  return (
    <>
      <div className="navbar">
        <div className="col-3 px-4 d-flex justify-content-start align-items-center">
          <img
            src={require("./images/logo.png")}
            alt=""
            srcset=""
            height="50"
          />
        </div>
        <div className="col-3 px-2 d-flex justify-content-end">
          <button className="white_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div
        className="container mt-5 p-2"
        style={{ backgroundColor: layoutColor }}
      >
        <div className="col p-2">
          <div
            className="row mx-auto p-2 d-flex justify-content-center"
            style={{ backgroundColor: bannerColor }}
          >
            <h2>Requests / Feedback</h2>
          </div>
          <div
            className="row m-5 pt-4 pb-3 px-5 d-flex justify-content-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <div className="col">
              <div className="row d-flex justify-content-center my-1">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <a
                    href="/activeRequests"
                    className="btn btn-warning btn-lg mx-1"
                    role="button"
                    style={{ width: "max-content" }}
                  >
                    Active Requests
                  </a>
                  <a
                    href="/activeFeedback"
                    className="btn btn-warning btn-lg"
                    role="button"
                    style={{ width: "max-content" }}
                  >
                    Active Feedbacks
                  </a>
                  <a
                    href="/adminHome"
                    className="btn btn-success btn-lg mx-1"
                    role="button"
                    style={{ width: "max-content" }}
                  >
                    Home Page
                  </a>
                  <a
                    href="/archiveRequests"
                    className="btn btn-warning btn-lg"
                    role="button"
                    style={{ width: "max-content" }}
                  >
                    Archive Requests
                  </a>
                  <a
                    href="/archiveFeedback"
                    className="btn btn-warning btn-lg mx-1"
                    role="button"
                    style={{ width: "max-content" }}
                  >
                    Archive Feedbacks
                  </a>
                </div>
              </div>
              <div className="row my-4">
                <table className="table table-dark table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Request Type</th>
                      <th scope="col">Comments</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tdData()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
