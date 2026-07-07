import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './RoadmapCard.css';

export const RoadmapCard = ({ roadmap = {}, title = 'AI Career Roadmap' }) => {
  const weeks = ['week1', 'week2', 'week3', 'week4'];

  return (
    <div className="roadmap-card">
      <div className="roadmap-header">
        <h3 className="roadmap-title">{title}</h3>
        {roadmap.summary && (
          <p className="roadmap-summary">{roadmap.summary}</p>
        )}
      </div>

      <div className="roadmap-weeks">
        {weeks.map((week, weekIndex) => (
          <motion.div
            key={week}
            className="roadmap-week"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: weekIndex * 0.1 }}
          >
            <div className="week-header">
              <h4 className="week-title">{week.toUpperCase().replace('WEEK', 'Week ')}</h4>
              <span className="week-number">{weekIndex + 1}</span>
            </div>

            <div className="week-items">
              {(roadmap[week] || []).map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className="week-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: weekIndex * 0.1 + itemIndex * 0.05 }}
                >
                  <ChevronRight size={14} className="item-icon" />
                  <span className="item-text">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;