import { useEffect, useState } from "react";

export default function Rules() {
  const [rules, setRules] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    endpoint: "",
    method: "GET",
    response: "",
    delay: 0,
    statusCode: 200,
    query: "{}",
    priority: 0,
  });

  const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#2b2b2b",
    color: "white",
  };

  const fetchRules = () => {
    fetch("http://localhost:5000/api/rules")
      .then((res) => res.json())
      .then((data) => setRules(data.rules))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // EDIT
  const handleEdit = (rule) => {
    setEditingId(rule._id);

    setForm({
      name: rule.name,
      endpoint: rule.endpoint,
      method: rule.method,
      response: JSON.stringify(rule.response),
      delay: rule.delay,
      statusCode: rule.statusCode,
      query: JSON.stringify(rule.query || {}),
      priority: rule.priority,
    });
  };

  // CREATE / UPDATE
  const handleSubmit = async () => {
    let parsedResponse = {};
    let parsedQuery = {};

    try {
      parsedResponse = form.response ? JSON.parse(form.response) : {};
      parsedQuery = form.query ? JSON.parse(form.query) : {};
    } catch (err) {
      alert("Invalid JSON format");
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/rules/${editingId}`
        : "http://localhost:5000/api/rules";

      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          response: parsedResponse,
          query: parsedQuery,
        }),
      });

      fetchRules();

      setForm({
        name: "",
        endpoint: "",
        method: "GET",
        response: "",
        delay: 0,
        statusCode: 200,
        query: "{}",
        priority: 0,
      });

      setEditingId(null);

    } catch (err) {
      console.error(err);
    }
  };

  const toggleRule = async (id) => {
    await fetch(`http://localhost:5000/api/rules/${id}/toggle`, {
      method: "PATCH",
    });
    fetchRules();
  };

  const deleteRule = async (id) => {
    await fetch(`http://localhost:5000/api/rules/${id}`, {
      method: "DELETE",
    });
    fetchRules();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto", color: "white" }}>
      <h2>Rules</h2>

      {/* FORM */}
      <div
        style={{
          marginBottom: "30px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          background: "#1e1e1e",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <input
          style={inputStyle}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={inputStyle}
          placeholder="/api/hello"
          value={form.endpoint}
          onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
        />

        <select
          style={inputStyle}
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          style={inputStyle}
          placeholder='{"msg":"hello"}'
          value={form.response}
          onChange={(e) => setForm({ ...form, response: e.target.value })}
        />

        <input
          style={inputStyle}
          type="number"
          placeholder="Delay"
          value={form.delay}
          onChange={(e) => setForm({ ...form, delay: Number(e.target.value) })}
        />

        <input
          style={inputStyle}
          type="number"
          placeholder="Status"
          value={form.statusCode}
          onChange={(e) =>
            setForm({ ...form, statusCode: Number(e.target.value) })
          }
        />

        <input
          style={inputStyle}
          placeholder='Query {"key":"value"}'
          value={form.query}
          onChange={(e) => setForm({ ...form, query: e.target.value })}
        />

        <input
          style={inputStyle}
          type="number"
          placeholder="Priority"
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: Number(e.target.value) })
          }
        />

        <button
          onClick={handleSubmit}
          style={{
            gridColumn: "span 2",
            padding: "10px",
            borderRadius: "6px",
            background: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update Rule" : "Create Rule"}
        </button>
      </div>

      {/* RULE LIST */}
      {rules.length === 0 ? (
        <p>No rules found</p>
      ) : (
        rules.map((rule) => (
          <div
            key={rule._id}
            style={{
              border: "1px solid #333",
              borderRadius: "10px",
              padding: "15px",
              marginTop: "15px",
              background: "#1e1e1e",
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <b style={{ color: "#4caf50" }}>{rule.method}</b> {rule.endpoint}
            </div>

            <div>Priority: {rule.priority}</div>
            <div>Status: {rule.enabled ? "🟢 ON" : "🔴 OFF"}</div>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button onClick={() => handleEdit(rule)}>Edit</button>

              <button onClick={() => toggleRule(rule._id)}>
                {rule.enabled ? "Disable" : "Enable"}
              </button>

              <button onClick={() => deleteRule(rule._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}