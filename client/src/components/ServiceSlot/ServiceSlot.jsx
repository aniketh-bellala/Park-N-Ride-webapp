import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SlotsMap from "../SlotsMap/ServiceSlot"

// const primaryColor = "#3bb19b";
const secondaryColor = "rgb(9, 67, 95)";
const layoutColor = "antiquewhite";
const bannerColor = "rgb(197, 124, 28)";

export default function ServiceSlot() {
  const navigate = useNavigate();

  const slotArray1l=[29,25,17,9]
  const slotArray1r=[10,18,27,30]
  const slotArray2l=[21,13,5,1]
  const slotArray2r=[2,6,14,22]
  const slotArray3l=[23,15,7,3]
  const slotArray3r=[4,8,16,24]
  const slotArray4l=[31,26,19,11]
  const slotArray4r=[12,20,28,32]


  const [slots,setSlots] = useState(null)
  const [count,setCount] = useState(0)

  useEffect (async () => {
    
    try {
      

      const user = localStorage.getItem("userID");
		  if(!user){
			navigate("/adminLogin")
		  }

			const url = "http://localhost:8080/api/slot/getSlot";
			var resp = await axios.get(url);
      resp = resp.data
      
			if(resp.message==='Slots sent')
			{
        setSlots(resp.slot)
        console.log(slots[0])
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

  },[count]);


  const changeFaultSlot = async (slotId)=>{
    try {
      const data = {
        id:slotId
      }
			const url = "http://localhost:8080/api/slot/changeFault";
			var resp = await axios.post(url,data);
      resp = resp.data
      
			if(resp.message==='Slot made vacant after repair')
			{
        console.log(resp.id)
        setCount(count+1);
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
  }

  const navigateToNextPage = () => {
    navigate("/adminHome");
  };

  const handleLogout = ()=>{
    localStorage.removeItem("userID");
		navigate("/adminLogin");
  }

  return (
    <>
      <nav className="navbar">
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
            <h2>Parking Slots Map</h2>
          </div>
          <div
            className="row m-5 pt-4 pb-3 px-5 d-flex justify-content-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <div className="col px-5">
              <div className="row d-flex justify-content-center my-1">
                <button type="button" className="btn btn-success mx-2">
                  Vacant
                </button>
                <button type="button" className="btn btn-danger mx-2">
                  Occupied
                </button>
                <button type="button" className="btn btn-warning mx-2">
                  Faulty
                </button>
              </div>
              <div className="row mt-3 py-2 px-5 d-flex justify-content-center">
                <table className="table table-dark table-borderless d-flex justify-content-center">
                  <tbody>
                    <tr>
                    <td className="text-center"></td>

                      {slots&&slotArray1l.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                    <td className="text-center"></td>

                    {slots&&slotArray1r.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                      <td className="text-center"></td>

                    </tr>
                    <tr>
                    <td className="text-center"></td>

                      {slots&&slotArray2l.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                    <td className="text-center"></td>

                    {slots&&slotArray2r.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                      <td className="text-center"></td>

                    </tr>
                    <tr><td></td></tr>
                    <tr>
                    <td className="text-center"></td>

                      {slots&&slotArray3l.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                    <td className="text-center"></td>

                    {slots&&slotArray3r.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                      <td className="text-center"></td>

                    </tr>
                    <tr>
                    <td className="text-center"></td>

                      {slots&&slotArray4l.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                    <td className="text-center"></td>

                    {slots&&slotArray4r.map(item=>{
                        return <SlotsMap id={item} obj={slots.find(obj => {
                          return obj.id === item
                        })} change={changeFaultSlot} />
                      })}

                      <td className="text-center"></td>

                    </tr>
                  </tbody>
                </table>
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
      </div>
    </>
  );
}
