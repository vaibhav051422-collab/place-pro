import { motion } from 'framer-motion';
import './SectionCard.css';

export const SectionCard = ({ title, subtitle, children, action, delay = 0 }) => {
  return (
    <motion.div
      className="section-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="section-header">
        <div>
          <h3 className="section-title">{title}</h3>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        {action && <div className="section-action">{action}</div>}
      </div>
      
      <div className="section-content">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionCard;