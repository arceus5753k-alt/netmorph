import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const navigate  = useNavigate();
    return (
        <>
        <h1>Login Page</h1>
        <button onClick={()=>navigate("/dashboard")}>Login</button>
        </>
    )
}
export default Login;