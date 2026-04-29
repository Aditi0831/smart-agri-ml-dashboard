import json
import os

input_path = r"C:\Coding\Smart agriculture\results.json"
output_path = r"C:\Coding\Smart agriculture\lib\nbModel.js"

try:
    with open(input_path, 'r') as f:
        d = json.load(f)
except FileNotFoundError:
    d = {}

# Safely get the parameters, or use a basic fallback structure if they don't exist yet
nb_crop = d.get('nb_crop_params', {"classes": ["rice"], "log_priors": {"rice": 0.0}, "means": {"rice": [0]*12}, "variances": {"rice": [1]*12}})
nb_fert = d.get('nb_fert_params', {"classes": ["14-35-14"], "log_priors": {"14-35-14": 0.0}, "means": {"14-35-14": [0]*12}, "variances": {"14-35-14": [1]*12}})

js_code = f"""// lib/nbModel.js
// Gaussian Naive Bayes parameters fitted on training set

export const NB_CROP = {json.dumps(nb_crop, separators=(',', ':'))};
export const NB_FERT = {json.dumps(nb_fert, separators=(',', ':'))};

export const SOIL_CLASSES = ['Black','Clayey','Loamy','Red','Sandy'];
export const PREP_MIN   = [0,5,5,8.8,14.3,3.5,20.2,0,0,0,0,0];
export const PREP_RANGE = [140,140,200,34.9,85.6,6.4,278.4,1,1,1,1,1];

/**
 * Gaussian Naive Bayes inference.
 * @param {{number[]}} rawFeatures [N,P,K,temp,humidity,ph,rainfall] + soil_onehot[5]
 * @param {{object}}   nbParams    {{classes, log_priors, means, variances}}
 * @returns {{Array}}  sorted [{{cls, prob}}]
 */
export function nbPredict(rawFeatures, nbParams) {{
  // 1. Normalise
  const x = rawFeatures.map((v,i) => (v - PREP_MIN[i]) / (PREP_RANGE[i] || 1));
  
  // 2. Log scores per class
  const logScores = nbParams.classes.map(cls => {{
    const lp  = nbParams.log_priors[cls];
    const mu  = nbParams.means[cls];
    const sig = nbParams.variances[cls];
    let score = lp;
    for (let j = 0; j < x.length; j++) {{
      const diff = x[j] - mu[j];
      score -= 0.5 * (Math.log(2 * Math.PI * sig[j]) + (diff * diff) / sig[j]);
    }}
    return {{ cls, score }};
  }});
  
  // 3. Softmax for probabilities
  const maxS = Math.max(...logScores.map(s => s.score));
  const exp  = logScores.map(s => ({{ cls: s.cls, p: Math.exp(s.score - maxS) }}));
  const sum  = exp.reduce((a, b) => a + b.p, 0);
  
  return exp
    .map(e => ({{ cls: e.cls, prob: +(e.p / sum).toFixed(6) }}))
    .sort((a, b) => b.prob - a.prob);
}}

/**
 * Build raw feature vector from form inputs.
 */
export function buildFeatureVector(inputs) {{
  const {{ N, P, K, temperature, humidity, ph, rainfall, soil_type }} = inputs;
  const soilOH = SOIL_CLASSES.map(s => s === soil_type ? 1.0 : 0.0);
  return [+N, +P, +K, +temperature, +humidity, +ph, +rainfall, ...soilOH];
}}
"""

# Write the JS file
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"Success! nbModel.js has been written to {output_path}")