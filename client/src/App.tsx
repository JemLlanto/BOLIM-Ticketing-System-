import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Landing_Page } from "./pages/landing_page/Landing_Page";

import { Main_Layout } from "./main_layout/Main_Layout";

import { Dashboard } from "./pages/dashboard/Dashboard";
import { Home_Page } from "./pages/home_page/Home_Page";
import { Ticket_History } from "./pages/ticket_history/Ticket_History";
import { System_Manager } from "./pages/manage-system/System_Manager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing_Page />} />
      <Route element={<Main_Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home_Page />} />
        <Route path="/ticket-history" element={<Ticket_History />} />
        <Route path="/system-manager" element={<System_Manager />} />
      </Route>
      <Route path="*" />
    </Routes>
  );
}

export default App;
