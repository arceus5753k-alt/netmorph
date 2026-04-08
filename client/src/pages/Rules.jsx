import { useEffect, useState } from "react";

export default function Rules() {
  const [rules, setRules] = useState([]);

  const [form, setForm] = useState({
    name: "",
    endpoint: "",
    method: "GET",
    response: "",                  //{"userId":":id","message":"dynamic working"}
    delay: 0,
    statusCode: 200,
    query: "{}",
    priority: 0,
  });

  const fetchRules = () => {
    fetch("http://localhost:5000/api/rules")
      .then((res) => res.json())
      .then((data) => setRules(data.rules))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // CREATE
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
    await fetch("http://localhost:5000/api/rules", {
      method: "POST",
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
    <div style={{ padding: "20px" }}>
      <h2>Rules</h2>

      {/* CREATE FORM */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="/api/hello"
          value={form.endpoint}
          onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
        />

        <select
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          placeholder='{"msg":"hello"}'
          value={form.response}
          onChange={(e) => setForm({ ...form, response: e.target.value })}
        />

        <input
          type="number"
          placeholder="Delay"
          value={form.delay}
          onChange={(e) => setForm({ ...form, delay: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Status"
          value={form.statusCode}
          onChange={(e) =>
            setForm({ ...form, statusCode: Number(e.target.value) })
          }
        />

        <input
          placeholder='Query {"key":"value"}'
          value={form.query}
          onChange={(e) => setForm({ ...form, query: e.target.value })}
        />

        {/* 🔥 THIS WAS MISSING */}
        <input
          type="number"
          placeholder="Priority"
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: Number(e.target.value) })
          }
        />

        <button onClick={handleSubmit}>Create Rule</button>
      </div>

      {/* RULE LIST */}
      {rules.length === 0 ? (
        <p>No rules found</p>
      ) : (
        rules.map((rule) => (
          <div
            key={rule._id}
            style={{
              border: "1px solid #444",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <div>
              <b>{rule.method}</b> {rule.endpoint}
            </div>

            {/* 🔥 SHOW PRIORITY */}
            <div>Priority: {rule.priority}</div>

            <div>Status: {rule.enabled ? "ON" : "OFF"}</div>

            <button onClick={() => toggleRule(rule._id)}>
              {rule.enabled ? "Disable" : "Enable"}
            </button>

            <button onClick={() => deleteRule(rule._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
