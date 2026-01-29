export default function Patients() {
  const patients = [
    {
      name: "Ethan",
      age: 45,
      condition: "Hypertension",
      risk: "High Risk",
      updated: "2 mins ago"
    },
    {
      name: "Liam",
      age: 30,
      condition: "Diabetes",
      risk: "Warning",
      updated: "10 mins ago"
    },
    {
      name: "Sophia",
      age: 29,
      condition: "Healthy",
      risk: "Normal",
      updated: "15 mins ago"
    }
  ];

  return (
    <div className="section card">
      <h2>Patients</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
            <th>Risk</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.condition}</td>
              <td
                className={
                  p.risk === "High Risk"
                    ? "badge-high"
                    : p.risk === "Warning"
                    ? "badge-warning"
                    : "badge-normal"
                }
              >
                {p.risk}
              </td>
              <td>{p.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
