import axiosInstance from "../utils/axiosInstance";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axiosInstance.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(_id));

    } catch (err) {
      //will be handle herer.
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axiosInstance.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      //will be handle herer.
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Request founds!!</h1>;

  return (
    <div className="text-center my-10 ">
      <h1 className="text-bold text-white text-3xl">Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, Gender, about } =
          request.formUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoURL}
              />
            </div>
            <div>
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && Gender && <p>{age + ", " + Gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
