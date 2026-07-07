import './Badge.css';

export const Badge = ({ children, variant = 'primary', size = 'md' }) => {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {children}
    </span>
  );
};

export default Badge;
