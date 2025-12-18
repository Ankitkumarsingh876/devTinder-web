import axiosInstance from "../utils/axiosInstance";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

 export const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const {_id, firstName, lastName, photoURL , age, Gender, about } = user;
  const handleSendRequest = async (status,userId) => {

    try{
      const res = await axiosInstance.post(BASE_URL+ "/request/send/" + status + "/" + userId, {},{
        withCredentials: true,
      });
      dispatch(removeUserFromFeed(userId));

    }catch(err){
      //will be handle over here.
    }
  }
  return (
    <div>
      <div className="card bg-base-300 w-full h-[480px] shadow-xl">
        <figure>
          <img src={user.photoURL} alt="Photo" className="h-64 w-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && Gender && <p> {age + ", " + Gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ingnored", _id)}>Ingnore</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interest", _id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

