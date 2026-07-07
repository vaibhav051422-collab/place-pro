import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, RotateCw, Volume2, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { SectionCard, Button, Badge } from '../components';
import './InterviewPrep.css';

export const InterviewPrep = () => {
  const [questions] = useState([
    {
      id: 1,
      question: 'Tell me about yourself',
      category: 'Behavioral',
      difficulty: 'Easy',
      tips: ['Keep it concise (1-2 minutes)', 'Focus on relevant experience', 'End with interest in the role'],
      sampleAnswer: "I am a full-stack developer with 3+ years of experience in building scalable web applications using React and Node.js. At my current role, I have led the redesign of our main dashboard which improved performance by 40%. I'm passionate about writing clean code and mentoring junior developers.",
    },
    {
      id: 2,
      question: 'Explain your most challenging project',
      category: 'Behavioral',
      difficulty: 'Medium',
      tips: ['Use STAR method', 'Focus on your contribution', 'Highlight learnings'],
      sampleAnswer: "My most challenging project was migrating a monolithic application to microservices. The main challenge was managing database transactions across services. I implemented event sourcing and saga pattern, which reduced transaction failures from 2% to 0.1%. This project taught me the importance of architectural planning.",
    },
    {
      id: 3,
      question: 'Design a URL shortening service',
      category: 'System Design',
      difficulty: 'Hard',
      tips: ['Start with requirements', 'Discuss trade-offs', 'Consider scalability'],
      sampleAnswer: "I would start by clarifying requirements: 100M URLs daily, 1 billion short URLs served daily. The design would use a distributed system with: consistent hashing for load balancing, Redis for caching, MySQL for persistence, and a key generation service. I would also discuss availability vs consistency trade-offs.",
    },
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="interview-prep">
      <Navbar />

      <main className="prep-main">
        <motion.div
          className="prep-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="prep-title">Interview Preparation</h1>
          <p className="prep-subtitle">
            Practice with AI-powered interview questions and feedback
          </p>
        </motion.div>

        <div className="prep-container">
          <div className="questions-sidebar">
            <h3 className="sidebar-title">Questions</h3>
            <div className="questions-list">
              {questions.map((q) => (
                <motion.button
                  key={q.id}
                  className={`question-item ${selectedQuestion.id === q.id ? 'active' : ''}`}
                  onClick={() => setSelectedQuestion(q)}
                  whileHover={{ x: 5 }}
                >
                  <div className="question-text">{q.question}</div>
                  <Badge variant="primary" size="xs">{q.category}</Badge>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="prep-content">
            <SectionCard title={selectedQuestion.question} delay={0}>
              <div className="question-details">
                <div className="detail-row">
                  <span className="label">Category</span>
                  <Badge variant="info" size="md">{selectedQuestion.category}</Badge>
                </div>
                <div className="detail-row">
                  <span className="label">Difficulty</span>
                  <Badge 
                    variant={selectedQuestion.difficulty === 'Easy' ? 'success' : selectedQuestion.difficulty === 'Medium' ? 'warning' : 'error'} 
                    size="md"
                  >
                    {selectedQuestion.difficulty}
                  </Badge>
                </div>
              </div>

              <div className="tips-section">
                <h4 className="tips-title">Interview Tips</h4>
                {selectedQuestion.tips.map((tip, idx) => (
                  <div key={idx} className="tip-item">
                    <CheckCircle size={16} />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              <div className="sample-section">
                <h4 className="sample-title">Sample Answer</h4>
                <div className="sample-answer">
                  {selectedQuestion.sampleAnswer}
                </div>
              </div>

              <div className="practice-section">
                <h4 className="practice-title">Practice Your Answer</h4>
                <motion.button
                  className={`record-button ${isRecording ? 'recording' : ''}`}
                  onClick={() => setIsRecording(!isRecording)}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic size={24} />
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </motion.button>
                
                <div className="action-buttons">
                  <Button variant="primary" size="md">
                    <Volume2 size={16} />
                    Playback
                  </Button>
                  <Button variant="secondary" size="md">
                    <RotateCw size={16} />
                    Restart
                  </Button>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="prep-stats">
          {[
            { label: 'Questions Practiced', value: '24', icon: '📝' },
            { label: 'Interviews Completed', value: '5', icon: '✅' },
            { label: 'Accuracy Score', value: '87%', icon: '🎯' },
            { label: 'Average Duration', value: '2:45', icon: '⏱️' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="stat-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InterviewPrep;
