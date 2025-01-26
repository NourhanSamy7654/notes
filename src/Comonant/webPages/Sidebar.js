import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/noteslist" ? "active" : ""
            }`}
            to="/noteslist"
          >
            Notes List
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/addnotes" ? "active" : ""
            }`}
            to="/addnotes"
          >
            Add Note
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
