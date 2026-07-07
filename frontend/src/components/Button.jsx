import { motion } from 'framer-motion';
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <motion.button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {loading ? 'Loading...' : children}
    </motion.button>
  );
};

export default Button;
