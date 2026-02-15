export default function Rules() {
  const rules = [
    { id: 1, name: "Rule One", enabled: true },
    { id: 2, name: "Rule Two", enabled: false },
    { id: 3, name: "Rule Three", enabled: true },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Rules</h2>

      {rules.map((rule) => (
        <div
          key={rule.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #444",
            marginTop: "10px",
          }}
        >
          <span>{rule.name}</span>
          <span>{rule.enabled ? "ON" : "OFF"}</span>
        </div>
      ))}

      <button style={{ marginTop: "20px" }}>
        Create Rule
      </button>
    </div>
  );
}