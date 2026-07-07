import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Brain, Users, Award, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import { StatCard, SectionCard, ProgressRing, PredictionChart, CompanyTable, ActivityTimeline, SkillList, RoadmapCard, Button } from '../components';
import './Dashboard.css';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    placement: 82,
    resume: 78,
    coding: 85,
    aptitude: 72,
    communication: 88,
  });

  const [chartData] = useState([
    { label: 'Week 1', value: 65 },
    { label: 'Week 2', value: 72 },
    { label: 'Week 3', value: 78 },
    { label: 'Week 4', value: 82 },
  ]);

  const [companies] = useState([
    { company: 'Google', score: 92, role: 'Software Engineer' },
    { company: 'Microsoft', score: 88, role: 'Cloud Architect' },
    { company: 'Amazon', score: 85, role: 'Backend Engineer' },
    { company: 'Meta', score: 83, role: 'Full Stack Engineer' },
    { company: 'Apple', score: 80, role: 'iOS Developer' },
  ]);

  const [skills] = useState([
    'React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB', 'TypeScript'
  ]);

  const [roadmap] = useState({
    summary: 'Complete this roadmap to improve your placement chances by 25%',
    week1: ['Learn System Design', 'Practice LeetCode Hard', 'Study DBMS'],
    week2: ['Build a Full-Stack Project', 'Practice SQL', 'Behavioral Interview Prep'],
    week3: ['Solve Design Patterns', 'Mock Interviews', 'Resume Polish'],
    week4: ['Company Specific Prep', 'Final Review', 'Interview Day'],
  });

  const [timeline] = useState([
    { 
      title: 'Resume Updated', 
      time: '2 hours ago', 
      type: 'info',
      description: 'Your resume has been successfully analyzed',
      badge: { type: 'success', label: 'Score: 8.2/10' }
    },
    { 
      title: 'Coding Assessment Complete', 
      time: '1 day ago',
      type: 'success',
      description: 'You completed 5 coding problems',
      badge: { type: 'success', label: 'Passed' }
    },
    { 
      title: 'Company Match Updated', 
      time: '2 days ago',
      type: 'warning',
      description: 'New matching companies found based on your profile',
      badge: { type: 'info', label: '3 New' }
    },
    { 
      title: 'Interview Scheduled', 
      time: '5 days ago',
      type: 'success',
      description: 'Interview with Microsoft scheduled for next week',
      badge: { type: 'success', label: 'Confirmed' }
    },
  ]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="dashboard-main">
        <motion.div
          className="dashboard-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome Back, <span className="gradient-text">{user?.name || 'Developer'}</span>
            </h1>
            <p className="hero-subtitle">
              Your AI-powered career assistant is ready to help you land your dream job
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <Award size={24} />
              <div>
                <div className="stat-value">92%</div>
                <div className="stat-label">Profile Strength</div>
              </div>
            </div>
            <div className="hero-stat">
              <TrendingUp size={24} />
              <div>
                <div className="stat-value">+15%</div>
                <div className="stat-label">This Month</div>
              </div>
            </div>
          </div>
        </motion.div>

        <section className="dashboard-section">
          <h2 className="section-label">Your Metrics</h2>
          <div className="stats-grid">
            <StatCard 
              icon={TrendingUp}
              label="Placement Probability"
              value={stats.placement}
              change={12}
              trend="up"
              delay={0}
            />
            <StatCard 
              icon={Target}
              label="Resume Score"
              value={stats.resume}
              change={8}
              trend="up"
              delay={0.1}
            />
            <StatCard 
              icon={Zap}
              label="Coding Score"
              value={stats.coding}
              change={15}
              trend="up"
              delay={0.2}
            />
            <StatCard 
              icon={Brain}
              label="Aptitude Score"
              value={stats.aptitude}
              change={5}
              trend="up"
              delay={0.3}
            />
            <StatCard 
              icon={Users}
              label="Communication"
              value={stats.communication}
              change={20}
              trend="up"
              delay={0.4}
            />
          </div>
        </section>

        <section className="dashboard-grid">
          <SectionCard title="Placement Probability" subtitle="Your chances of getting selected" delay={0.2}>
            <div className="progress-rings">
              <ProgressRing percentage={stats.placement} label="Overall" size={140} />
            </div>
            <PredictionChart data={chartData} type="area" />
          </SectionCard>

          <SectionCard title="Top Companies" subtitle="Best matches for your profile" delay={0.3}>
            <CompanyTable companies={companies} />
          </SectionCard>
        </section>

        <section className="dashboard-grid">
          <SectionCard title="Your Skills" subtitle="Skills on your profile" delay={0.4}>
            <SkillList title="Technical Skills" skills={skills} proficiency={[85, 90, 88, 92, 80, 78, 88, 85]} />
          </SectionCard>

          <SectionCard title="Career Roadmap" subtitle="4-week improvement plan" delay={0.5}>
            <RoadmapCard roadmap={roadmap} />
          </SectionCard>
        </section>

        <section className="dashboard-section">
          <h2 className="section-label">Weekly Goals</h2>
          <div className="goals-grid">
            {[
              { icon: Zap, title: 'Solve 10 Coding Problems', progress: 65, total: 10 },
              { icon: Brain, title: 'Complete System Design Module', progress: 30, total: 10 },
              { icon: Target, title: 'Update Resume', progress: 100, total: 1 },
              { icon: Users, title: 'Network with 5 Professionals', progress: 20, total: 5 },
            ].map((goal, idx) => (
              <SectionCard key={idx} delay={0.4 + idx * 0.1}>
                <div className="goal-item">
                  <goal.icon size={24} />
                  <div className="goal-content">
                    <h4 className="goal-title">{goal.title}</h4>
                    <div className="goal-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(goal.progress / goal.total) * 100}%` }} />
                      </div>
                      <span className="progress-text">{goal.progress}/{goal.total}</span>
                    </div>
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-label">Recent Activity</h2>
          <SectionCard delay={0.5}>
            <ActivityTimeline items={timeline} />
          </SectionCard>
        </section>

        <section className="dashboard-cta">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="cta-content">
              <h3>Ready for Your Next Step?</h3>
              <p>Start your interview preparation and boost your chances of success</p>
            </div>
            <Button variant="primary" size="lg">
              Start Preparation
            </Button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;