import { useEffect, useState } from "react";

export default function Rules() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/rules")
      .then((res) => res.json())
      .then((data) => {
        setRules(data);
      })
      .catch((err) => console.error("Error fetching rules:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Rules</h2>

      {rules.length === 0 ? (
        <p>No rules found</p>
      ) : (
        rules.map((rule) => (
          <div
            key={rule._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              border: "1px solid #444",
              marginTop: "10px",
            }}
          >
            <div>
              <div><b>{rule.method}</b> {rule.endpoint}</div>
              <div>Status Code: {rule.statusCode}</div>
            </div>

            <span>{rule.enabled ? "ON" : "OFF"}</span>
          </div>
        ))
      )}

      <button style={{ marginTop: "20px" }}>
        Create Rule
      </button>
    </div>
  );
}