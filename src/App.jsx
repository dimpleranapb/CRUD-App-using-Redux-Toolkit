import React from "react";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Read from "./components/Read";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Create />,
        },
        {
          path: "read",
          element: <Read />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
    </>
  );
}
