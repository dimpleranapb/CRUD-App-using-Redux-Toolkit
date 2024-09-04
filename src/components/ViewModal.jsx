import React, { useState } from "react";
import { useEffect } from "react";

export default function ViewModal({ id, setShowModal, users }) {
  const [currentUser, setCurrentUser] = useState(null);

  //to get the current user using id from user list
  useEffect(() => {
    const findUsers = () => {
      const currentUser = users.filter((user) => user.id === id);
      setCurrentUser(currentUser);
    };
    findUsers();
  }, []);

  return (
    <>
      <div
        className="modal show d-block" // Added 'show' and 'd-block' classes
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                User Info
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            {currentUser && (
              <div className="modal-body">
                <p>
                  <b>Name:</b> &nbsp; {currentUser[0].name}
                </p>
                <p>
                  <b>Email:</b> &nbsp; {currentUser[0].email}
                </p>
                <p>
                  <b>Age:</b> &nbsp; {currentUser[0].age}
                </p>
                <p>
                  <b>Gender:</b> &nbsp; {currentUser[0].gender}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
