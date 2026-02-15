import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {login,isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <h1>Login Page</h1>
      <button onClick={() => {
        login();
        navigate("/dashboard");
      }}>Login</button>
    </>
  );
};
export default Login;