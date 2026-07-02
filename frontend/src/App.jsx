import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ResumeUpload from "./pages/ResumeUpload";
import ATSReport from "./pages/ATSReport";
import JobMatch from "./pages/JobMatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/report" element={<ATSReport />} />
        <Route path="/job-match" element={<JobMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;