export default function ResultCard({ data, onClose }) {
  if (!data) return null;

  const { calculation, recommendation } = data;
  const formatNaira = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value || 0);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="card result-card modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span>Solar recommendation</span>
            <h3 id="result-title">Your estimated system</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="result-summary">
          <p><strong>Total Load:</strong> {calculation.total_load_watts} W</p>
          <p><strong>Adjusted Load:</strong> {calculation.adjusted_load_watts} W</p>
        </div>

        <hr />

        {recommendation ? (
          <div className="result-grid">
            <div>
              <span>Inverter</span>
              <strong>{recommendation.inverter_kva} kVA</strong>
              <em>{formatNaira(recommendation.inverter_estimated_cost_naira)}</em>
            </div>
            <div>
              <span>Battery</span>
              <strong>{recommendation.battery_recommendation}</strong>
              <em>{formatNaira(recommendation.battery_estimated_cost_naira)}</em>
            </div>
            <div>
              <span>Panels</span>
              <strong>{recommendation.panel_quantity} x {recommendation.panel_size_watts}W</strong>
              <em>{formatNaira(recommendation.panel_estimated_cost_naira)}</em>
            </div>
            <div className="result-total">
              <span>Total Estimate</span>
              <strong>{formatNaira(recommendation.total_estimated_cost_naira)}</strong>
            </div>
          </div>
        ) : (
          <p>No recommendation was created for this calculation.</p>
        )}

        {recommendation?.cost_note && (
          <p className="cost-note">{recommendation.cost_note}</p>
        )}

      
      </div>
    </div>
  );
}
