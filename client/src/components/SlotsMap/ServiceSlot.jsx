import React from 'react';

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // const primaryColor = "#3bb19b";
// const secondaryColor = "rgb(9, 67, 95)";
// const layoutColor = "antiquewhite";
// const bannerColor = "rgb(197, 124, 28)";

export default function ServiceSlot(props) {
  // const navigate = useNavigate();

  // const slotArray1=[29,25,17,9,10,18,27,30]
  // const slotArray2=[21,13,5,1,2,6,14,22]
  // const slotArray3=[23,15,7,3,4,8,16,24]
  // const slotArray4=[31,26,19,11,12,20,28,32]


  // const [slots,setSlots] = useState(null)

  // useEffect (async () => {
    
  //   try {
      

	// 		const url = "http://localhost:8080/api/slot/getSlot";
	// 		var resp = await axios.get(url);
  //     resp = resp.data
      
	// 		if(resp.message==='Slots sent')
	// 		{
  //       setSlots(resp.slot)
  //       console.log(slots[0])
  //     }
      
	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			console.log(error.response.message);
	// 		}
	// 	}

  // },[]);

  // const navigateToNextPage = () => {
  //   navigate("/adminHome");
  // };

  // const handleLogout = ()=>{
  //   localStorage.removeItem("userID");
	// 	navigate("/adminLogin");
  // }

  const change = ()=>{
    alert("Your updating slot status to vacant")
    props.change(props.id)
  }

  return (
    <>
        <td className="text-center">
          <button id={props.id} type="button" className={`btn m-1 ${props.obj.status==="occupy"?" btn-danger ":""} 
          ${props.obj.status==="vacant"?" btn-success ":""}
          ${props.obj.status==="faulty"?" btn-warning ":""}
          `}  onClick={props.obj.status==="faulty"?change:undefined} data-toggle="tooltip" data-placement="top" title={`Slot ID : ${props.obj.id}`}>
            {"0"+props.obj.allocValue}
          </button>
        </td>
    </>     
  );
}
