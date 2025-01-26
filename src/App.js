import React, { useState } from "react";
import Navbar from "./Comonant/webPages/Navbar";
import NotesList from "./Comonant/webPages/NotesList";
import AddNoteForm from "./Comonant/webPages/AddNoteForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./Comonant/webPages/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Comonant/webPages/Sidebar.css";
import Home from "./Comonant/webPages/Home";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <button className="btn btn-danger toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? "<<" : ">>"}
      </button>
      <div className="container-fluid">
        <div className="row">
          {isSidebarOpen && (
            <div className="col-md-2">
              <SideBar />
            </div>
          )}
          <div className={isSidebarOpen ? "col-md-10" : "col-md-12"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/noteslist" element={<NotesList />} />
              <Route path="/addnotes" element={<AddNoteForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
