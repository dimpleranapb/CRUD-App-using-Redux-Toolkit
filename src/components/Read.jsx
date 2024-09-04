import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/usesDetailsSlice";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ViewModal from "./ViewModal";
import FormModal from "./FormModal";
// import { notify } from "../features/usesDetailsSlice";
import { notification } from "../utils/notification";
export default function Read() {
  const dispatch = useDispatch();
  const { users, loading, error, filteredList } = useSelector(
    (state) => state.app
  );

  //States
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    dispatch(showUser());
  }, []);

  //Button click handlers

  //View Button Handler
  const viewHandler = (id) => {
    setShowModal(true);
    setId(id);
  };

  //Edit Button handler

  const editHandler = (id) => {
    setEditModal(true);
    setId(id);
  };

  //Delete Button handler
  const deleteHandler = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(showUser());
    notification("User Deleted Successfully", "success");
  };

  // Loading
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClimbingBoxLoader />
      </div>
    );
  }

  //if no data
  if (users.length == 0) {
    return <h2>No users Found</h2>;
  }

  return (
    <>
      <div>
        <h2>All data</h2>
        {showModal && (
          <ViewModal id={id} setShowModal={setShowModal} users={users} />
        )}
        {editModal && (
          <FormModal id={id} setEditModal={setEditModal} users={users} />
        )}
        {filteredList.map((element) => {
          return (
            <div className="m-3" key={element.id}>
              <div className="card w-50 mx-auto">
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <p className="card-text">{element.email}</p>
                  <p className="card-text">{element.age}</p>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => viewHandler(element.id)}
                  >
                    View
                  </button>
                  <button
                    onClick={() => editHandler(element.id)}
                    className="btn btn-primary mx-2"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => deleteHandler(element.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
