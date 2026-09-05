function StatCard({
  title,
  value,
  subtitle,
  emoji
}) {

  return (

    <div className="glass-panel stat-card">

      <div className="stat-kicker">{emoji}</div>

      <h3 className="panel-title stat-title">{title}</h3>

      <h1 className="stat-value">
        {value}
      </h1>

      <p className="panel-subtitle stat-subtitle">{subtitle}</p>

    </div>

  );

}

export default StatCard;