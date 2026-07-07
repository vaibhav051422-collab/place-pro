import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import './CompanyTable.css';

export const CompanyTable = ({ companies = [], title = 'Top Company Matches' }) => {
  return (
    <motion.div
      className="company-table-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="table-header">
        <h3 className="table-title">{title}</h3>
        {companies.length > 0 && (
          <span className="table-count">{Math.min(5, companies.length)} matches</span>
        )}
      </div>

      <div className="table-wrapper">
        <table className="company-table">
          <thead>
            <tr>
              <th className="col-rank">Rank</th>
              <th className="col-company">Company</th>
              <th className="col-score">Match Score</th>
              <th className="col-trend">Trend</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty-row">
                  No companies to display
                </td>
              </tr>
            ) : (
              companies.slice(0, 5).map((company, index) => (
                <motion.tr
                  key={index}
                  className="company-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="col-rank">
                    <span className="rank-badge">{index + 1}</span>
                  </td>
                  <td className="col-company">
                    <div className="company-name">{company.company || company.name}</div>
                    <div className="company-meta">{company.role || 'Multiple roles'}</div>
                  </td>
                  <td className="col-score">
                    <div className="score-container">
                      <span className="score-value">{company.compatibility_score || company.score || 0}%</span>
                      <div className="score-bar">
                        <div
                          className="score-fill"
                          style={{
                            width: `${company.compatibility_score || company.score || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="col-trend">
                    <span className="trend-badge">
                      <TrendingUp size={14} />
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CompanyTable;