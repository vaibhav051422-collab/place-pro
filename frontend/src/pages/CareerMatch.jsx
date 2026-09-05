import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function CareerMatch() {

    const report = JSON.parse(localStorage.getItem("atsReport"));

    const skills = report?.parsed_resume?.skills || [];

    const [company, setCompany] = useState("amazon");
    const [result, setResult] = useState(null);

    const analyze = async () => {

        try{

            const token = localStorage.getItem("token");

            const res = await api.post(
                "/api/company/company-match",
                {
                    company,
                    resume_skills: skills
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setResult(res.data);

        }

        catch(err){

            console.log(err);

            alert("Analysis Failed");

        }

    };

    return(

        <>
        <Navbar/>

        <div className="career-page page-shell">

        <div className="career-grid-bg" />

        <div className="glass-panel section-card career-card">

        <h1 className="career-title">Career Match Analyzer</h1>

        <p className="career-subtitle">Compare your resume skills against company requirements.</p>

        <select
        className="career-select"
        value={company}
        onChange={(e)=>setCompany(e.target.value)}
        >

            <option value="amazon">Amazon</option>

            <option value="google">Google</option>

            <option value="microsoft">Microsoft</option>

            <option value="flipkart">Flipkart</option>

            <option value="tcs">TCS</option>

            <option value="infosys">Infosys</option>

            <option value="accenture">Accenture</option>

        </select>

        <button className="analyse-btn" onClick={analyze}>

        Analyze

        </button>

        {
            result && (

                <div className="section-card glass-panel" style={{ marginTop: "28px" }}>

                    <h2>

                        {result.company}

                    </h2>

                    <h3>

                        Compatibility Score

                    </h3>

                    <h1>

                        {result.compatibility_score}%

                    </h1>

                    <h3>

                        {result.compatibility_level}

                    </h3>

                    <hr/>

                    <h3>

                        Matched Skills

                    </h3>

                    <ul className="skill-list">

                        {

                            result.matched_skills.map((skill,index)=>

                            <li key={index}>

                                ✅ {skill}

                            </li>

                            )

                        }

                    </ul>

                    <h3>

                        Missing Skills

                    </h3>

                    <ul className="skill-list">

                        {

                            result.missing_skills.map((skill,index)=>

                            <li key={index}>

                                ❌ {skill}

                            </li>

                            )

                        }

                    </ul>

                </div>

            )
        }

        </div>
        </div>

        </>

    );

}

export default CareerMatch;