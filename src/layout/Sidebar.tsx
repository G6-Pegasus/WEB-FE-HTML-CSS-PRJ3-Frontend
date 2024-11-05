import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Sidebar for large screens */}
      <div
        className={`hidden md:flex flex-col bg-blue-800 text-white transition-all duration-300 ${
          isHovered ? "w-64 items-start" : "w-16 items-center"
        } h-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className={`py-6 font-semibold text-lg transition-all duration-300 ${isHovered ? "text-center w-full" : "text-center"}`}>WMS</div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-4 mt-6 w-full">
          <Link
            to="/"
            className={`flex items-center p-3 hover:bg-blue-700 transition-all duration-300 ${
              isHovered ? "justify-start space-x-3" : "justify-center"
            }`}
          >
            <DashboardIcon />
            {isHovered && <span className="text-sm">Dashboard</span>}
          </Link>
          <Link
            to="/followUps"
            className={`flex items-center p-3 hover:bg-blue-700 transition-all duration-300 ${
              isHovered ? "justify-start space-x-3" : "justify-center"
            }`}
          >
            <ListIcon />
            {isHovered && <span className="text-sm">FollowUps</span>}
          </Link>
          <Link
            to="/opportunities"
            className={`flex items-center p-3 hover:bg-blue-700 transition-all duration-300 ${
              isHovered ? "justify-start space-x-3" : "justify-center"
            }`}
          >
            <TrendingUpIcon />
            {isHovered && <span className="text-sm">Opportunities</span>}
          </Link>
          <Link
            to="/customers"
            className={`flex items-center p-3 hover:bg-blue-700 transition-all duration-300 ${
              isHovered ? "justify-start space-x-3" : "justify-center"
            }`}
          >
            <PeopleIcon />
            {isHovered && <span className="text-sm">Customers</span>}
          </Link>
        </nav>
      </div>

      {/* Bottom Navigation for mobile screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-800 text-white flex justify-around py-2">
        <Link to="/dashboard" className="flex flex-col items-center">
          <DashboardIcon fontSize="small" />
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link to="/followups" className="flex flex-col items-center">
          <ListIcon fontSize="small" />
          <span className="text-xs">FollowUps</span>
        </Link>
        <Link to="/opportunities" className="flex flex-col items-center">
          <TrendingUpIcon fontSize="small" />
          <span className="text-xs">Opportunities</span>
        </Link>
        <Link to="/customers" className="flex flex-col items-center">
          <PeopleIcon fontSize="small" />
          <span className="text-xs">Customers</span>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;