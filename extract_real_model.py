import pandas as pd
import numpy as np
import json
import os

print("Extracting real Naive Bayes parameters from dataset...")

# 1. Load the dataset
csv_path = r"C:\Coding\Smart agriculture\smart_agri_master_dataset.csv"
try:
    df = pd.read_csv(csv_path)
except FileNotFoundError:
    print("Error: Could not find smart_agri_master_dataset.csv in the current folder.")
    exit()

# 2. Define features and encode soil classes
soil_classes = ['Black', 'Clayey', 'Loamy', 'Red', 'Sandy']
for s in soil_classes:
    df[s] = (df['soil_type'] == s).astype(float)

feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'] + soil_classes

# Normalization parameters (to match the JS logic)
prep_min = [0, 5, 5, 8.8, 14.3, 3.5, 20.2, 0, 0, 0, 0, 0]
prep_range = [140, 140, 200, 34.9, 85.6, 6.4, 278.4, 1, 1, 1, 1, 1]

# Normalize the dataframe features
for i, col in enumerate(feature_cols):
    df[col] = (df[col] - prep_min[i]) / prep_range[i]

# 3. Function to calculate Gaussian NB parameters
def get_nb_params(target_col):
    classes = sorted(df[target_col].unique().tolist())
    params = {'classes': classes, 'log_priors': {}, 'means': {}, 'variances': {}}
    total_samples = len(df)
    
    for c in classes:
        subset = df[df[target_col] == c]
        # Log Prior: ln(P(class))
        params['log_priors'][c] = float(np.log(len(subset) / total_samples))
        # Mean: μ
        params['means'][c] = subset[feature_cols].mean().tolist()
        # Variance: σ^2 (adding 1e-6 to prevent division by zero in JS)
        params['variances'][c] = (subset[feature_cols].var(ddof=0) + 1e-6).tolist()
    return params

nb_crop = get_nb_params('crop')
nb_fert = get_nb_params('fertilizer')

# 4. Generate the JS file content
js_content = f"""// lib/nbModel.js
// TRUE Gaussian Naive Bayes parameters extracted directly from CSV

export const NB_CROP = {json.dumps(nb_crop, separators=(',', ':'))};
export const NB_FERT = {json.dumps(nb_fert, separators=(',', ':'))};

export const SOIL_CLASSES = {json.dumps(soil_classes)};
export const PREP_MIN   = {prep_min};
export const PREP_RANGE = {prep_range};

/**
 * Gaussian Naive Bayes inference.
 */
export function nbPredict(rawFeatures, nbParams) {{
  const x = rawFeatures.map((v,i) => (v - PREP_MIN[i]) / (PREP_RANGE[i] || 1));
  
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
  
  const maxS = Math.max(...logScores.map(s => s.score));
  const exp  = logScores.map(s => ({{ cls: s.cls, p: Math.exp(s.score - maxS) }}));
  const sum  = exp.reduce((a, b) => a + b.p, 0);
  
  return exp
    .map(e => ({{ cls: e.cls, prob: +(e.p / sum).toFixed(6) }}))
    .sort((a, b) => b.prob - a.prob);
}}

export function buildFeatureVector(inputs) {{
  const {{ N, P, K, temperature, humidity, ph, rainfall, soil_type }} = inputs;
  const soilOH = SOIL_CLASSES.map(s => s === soil_type ? 1.0 : 0.0);
  return [+N, +P, +K, +temperature, +humidity, +ph, +rainfall, ...soilOH];
}}
"""

# 5. Save the file
output_path = r"C:\Coding\Smart agriculture\lib\nbModel.js"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Success! Real parameters written to {output_path}")