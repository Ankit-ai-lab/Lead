// src/components/SummaryCard.jsx
// Small reusable card - used 6 times on the dashboard (one per status + total)

function SummaryCard({ label, count, color }) {
  return (
    <div className="summary-card" style={{ borderTopColor: color }}>
      <p className="summary-count">{count}</p>
      <p className="summary-label">{label}</p>
    </div>
  );
}

export default SummaryCard;
