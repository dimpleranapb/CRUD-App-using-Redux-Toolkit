import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showFilteredList } from "../features/usesDetailsSlice";
import { useLocation } from 'react-router-dom';



export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();


  const allUsers = useSelector((state) => state.app.users);

  const searchHandler = (e) => {
    let searchResult = allUsers.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(showFilteredList(searchResult))
  };



  return (
    <>
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="container-fluid ">
            <h4 className="navbar-brand"> <Link to="/" className="nav-link">
                    CRUD APP
                  </Link></h4>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Create User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="read">
                    All Users {allUsers.length}
                  </Link>
                </li>
              </ul>
              {location.pathname ==="/read"?<input
                className="form-control me-2 w-50"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchHandler}
              />:null}
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
