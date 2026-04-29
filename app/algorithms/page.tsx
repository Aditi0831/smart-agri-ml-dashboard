// app/algorithms/page.tsx
import { ALGO_DATA } from '../../lib/data';

export default function AlgorithmsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Mathematical <em>Algorithms</em></h1>
        <p>Detailed breakdown of the 8 predictive models implemented purely using linear algebra, probability, and optimization techniques via NumPy.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {ALGO_DATA.map(algo => (
          <div key={algo.name} className="algo-detail">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ color: algo.color }}>{algo.name}</h3>
                <div className="algo-type">{algo.type}</div>
              </div>
            </div>
            
            <p>{algo.desc}</p>
            
            <div className="formula-box" style={{ borderLeftColor: algo.color }}>
              {algo.formula}
            </div>
            
            <div style={{ marginTop: '12px' }}>
              {algo.params.map(p => (
                <span key={p} className="param-tag">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}