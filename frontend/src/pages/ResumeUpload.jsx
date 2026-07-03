import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      console.log("Sending Token:", token);

      const res = await api.post(
        "/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success:", res.data);

      // Save complete ATS report
      localStorage.setItem(
        "atsReport",
        JSON.stringify(res.data)
      );

      // Redirect to ATS Report page
      window.location.href = "/report";

    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);
      console.error(err);

      alert("Upload Failed");
    }
  };

  return (
        <>
        <Navbar />
     <div style={{ padding: "40px" }}>
      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadResume}>
        Upload Resume
      </button>
    </div>
    </>
  );
}

export default ResumeUpload;