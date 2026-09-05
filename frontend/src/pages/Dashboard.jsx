import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import CompanyTable from "../components/CompanyTable";
import RoadmapCard from "../components/RoadmapCard";
import SkillList from "../components/SkillList";

import "../styles/Dashboard.css";

import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const dashboardData = JSON.parse(
        localStorage.getItem("dashboardData")
    );

    if (!dashboardData) {

        return (

            <>
                <Navbar />

                <div className="dashboard-shell dashboard">

                    <div className="dashboard-grid-bg" />

                    <h1 className="dashboard-title">No Resume Analysis Found</h1>

                    <p className="dashboard-sub">Please upload your resume first.</p>

                    <button
                        className="action-btn"
                        onClick={() => navigate("/upload")}
                    >
                        Upload Resume
                    </button>

                </div>

            </>

        );

    }

    const {
        parsed_resume,
        ats_score,
        placement,
        company_matches,
        resume_analysis,
        career_roadmap
    } = dashboardData;

    const bestCompany =
        company_matches.length > 0
            ? company_matches[0]
            : null;

    return (

        <>

            <Navbar />

            <div className="dashboard-shell dashboard">

                <div className="dashboard-grid-bg" />

                <h1 className="dashboard-title">
                    Welcome Back 👋
                </h1>

                <p className="dashboard-sub">
                    AI Powered Placement Dashboard
                </p>

                <div className="grid">

                    <StatCard
                        emoji="📄"
                        title="Resume"
                        value="Uploaded"
                        subtitle={parsed_resume.name}
                    />

                    <StatCard
                  emoji="📊"
                      title="Rule ATS"
                      value={ats_score?.overall || 0}
                    subtitle="/100"
                    />

                    <StatCard
    emoji="🤖"
    title="ML ATS"
    value={ats_score?.ml_score || 0}
    subtitle="/100"
        />

                    <StatCard
                        emoji="🎯"
                        title="Placement"
                        value={`${placement.placement_score}%`}
                        subtitle="Readiness"
                    />

                </div>

                {bestCompany && (

                    <SectionCard title="🏆 Best Company Match">

                        <h2>

                            {bestCompany.company}

                        </h2>

                        <h1>

                            {bestCompany.compatibility_score}%

                        </h1>

                        <p>

                            {bestCompany.compatibility_level}

                        </p>

                    </SectionCard>

                )}

                <SectionCard title="🧠 AI Resume Summary">

                    <p className="summary">

                        {resume_analysis.suggested_summary}

                    </p>

                </SectionCard>

                <div className="grid">

                    <SkillList

                        title="💪 Strengths"

                        skills={resume_analysis.strengths}

                        color="green"

                    />

                    <SkillList

                        title="⚠ Weaknesses"

                        skills={resume_analysis.weaknesses}

                        color="red"

                    />

                </div>

                <SectionCard title="🚀 Recommended Skills">

                    {

                        resume_analysis.recommended_skills.map(

                            (skill, index) => (

                                <span
                                    key={index}
                                    className="skill"
                                >
                                    {skill}
                                </span>

                            )

                        )

                    }

                </SectionCard>

                <CompanyTable
                    companies={company_matches}
                />

                <RoadmapCard
                    roadmap={career_roadmap}
                />

                <SectionCard title="⚡ Quick Actions">

                    <div className="actions">

                        <button
                            className="action-btn"
                            onClick={() => navigate("/upload")}
                        >
                            Upload Resume
                        </button>

                        <button
                            className="action-btn"
                            onClick={() => window.print()}
                        >
                            Download Report
                        </button>

                        <button
                            className="action-btn"
                            onClick={() => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("dashboardData");
    localStorage.removeItem("atsReport");

    navigate("/");

}}
                        >
                            Logout
                        </button>

                    </div>

                </SectionCard>

            </div>

        </>

    );

}

export default Dashboard;