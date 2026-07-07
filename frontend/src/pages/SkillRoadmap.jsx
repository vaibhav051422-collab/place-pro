import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Zap, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { SectionCard, ProgressRing, RoadmapCard, Button } from '../components';
import './SkillRoadmap.css';

export const SkillRoadmap = () => {
  const [roadmaps] = useState([
    {
      title: 'System Design Mastery',
      skills: ['Database Design', 'Scalability', 'Load Balancing', 'Caching'],
      duration: '4 weeks',
      difficulty: 'Advanced',
      completion: 60,
      week1: ['Learn CAP Theorem', 'Database Scaling', 'Sharding vs Replication'],
      week2: ['Load Balancers', 'Caching Strategies', 'Message Queues'],
      week3: ['Real-time Systems', 'Microservices', 'API Design'],
      week4: ['Mock Interviews', 'Project Implementation', 'Final Review'],
    },
    {
      title: 'Data Structures & Algorithms',
      skills: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
      duration: '6 weeks',
      difficulty: 'Hard',
      completion: 45,
      week1: ['Array Problems', 'String Manipulation', 'Sorting'],
      week2: ['Linked Lists', 'Stacks & Queues', 'Hashing'],
      week3: ['Trees', 'Binary Search', 'Recursion'],
      week4: ['Graphs', 'Dynamic Programming', 'Greedy Algorithms'],
    },
    {
      title: 'Full Stack Development',
      skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
      duration: '8 weeks',
      difficulty: 'Intermediate',
      completion: 75,
      week1: ['Frontend Setup', 'React Fundamentals', 'State Management'],
      week2: ['Backend Basics', 'Express.js', 'RESTful APIs'],
      week3: ['Database Design', 'MongoDB', 'Authentication'],
      week4: ['DevOps', 'Docker', 'Deployment'],
    },
  ]);

  return (
    <div className="skill-roadmap">
      <Navbar />

      <main className="roadmap-main">
        <motion.div
          className="roadmap-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="roadmap-title">Skill Roadmap</h1>
          <p className="roadmap-subtitle">
            Structured learning paths to master in-demand skills
          </p>
        </motion.div>

        <div className="roadmaps-grid">
          {roadmaps.map((roadmap, idx) => (
            <motion.div
              key={idx}
              className="roadmap-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <SectionCard delay={idx * 0.1}>
                <div className="roadmap-item-header">
                  <div>
                    <h3 className="item-title">{roadmap.title}</h3>
                    <div className="item-meta">
                      <span className="meta-item">
                        <Clock size={14} />
                        {roadmap.duration}
                      </span>
                      <span className={`difficulty ${roadmap.difficulty.toLowerCase()}`}>
                        {roadmap.difficulty}
                      </span>
                    </div>
                  </div>
                  <ProgressRing 
                    percentage={roadmap.completion} 
                    label="Progress"
                    size={100}
                  />
                </div>

                <div className="skills-preview">
                  <div className="skills-label">Skills Covered</div>
                  <div className="skills-tags">
                    {roadmap.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="item-details">
                  <div className="detail-row">
                    <span className="detail-label">Total Weeks</span>
                    <span className="detail-value">{roadmap.duration}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Difficulty</span>
                    <span className={`detail-value ${roadmap.difficulty.toLowerCase()}`}>
                      {roadmap.difficulty}
                    </span>
                  </div>
                </div>

                <div className="item-actions">
                  <Button variant="primary" size="sm">
                    Start Learning
                  </Button>
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </div>
              </SectionCard>

              <SectionCard delay={idx * 0.1 + 0.05}>
                <RoadmapCard roadmap={roadmap} title="Weekly Breakdown" />
              </SectionCard>
            </motion.div>
          ))}
        </div>

        <SectionCard title="Learning Resources" delay={0.5}>
          <div className="resources-grid">
            {[
              { icon: BookOpen, title: 'Documentation', count: '150+' },
              { icon: Zap, title: 'Coding Problems', count: '500+' },
              { icon: Target, title: 'Projects', count: '20+' },
              { icon: Clock, title: 'Mock Interviews', count: '50+' },
            ].map((resource, idx) => (
              <div key={idx} className="resource-card">
                <resource.icon size={32} className="resource-icon" />
                <h4 className="resource-title">{resource.title}</h4>
                <p className="resource-count">{resource.count}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </main>
    </div>
  );
};

export default SkillRoadmap;
