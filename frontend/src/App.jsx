import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CareerMatch from "./pages/CareerMatch";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResumeUpload from "./pages/ResumeUpload";
import ATSReport from "./pages/ATSReport";
import JobMatch from "./pages/JobMatch";

function App() {
  return (
    <BrowserRouter>
  <Routes>

  <Route path="/career-match" element={<CareerMatch />} />
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />

  <Route path="/upload" element={<ResumeUpload />} />

  <Route path="/report" element={<ATSReport />} />
  <Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/upload" element={<ResumeUpload />} />
  <Route path="/job-match" element={<JobMatch />} />

</Routes>
    </BrowserRouter>
  );
}

export default App;