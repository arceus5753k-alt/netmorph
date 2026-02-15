import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path : "/login",
    element: <Login />
  },
  {
    path :"/dashboard",
    element:<Dashboard/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router = {router}/>
    </AuthProvider>
  </React.StrictMode>
);
