import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (err) {
      //handle here.
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="flex justify-center py-10">No connection founds!!</h1>;

  return (
    <div className="text-center my-10 ">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoURL, age, Gender, about } =
          connection;

        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto items-center">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoURL} />
            </div>
            <div className="ml-4 text-center w-full">
              <h2 className="font-bold  text-xl">{firstName + " " + lastName}</h2>
              {age && Gender && <p>{age + " " + Gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
