import React from "react";

const options = [
  {
    id: 1,
    name: "Option A: Expand to New Market",
    successRate: 85,
    regretScore: 15,
    timeframe: "6 months",
    investment: "$250K",
    pros: ["High growth potential", "Market demand verified", "Low competition"],
    cons: ["High initial investment", "Regulatory challenges"],
    status: "recommended",
  },
  {
    id: 2,
    name: "Option B: Optimize Current Operations",
    successRate: 72,
    regretScore: 28,
    timeframe: "3 months",
    investment: "$80K",
    pros: ["Lower risk", "Quick implementation", "Cost effective"],
    cons: ["Limited growth potential", "Temporary solution"],
    status: "neutral",
  },
  {
    id: 3,
    name: "Option C: Develop New Product Line",
    successRate: 65,
    regretScore: 35,
    timeframe: "12 months",
    investment: "$500K",
    pros: ["Innovation opportunity", "Long-term value"],
    cons: ["High risk", "Long development time", "Uncertain market"],
    status: "caution",
  },
];

export default function ComparisonTable() {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden" }}>
      
      {/* Header */}
      <div style={{ padding: "16px", borderBottom: "1px solid #eee", background: "#f9fafb" }}>
        <h2>Decision Options Comparison</h2>
        <p>Side-by-side analysis of predicted outcomes and regret scores</p>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f3f4f6" }}>
          <tr>
            <th>Option</th>
            <th>Success Rate</th>
            <th>Regret Score</th>
            <th>Timeframe</th>
            <th>Investment</th>
            <th>Insights</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {options.map((option) => (
            <tr key={option.id} style={{ borderTop: "1px solid #eee" }}>
              
              <td>{option.name}</td>

              <td style={{ textAlign: "center" }}>
                {option.successRate}%
                <div style={{ background: "#eee", height: "6px", marginTop: "5px" }}>
                  <div
                    style={{
                      width: `${option.successRate}%`,
                      background: "green",
                      height: "100%",
                    }}
                  />
                </div>
              </td>

              <td style={{ textAlign: "center" }}>
                {option.regretScore}%
                <div style={{ background: "#eee", height: "6px", marginTop: "5px" }}>
                  <div
                    style={{
                      width: `${option.regretScore}%`,
                      background: "orange",
                      height: "100%",
                    }}
                  />
                </div>
              </td>

              <td>{option.timeframe}</td>
              <td>{option.investment}</td>

              <td>
                <div>
                  <strong>Pro:</strong> {option.pros[0]}
                </div>
                <div>
                  <strong>Con:</strong> {option.cons[0]}
                </div>
              </td>

              <td style={{ textAlign: "center" }}>
                {option.status === "recommended" && "✅ Recommended"}
                {option.status === "neutral" && "🔵 Consider"}
                {option.status === "caution" && "⚠️ Caution"}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}