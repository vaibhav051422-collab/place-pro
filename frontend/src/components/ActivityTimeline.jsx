import { motion } from 'framer-motion';
import './ActivityTimeline.css';

export const ActivityTimeline = ({ items }) => {
  return (
    <div className="activity-timeline">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="timeline-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={`timeline-marker ${item.type}`}>
            {item.icon && <item.icon size={16} />}
          </div>
          
          <div className="timeline-content">
            <div className="timeline-header">
              <h4 className="timeline-title">{item.title}</h4>
              <span className="timeline-time">{item.time}</span>
            </div>
            {item.description && (
              <p className="timeline-description">{item.description}</p>
            )}
            {item.badge && (
              <span className={`timeline-badge ${item.badge.type}`}>
                {item.badge.label}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
