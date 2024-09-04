import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/usesDetailsSlice";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [users, setUsers] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Collecting user data in form object

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  //sending users data and calling createUser
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUser(users));
    navigate("/read");
  };
  return (
    <div>
      <h2 className="my-2">Fill the Data to Add user</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="male"
            type="radio"
            onChange={getUserData}
            required
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="female"
            type="radio"
            onChange={getUserData}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
