'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { MODEL_RESULTS, MODELS, MODEL_COLORS, BEST_MODEL, COMPOSITE_SCORES, RANKED_MODELS } from '../lib/data';

export default function Home() {
  const cropRef = useRef(null);
  const fertRef = useRef(null);
  const rankRef = useRef(null);

  useEffect(() => {
    // 1. Destroy any existing charts on these canvases (Fixes the StrictMode Canvas error)
    if (cropRef.current) Chart.getChart(cropRef.current)?.destroy();
    if (fertRef.current) Chart.getChart(fertRef.current)?.destroy();
    if (rankRef.current) Chart.getChart(rankRef.current)?.destroy();

    // 2. Set defaults
    const def = {
      color: '#a8c9b0',
      font: { family: 'JetBrains Mono' },
    };
    Chart.defaults.color = def.color;
    Chart.defaults.font.family = def.font.family;

    const labels = MODELS.map(m => m.split(' ').slice(0,2).join(' '));
    const colors = MODELS.map((_, i) => MODEL_COLORS[i] + 'cc');
    const borders = MODELS.map((_, i) => MODEL_COLORS[i]);

    // 3. Crop accuracy
    const cropChart = new Chart(cropRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label:'Crop Accuracy', data: MODELS.map(m=>MODEL_RESULTS[m].crop.accuracy),
          backgroundColor: colors, borderColor: borders, borderWidth:1 }]
      },
      options: { responsive:true, plugins:{ legend:{display:false} },
        scales:{ y:{min:0,max:1.1,grid:{color:'rgba(30,74,42,0.3)'}},
                 x:{grid:{color:'rgba(30,74,42,0.3)'}, ticks:{maxRotation:35}} } }
    });

    // 4. Fert accuracy
    const fertChart = new Chart(fertRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label:'Fert Accuracy', data: MODELS.map(m=>MODEL_RESULTS[m].fertilizer.accuracy),
          backgroundColor: colors, borderColor: borders, borderWidth:1 }]
      },
      options: { responsive:true, plugins:{ legend:{display:false} },
        scales:{ y:{min:0,max:0.9,grid:{color:'rgba(30,74,42,0.3)'}},
                 x:{grid:{color:'rgba(30,74,42,0.3)'}, ticks:{maxRotation:35}} } }
    });

    // 5. Ranking
    const ranked = [...MODELS].sort((a,b)=>COMPOSITE_SCORES[b]-COMPOSITE_SCORES[a]);
    const rankChart = new Chart(rankRef.current, {
      type: 'bar',
      data: {
        labels: ranked,
        datasets: [{ label:'Composite Score',
          data: ranked.map(m=>COMPOSITE_SCORES[m]),
          backgroundColor: ranked.map(m=>m===BEST_MODEL?'#d4a843':'#3498db55'),
          borderColor: ranked.map(m=>m===BEST_MODEL?'#d4a843':'#3498db'),
          borderWidth:1 }]
      },
      options: { indexAxis:'y', responsive:true, plugins:{ legend:{display:false} },
        scales:{ x:{grid:{color:'rgba(30,74,42,0.3)'}},
                 y:{grid:{color:'rgba(30,74,42,0.3)'}} } }
    });

    // 6. Cleanup on unmount
    return () => {
      cropChart.destroy();
      fertChart.destroy();
      rankChart.destroy();
    };
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Smart <em>Agriculture</em> ML System</h1>
        <p>8 machine learning models implemented from scratch (NumPy only) predicting optimal crop and fertilizer from soil & climate data across 2,200 samples and 22 crop classes.</p>
        <span className="tag">numpy only</span>
        <span className="tag">22 crop classes</span>
        <span className="tag">7 fertilizer types</span>
        <span className="tag">80/20 stratified split</span>
        <span className="tag">no sklearn</span>
      </div>

      {/* Hero */}
      <div className="hero">
        <h2>🏆 Best Model: Decision Tree (CART)</h2>
        <p>After evaluating 8 algorithms across 9 metrics, Decision Tree with Gini impurity splitting achieved the highest composite score — 99.32% crop accuracy and 74.32% fertilizer accuracy with the lowest log loss among all models.</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="n" style={{color:'var(--green)'}}>99.32%</div>
            <div className="l">Crop Accuracy</div>
          </div>
          <div className="hero-stat">
            <div className="n" style={{color:'var(--green)'}}>74.32%</div>
            <div className="l">Fertilizer Acc</div>
          </div>
          <div className="hero-stat">
            <div className="n" style={{color:'var(--gold)'}}>0.2355</div>
            <div className="l">Crop Log Loss</div>
          </div>
          <div className="hero-stat">
            <div className="n" style={{color:'var(--teal)'}}>8</div>
            <div className="l">Models Compared</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          {t:'Total Samples',v:'2,200',s:'100 per crop × 22 crops',c:'var(--gold)'},
          {t:'Train / Test',v:'80/20',s:'Stratified by crop',c:'var(--green)'},
          {t:'Input Features',v:'12',s:'7 numeric + 5 soil OHE',c:'var(--teal)'},
          {t:'Models Trained',v:'8',s:'All from scratch (NumPy)',c:'var(--purple)'},
        ].map(s=>(
          <div className="card" key={s.t} style={{borderTop:`2px solid ${s.c}`}}>
            <div className="card-title">{s.t}</div>
            <div className="card-value" style={{color:s.c}}>{s.v}</div>
            <div className="card-sub">{s.s}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2">
        <div className="chart-card">
          <h3>Crop Accuracy — All 8 Models</h3>
          <p>22-class crop prediction on 440 test samples</p>
          <canvas ref={cropRef} height={200}></canvas>
        </div>
        <div className="chart-card">
          <h3>Fertilizer Accuracy — All 8 Models</h3>
          <p>7-class fertilizer recommendation on 440 test samples</p>
          <canvas ref={fertRef} height={200}></canvas>
        </div>
      </div>

      {/* Ranking */}
      <div className="chart-card">
        <h3>Model Ranking by Composite Score</h3>
        <p>Composite = (Weighted F1 Crop + Weighted F1 Fertilizer) / 2 — Gold bar = best model (Decision Tree)</p>
        <canvas ref={rankRef} height={180}></canvas>
      </div>

      {/* Quick summary table */}
      <div style={{marginTop:20}}>
        <div className="tbl-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th><th>Model</th>
                <th>Crop Acc</th><th>Crop F1</th>
                <th>Fert Acc</th><th>Fert F1</th>
                <th>Composite</th><th>Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {RANKED_MODELS.map((m,i)=>{
                const r = MODEL_RESULTS[m];
                const isBest = m===BEST_MODEL;
                return (
                  <tr key={m} className={isBest?'best-row':''}>
                    <td>{isBest?'⭐':`#${i+1}`}</td>
                    <td>{m}</td>
                    <td className={r.crop.accuracy>=0.9?'val-high':r.crop.accuracy>=0.7?'val-mid':'val-low'}>{r.crop.accuracy.toFixed(4)}</td>
                    <td className={r.crop.macro_f1>=0.9?'val-high':r.crop.macro_f1>=0.7?'val-mid':'val-low'}>{r.crop.macro_f1.toFixed(4)}</td>
                    <td className={r.fertilizer.accuracy>=0.5?'val-mid':'val-low'}>{r.fertilizer.accuracy.toFixed(4)}</td>
                    <td className={r.fertilizer.macro_f1>=0.5?'val-mid':'val-low'}>{r.fertilizer.macro_f1.toFixed(4)}</td>
                    <td style={{color:'var(--gold3)',fontWeight:700}}>{COMPOSITE_SCORES[m].toFixed(4)}</td>
                    <td style={{color:'var(--text3)'}}>{r.train_time.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}