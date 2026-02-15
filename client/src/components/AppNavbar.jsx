import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AppNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "16px", borderBottom: "1px solid #333" }}>
      <span style={{ fontWeight: "bold" }}>NetMorph</span>

      <button
        style={{ float: "right" }}
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AppNavbar;