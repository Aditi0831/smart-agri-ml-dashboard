// app/dataset/page.tsx
import { DATASET_SAMPLE } from '../../lib/data';

export default function DatasetPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Dataset <em>Overview</em></h1>
        <p>A snapshot of the 2,200 samples used to train the machine learning models. The data features a balanced distribution of 100 samples per crop class.</p>
      </div>

      <div className="grid-3">
        <div className="card" style={{ borderTop: '2px solid var(--teal)' }}>
          <div className="card-title">Features</div>
          <div className="card-value" style={{ color: 'var(--teal)' }}>12</div>
          <div className="card-sub">N, P, K, Temp, Humidity, pH, Rainfall + Soil (OHE)</div>
        </div>
        <div className="card" style={{ borderTop: '2px solid var(--gold)' }}>
          <div className="card-title">Target 1: Crop</div>
          <div className="card-value" style={{ color: 'var(--gold)' }}>22 Classes</div>
          <div className="card-sub">Rice, Maize, Chickpea, Kidneybeans, etc.</div>
        </div>
        <div className="card" style={{ borderTop: '2px solid var(--blue)' }}>
          <div className="card-title">Target 2: Fertilizer</div>
          <div className="card-value" style={{ color: 'var(--blue)' }}>7 Classes</div>
          <div className="card-sub">Urea, DAP, 14-35-14, 28-28, etc.</div>
        </div>
      </div>

      <div className="chart-card">
        <h3>Sample Data Matrix</h3>
        <p>A subset of the raw tabular data before normalization and One-Hot Encoding.</p>
        
        <div className="tbl-wrap" style={{ marginTop: '16px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>N</th><th>P</th><th>K</th>
                <th>Temp (°C)</th><th>Humidity (%)</th><th>pH</th><th>Rainfall (mm)</th>
                <th>Soil Type</th>
                <th style={{ color: 'var(--green)' }}>Target: Crop</th>
                <th style={{ color: 'var(--blue)' }}>Target: Fert</th>
              </tr>
            </thead>
            <tbody>
              {DATASET_SAMPLE.map((row, i) => (
                <tr key={i}>
                  <td className="val-mid">{row.N}</td>
                  <td className="val-mid">{row.P}</td>
                  <td className="val-mid">{row.K}</td>
                  <td>{row.temperature.toFixed(2)}</td>
                  <td>{row.humidity.toFixed(2)}</td>
                  <td>{row.ph.toFixed(2)}</td>
                  <td>{row.rainfall.toFixed(2)}</td>
                  <td><span className="badge badge-gold">{row.soil_type}</span></td>
                  <td><span className="badge badge-green">{row.crop}</span></td>
                  <td><span className="badge badge-blue">{row.fertilizer}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}