import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './SkillList.css';

export const SkillList = ({ title, skills = [], proficiency = [] }) => {
  return (
    <div className="skill-list">
      <h3 className="skill-list-title">{title}</h3>
      
      <div className="skill-items">
        {skills.length === 0 ? (
          <p className="skill-empty">No skills added yet</p>
        ) : (
          skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CheckCircle size={16} className="skill-icon" />
              <span className="skill-name">{skill}</span>
              {proficiency[index] && (
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${proficiency[index]}%` }}
                  />
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillList;