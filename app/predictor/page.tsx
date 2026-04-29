// app/predictor/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { nbPredict, buildFeatureVector, NB_CROP, NB_FERT, SOIL_CLASSES } from '../../lib/nbModel';

export default function PredictorPage() {
  const [inputs, setInputs] = useState({
    N: 90, P: 42, K: 43, temperature: 20.8, humidity: 82.0, ph: 6.5, rainfall: 202.9, soil_type: 'Red'
  });

  const [cropResult, setCropResult] = useState<{cls: string, prob: number}[]>([]);
  const [fertResult, setFertResult] = useState<{cls: string, prob: number}[]>([]);

  // Run the math model instantly whenever inputs change
  useEffect(() => {
    try {
      const vector = buildFeatureVector(inputs);
      const crops = nbPredict(vector, NB_CROP);
      const ferts = nbPredict(vector, NB_FERT);
      setCropResult(crops.slice(0, 3)); // Keep top 3
      setFertResult(ferts.slice(0, 3)); // Keep top 3
    } catch (e) {
      console.warn("Waiting for NB parameters to load...");
    }
  }, [inputs]);

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Live <em>Inference Engine</em></h1>
        <p>Real-time prediction using the browser-compiled Gaussian Naive Bayes parameters. Adjust the sliders below to see the probabilities update instantly through log-domain math.</p>
      </div>

      <div className="grid-2">
        {/* Input Form */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: '20px' }}>Environment & Soil Parameters</div>
          
          <div className="grid-3" style={{ gap: '12px', marginBottom: '16px' }}>
            <div className="input-group">
              <label>Nitrogen (N)</label>
              <input type="number" name="N" value={inputs.N} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Phosphorus (P)</label>
              <input type="number" name="P" value={inputs.P} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Potassium (K)</label>
              <input type="number" name="K" value={inputs.K} onChange={handleChange} />
            </div>
          </div>

          <div className="input-group">
            <label>Temperature (°C)</label>
            <div className="range-row">
              <input type="range" name="temperature" min="5" max="45" step="0.1" value={inputs.temperature} onChange={handleChange} />
              <span className="range-val">{Number(inputs.temperature).toFixed(1)}</span>
            </div>
          </div>

          <div className="input-group">
            <label>Humidity (%)</label>
            <div className="range-row">
              <input type="range" name="humidity" min="10" max="100" step="0.1" value={inputs.humidity} onChange={handleChange} />
              <span className="range-val">{Number(inputs.humidity).toFixed(1)}</span>
            </div>
          </div>

          <div className="input-group">
            <label>Rainfall (mm)</label>
            <div className="range-row">
              <input type="range" name="rainfall" min="0" max="300" step="1" value={inputs.rainfall} onChange={handleChange} />
              <span className="range-val">{Number(inputs.rainfall).toFixed(0)}</span>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '12px', marginBottom: 0 }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>pH Level</label>
              <input type="number" name="ph" step="0.1" value={inputs.ph} onChange={handleChange} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Soil Type</label>
              <select name="soil_type" value={inputs.soil_type} onChange={handleChange}>
                {SOIL_CLASSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Real-time Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="result-display">
            <div className="card-title" style={{ width: '100%', textAlign: 'left', marginBottom: '12px' }}>🌾 Optimal Crop</div>
            {cropResult.length > 0 ? (
              <>
                <div className="result-crop">{cropResult[0].cls}</div>
                <div className="result-conf">{(cropResult[0].prob * 100).toFixed(2)}% Confidence</div>
                
                <div style={{ width: '100%', marginTop: '16px' }}>
                  {cropResult.map((c, i) => (
                    <div key={c.cls} className="top3-item">
                      <div className="top3-rank">#{i+1}</div>
                      <div className="top3-name">{c.cls}</div>
                      <div className="top3-bar-wrap">
                        <div className="top3-bar-fill" style={{ width: `${c.prob * 100}%` }}></div>
                      </div>
                      <div className="top3-pct">{(c.prob * 100).toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </>
            ) : <p style={{color: 'var(--text3)'}}>Awaiting model load...</p>}
          </div>

          <div className="result-display" style={{ borderColor: 'var(--blue)' }}>
            <div className="card-title" style={{ width: '100%', textAlign: 'left', marginBottom: '12px' }}>🧪 Recommended Fertilizer</div>
            {fertResult.length > 0 ? (
              <>
                <div className="result-crop" style={{ color: 'var(--blue)' }}>{fertResult[0].cls}</div>
                <div className="result-conf" style={{ color: 'var(--teal)' }}>{(fertResult[0].prob * 100).toFixed(2)}% Confidence</div>
                
                <div style={{ width: '100%', marginTop: '16px' }}>
                  {fertResult.map((f, i) => (
                    <div key={f.cls} className="top3-item">
                      <div className="top3-rank">#{i+1}</div>
                      <div className="top3-name">{f.cls}</div>
                      <div className="top3-bar-wrap">
                        <div className="top3-bar-fill" style={{ width: `${f.prob * 100}%`, background: 'var(--blue)' }}></div>
                      </div>
                      <div className="top3-pct">{(f.prob * 100).toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </>
            ) : <p style={{color: 'var(--text3)'}}>Awaiting model load...</p>}
          </div>

        </div>
      </div>
    </div>
  );
}