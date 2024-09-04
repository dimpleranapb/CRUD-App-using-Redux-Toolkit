import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { editUser, showUser } from "../features/usesDetailsSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { notification } from "../utils/notification";
export default function FormModal({ id, setEditModal, users }) {
  const [user, setUser] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  const navigate = useNavigate();

  //to get the current user using id from user list
  useEffect(() => {
    const findUsers = () => {
      const currentUser = users.find((user) => user.id === id);
      setCurrentUserInfo(currentUser);

      setUser(currentUser);
    };
    findUsers();
  }, []);
  const dispatch = useDispatch();

  //Collecting user data in form object
  const getUserData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //sending user data and calling edit editUser
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editUser(user));
    setEditModal(false);
    dispatch(showUser());
    notification("User Edited Successfully", "success");
  };

  return (
    <>
      <div
        className="modal show d-block" // Added 'show' and 'd-block' classes so that modal always show
        id="exampleModal"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit User Info
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditModal(false)}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {user && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      onChange={getUserData}
                      value={user.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={getUserData}
                      value={user.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      Age:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="age"
                      name="age"
                      onChange={getUserData}
                      value={user.age}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-check-input"
                      name="gender"
                      value="male"
                      id="male1"
                      type="radio"
                      onChange={getUserData}
                      checked={user.gender == "male" ? true : false}
                    />
                    <label className="form-check-label" htmlFor="male1">
                      Male
                    </label>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-check-input"
                      name="gender"
                      value="female"
                      id="female"
                      onChange={getUserData}
                      type="radio"
                      checked={user.gender == "female" ? true : false}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
