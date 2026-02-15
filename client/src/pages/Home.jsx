import { useContext, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { SiPhosphoricons } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isLoggedIn,logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
  if (isLoggedIn) {
    navigate("/dashboard");
  }
}, [isLoggedIn, navigate]);
  return (
    <>
      
      <nav className="w-full flex items-center justify-between px-14 py-6 text-white">
        
        <div className="flex items-center gap-3 cursor-pointer">
          <SiPhosphoricons className="text-3xl text-teal-400" />
          <div className="text-2xl font-semibold tracking-wide">
            NetMorph
          </div>
        </div>

       
        <div className="flex items-center gap-10 text-gray-300 text-sm">
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition">
            Features <IoMdArrowDropdown className="text-sm" />
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition">
            How it works <IoMdArrowDropdown className="text-sm" />
          </div>

          <div className="cursor-pointer hover:text-white transition">
            Docs
          </div>
        </div>

       
        <div className="flex items-center gap-6">
          {!isLoggedIn && (
            <div className="text-gray-300 cursor-pointer hover:text-white transition">
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          )}

          {isLoggedIn && (
            <div className="text-gray-300 cursor-pointer hover:text-white transition">
              <button onClick={() => logout()}>Logout</button>
            </div>
          )}

          <div className="bg-teal-400 text-black px-6 py-2 rounded-lg font-semibold cursor-pointer shadow-lg shadow-teal-400/30 hover:shadow-teal-400/50 transition">
            <button onClick={() => navigate("/login")}>Get Started</button>
          </div>
        </div>
      </nav>

     
      <div className="relative flex flex-col items-center justify-center text-center mt-36 px-6">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Morph Any HTTP Request. <br /> In Real Time.
        </h1>

        <p className="text-gray-400 max-w-2xl mb-10 text-lg">
          Intercept, inspect, modify and replay network traffic directly from
          your browser.
        </p>
        {!isLoggedIn && (
          <button   onClick ={() =>navigate("/login")}  className="bg-teal-400 text-black px-8 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-teal-400/40 hover:shadow-teal-400/60 transition">
            Get Started
          </button>
        )}
       
        <div className="absolute w-225 h-87.5 bg-teal-400/20 blur-[140px] -z-10 top-105" />

       
        <div className="mt-24 w-250 max-w-full">
          <div className="bg-white/5 border border-teal-400/30 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-teal-400/20 p-8">
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

          
            <div className="text-left text-gray-300 space-y-3">
              <div className="bg-black/40 p-3 rounded-lg">
                GET /api/users
              </div>
              <div className="bg-black/40 p-3 rounded-lg">
                Status: 200 OK
              </div>
              <div className="bg-black/40 p-3 rounded-lg">
                Headers • Body • Response
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}