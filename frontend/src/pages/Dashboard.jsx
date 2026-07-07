import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import CompanyTable from "../components/CompanyTable";
import RoadmapCard from "../components/RoadmapCard";
import Button from "../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedDashboard = localStorage.getItem("dashboardData");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        setUser(null);
      }
    }

    if (storedDashboard) {
      try {
        setDashboardData(JSON.parse(storedDashboard));
      } catch (err) {
        setDashboardData(null);
      }
    }

    setLoading(false);
  }, []);

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const userName =
    user?.name || user?.full_name || user?.username || user?.email || "there";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const hasDashboardData = Boolean(dashboardData);

  const atsRuleBased = dashboardData?.ats_score?.rule_based?.overall;
  const atsMlScore = dashboardData?.ats_score?.ml_score;
  const placementScore = dashboardData?.placement?.placement_score;
  const companyMatches = dashboardData?.company_matches || [];
  const careerRoadmap = dashboardData?.career_roadmap;
  const resumeAnalysis = dashboardData?.resume_analysis;
  const parsedResume = dashboardData?.parsed_resume;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome, {userName}
          </h1>
          <p className="text-gray-500 mt-1">
            {hasDashboardData
              ? "Here is your latest placement readiness overview."
              : "Upload your resume to unlock ATS Score, Placement Prediction, Company Match and Career Roadmap."}
          </p>
        </div>

        {!hasDashboardData && (
          <SectionCard>
            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No Resume Uploaded Yet
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                Upload your resume to unlock ATS Score, Placement Prediction,
                Company Match and Career Roadmap.
              </p>
              <Button size="lg" onClick={handleUploadClick}>
                Upload Resume
              </Button>
            </div>
          </SectionCard>
        )}

        {hasDashboardData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="ATS Score (Rule Based)"
                value={
                  typeof atsRuleBased === "number" ? `${atsRuleBased}%` : "N/A"
                }
              />
              <StatCard
                title="ATS Score (ML Model)"
                value={typeof atsMlScore === "number" ? `${atsMlScore}%` : "N/A"}
              />
              <StatCard
                title="Placement Prediction"
                value={
                  typeof placementScore === "number"
                    ? `${placementScore}%`
                    : "N/A"
                }
              />
            </div>

            <div className="mb-8">
              <SectionCard title="Company Matches">
                {companyMatches.length > 0 ? (
                  <CompanyTable companies={companyMatches} />
                ) : (
                  <p className="text-gray-500 py-6 text-center">
                    No company matches available.
                  </p>
                )}
              </SectionCard>
            </div>

            <div className="mb-8">
              <SectionCard title="Career Roadmap">
                {careerRoadmap ? (
                  <RoadmapCard roadmap={careerRoadmap} />
                ) : (
                  <p className="text-gray-500 py-6 text-center">
                    No roadmap available.
                  </p>
                )}
              </SectionCard>
            </div>

            {resumeAnalysis && (
              <div className="mb-8">
                <SectionCard title="Resume Analysis">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {resumeAnalysis}
                  </p>
                </SectionCard>
              </div>
            )}

            {parsedResume && Object.keys(parsedResume).length > 0 && (
              <div className="mb-8">
                <SectionCard title="Parsed Resume Data">
                  <pre className="text-sm text-gray-700 bg-gray-100 rounded-md p-4 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(parsedResume, null, 2)}
                  </pre>
                </SectionCard>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="secondary" onClick={handleUploadClick}>
                Upload New Resume
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
