import React from "react";

export const UserCard = ({user}) => {
   
    const {firstName, lastName, photoUrl, age, Gender,about } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={user.photoUrl}
            alt="Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && Gender && <p> {age + ", " + Gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ingnore</button>
            <button className="btn btn-secondary">Accepted</button>
          </div>
        </div>
      </div>
    </div>
  );
};
