import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen text-white
      bg-[radial-gradient(circle_at_50%_30%,rgba(25,245,193,0.18),transparent_65%)]
      bg-[#070b12]">
      
      <Outlet />
    </div>
  );
}