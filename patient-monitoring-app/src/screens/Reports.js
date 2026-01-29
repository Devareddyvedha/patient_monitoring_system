export default function Reports() {
  const reports = [
    {
      name: "Daily Risk Summary",
      date: "28 Jan 2026",
      status: "Ready"
    },
    {
      name: "Weekly Patient Risk Report",
      date: "27 Jan 2026",
      status: "Ready"
    },
    {
      name: "High Risk Incident Log",
      date: "26 Jan 2026",
      status: "Ready"
    }
  ];

  return (
    <div className="section card">
      <h2>Reports</h2>

      <table>
        <thead>
          <tr>
            <th>Report Name</th>
            <th>Generated On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.date}</td>
              <td className="badge-normal">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
