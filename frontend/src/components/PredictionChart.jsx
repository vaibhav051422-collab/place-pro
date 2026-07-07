import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PredictionChart.css';

export const PredictionChart = ({ data, title, type = 'line' }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].payload.label}</p>
          <p className="tooltip-value">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const chartComponent = type === 'area' ? (
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(203, 213, 225, 0.1)" />
      <XAxis dataKey="label" stroke="#94A3B8" />
      <YAxis stroke="#94A3B8" />
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke="#8B5CF6" 
        fillOpacity={1} 
        fill="url(#colorGradient)" 
      />
    </AreaChart>
  ) : (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(203, 213, 225, 0.1)" />
      <XAxis dataKey="label" stroke="#94A3B8" />
      <YAxis stroke="#94A3B8" />
      <Tooltip content={<CustomTooltip />} />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="url(#lineGradient)" 
        strokeWidth={3}
        dot={{ fill: '#8B5CF6', r: 5 }}
        activeDot={{ r: 7 }}
      />
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </LineChart>
  );

  return (
    <div className="prediction-chart">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        {chartComponent}
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
