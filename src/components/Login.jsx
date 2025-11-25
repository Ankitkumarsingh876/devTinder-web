import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("donald@gmail.com");
  const [Password, setPassword] = useState("Donald123@");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const[isLoginForm, setLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password: Password,
        },
        {
          withCredentials: true,
        }
      );
      
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || " something went wrong")
      
    }
  };

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL+ "/signup",{
        firstName,
        lastName,
        email:emailId,
        password:Password,
      },{withCredentials:true},)
      dispatch(addUser(res.data.data));
      return navigate("/profile");

    }catch(err){
      setError(err?.response?.data || " something went wrong");
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm? "Login": "Sign up"}</h2>
          <div>
            {!isLoginForm &&(
             <>
             <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
             <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            </>)}
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={Password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-2" onClick={isLoginForm? handleLogin : handleSignUp}>
              {isLoginForm? "Login": "Sign up"}
            </button>
          </div>
          <p className="m-auto cursor-pointer py-2"  onClick={() => setLoginForm((value) => !value)}>{isLoginForm? "New user? SignUp here": "Existing User? Login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
