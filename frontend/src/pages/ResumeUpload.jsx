import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/ResumeUpload.css";

function ResumeUpload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [progress, setProgress] = useState(0);

    const uploadResume = async () => {

        if (!file) {

            alert("Please select a PDF.");

            return;

        }

        try {

            setLoading(true);

            setProgress(10);

            const formData = new FormData();

            formData.append("file", file);

            const token = localStorage.getItem("token");

            const timer = setInterval(() => {

                setProgress((old) => {

                    if (old >= 90) return old;

                    return old + 10;

                });

            }, 400);

            const res = await api.post(

                "/api/resume/upload",

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            clearInterval(timer);

            localStorage.setItem(
    "dashboardData",
    JSON.stringify(res.data)
);

localStorage.setItem(
    "atsReport",
    JSON.stringify(res.data)
);

            setTimeout(() => {

                navigate("/dashboard");

            }, 1000);

        }

        catch (err) {

            console.error(err);

            alert("Upload Failed");

            setLoading(false);

        }

    };

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="upload-container">

                    <h1 className="upload-title">

                        Upload Resume

                    </h1>

                    <p className="upload-subtitle">

                        Upload your latest resume and let AI analyze it.

                    </p>

                    <label className="upload-box">

                        <input

                            type="file"

                            accept=".pdf"

                            hidden

                            onChange={(e) =>

                                setFile(e.target.files[0])

                            }

                        />

                        <h2>

                            📄 Click to Select Resume

                        </h2>

                        <p>

                            PDF Only

                        </p>

                    </label>

                    {

                        file &&

                        <div className="file-name">

                            Selected:

                            {" "}

                            {file.name}

                        </div>

                    }

                    {

                        loading &&

                        <>

                            <div className="progress">

                                <div

                                    className="progress-fill"

                                    style={{

                                        width: `${progress}%`

                                    }}

                                />

                            </div>

                            <p>

                                {progress < 30 && "Uploading Resume..."}

                                {progress >= 30 && progress < 60 && "Parsing Resume..."}

                                {progress >= 60 && progress < 80 && "Running ML Model..."}

                                {progress >= 80 && progress < 100 && "Generating AI Analysis..."}

                                {progress === 100 && "Completed ✅"}

                            </p>

                        </>

                    }

                    <button

                        className="upload-btn"

                        disabled={loading}

                        onClick={uploadResume}

                    >

                        {

                            loading

                                ?

                                "Processing..."

                                :

                                "Upload Resume"

                        }

                    </button>

                </div>

            </div>

        </>

    );

}

export default ResumeUpload;