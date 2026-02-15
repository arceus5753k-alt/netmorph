import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AppNavbar from "../components/AppNavbar";
import Rules from "./Rules";

const Dashboard = ()=>{
    const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/login");
        }
    },[isLoggedIn,navigate])

    return (
        <>
        <AppNavbar/>
        <Rules/>
        </>
    )
}
export default Dashboard;