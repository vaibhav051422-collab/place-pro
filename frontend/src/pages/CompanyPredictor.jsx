import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import { SectionCard, CompanyTable, PredictionChart, Badge, Button } from '../components';
import './CompanyPredictor.css';

export const CompanyPredictor = () => {
  const [matchedCompanies] = useState([
    {
      company: 'Google',
      compatibility_score: 92,
      reasons: ['Strong system design skills', 'Competitive interview ready', 'Relevant experience'],
      salaryRange: '$150K - $250K',
      rolesAvailable: 5,
    },
    {
      company: 'Microsoft',
      compatibility_score: 88,
      reasons: ['Cloud infrastructure knowledge', 'Good communication', 'Leadership potential'],
      salaryRange: '$140K - $230K',
      rolesAvailable: 8,
    },
    {
      company: 'Amazon',
      compatibility_score: 85,
      reasons: ['Scalability mindset', 'Data structure expertise', 'Growth focused'],
      salaryRange: '$130K - $210K',
      rolesAvailable: 12,
    },
  ]);

  const [chartData] = useState([
    { label: 'Google', value: 92 },
    { label: 'Microsoft', value: 88 },
    { label: 'Amazon', value: 85 },
    { label: 'Meta', value: 83 },
    { label: 'Apple', value: 80 },
  ]);

  return (
    <div className="company-predictor">
      <Navbar />

      <main className="predictor-main">
        <motion.div
          className="predictor-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="predictor-title">Company Predictor</h1>
          <p className="predictor-subtitle">
            AI-powered company matching based on your profile and skills
          </p>
        </motion.div>

        <section className="predictor-section">
          <SectionCard title="Compatibility Overview" delay={0}>
            <PredictionChart data={chartData} type="line" />
          </SectionCard>
        </section>

        <section className="predictor-section">
          <h2 className="section-title">Your Top Matches</h2>

          <div className="companies-list">
            {matchedCompanies.map((company, idx) => (
              <motion.div
                key={idx}
                className="company-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="company-header">
                  <div className="company-info">
                    <Building2 size={32} className="company-icon" />
                    <div>
                      <h3 className="company-name">{company.company}</h3>
                      <p className="company-roles">{company.rolesAvailable} roles available</p>
                    </div>
                  </div>
                  <div className="company-score">
                    <div className="score-value">{company.compatibility_score}%</div>
                    <div className="score-label">Match</div>
                  </div>
                </div>

                <div className="company-body">
                  <div className="reasons">
                    <h4>Why You're a Great Fit</h4>
                    {company.reasons.map((reason, i) => (
                      <div key={i} className="reason-item">
                        <Award size={14} />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="salary-info">
                    <div>
                      <span className="label">Salary Range</span>
                      <p className="value">{company.salaryRange}</p>
                    </div>
                    <Badge variant="success" size="md">
                      High Match
                    </Badge>
                  </div>
                </div>

                <div className="company-actions">
                  <Button variant="primary" size="sm">
                    Explore Roles
                  </Button>
                  <Button variant="secondary" size="sm">
                    Save Company
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="predictor-section">
          <SectionCard title="Detailed Company Comparison" delay={0.4}>
            <CompanyTable companies={matchedCompanies} />
          </SectionCard>
        </section>

        <section className="predictor-section">
          <div className="cta-container">
            <h3>Ready to Apply?</h3>
            <p>Start your interview preparation with our AI assistant</p>
            <Button variant="primary" size="lg">
              Begin Interview Prep
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyPredictor;
