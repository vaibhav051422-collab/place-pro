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

        <div style={{padding:"40px"}}>

        <h1>Career Match Analyzer</h1>

        <br/>

        <select
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

        <button
        onClick={analyze}
        style={{marginLeft:"20px"}}
        >

        Analyze

        </button>

        {
            result && (

                <div
                style={{
                    marginTop:"40px"
                }}
                >

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

                    <ul>

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

                    <ul>

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

        </>

    );

}

export default CareerMatch;