// Theme configuration for PlaceProAI
export const theme = {
  colors: {
    // Primary colors
    purple: '#8B5CF6',
    purpleDark: '#7C3AED',
    purpleLight: '#A78BFA',
    
    // Cyan accent
    cyan: '#06B6D4',
    cyanDark: '#0891B2',
    cyanLight: '#22D3EE',
    
    // Dark background
    dark: '#0F172A',
    darkCard: '#1E293B',
    darkCardHover: '#334155',
    darkBorder: '#334155',
    
    // Text
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    
    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
    gradientDark: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    gradientCard: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(139, 92, 246, 0.3)',
    glowCyan: '0 0 20px rgba(6, 182, 212, 0.3)',
  },
  
  transitions: {
    fast: 'all 0.15s ease-in-out',
    base: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
  
  zIndex: {
    hide: -1,
    base: 1,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
  },
};

export default theme;
