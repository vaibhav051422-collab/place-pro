function StatCard({
  title,
  value,
  subtitle,
  emoji
}) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        textAlign: "center",
        flex: 1
      }}
    >

      <h3>{emoji} {title}</h3>

      <h1
        style={{
          color: "#2563EB"
        }}
      >
        {value}
      </h1>

      <p>{subtitle}</p>

    </div>

  );

}

export default StatCard;