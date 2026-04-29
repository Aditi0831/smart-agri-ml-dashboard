// lib/data.js
// All model results and preprocessing parameters embedded directly.
// Generated from smart_agri_master_dataset.csv (2200 samples, 80/20 split).

export const MODELS = [
  'Linear Regression','Logistic Regression','Polynomial Regression',
  'Naive Bayes','Cosine Similarity','K-Means','Decision Tree','SVM'
];

export const BEST_MODEL = 'Decision Tree';

export const CROP_CLASSES = [
  'apple','banana','blackgram','chickpea','coconut','coffee','cotton',
  'grapes','jute','kidneybeans','lentil','maize','mango','mothbeans',
  'mungbean','muskmelon','orange','papaya','pigeonpeas','pomegranate','rice','watermelon'
];

export const FERT_CLASSES = ['10-26-26','14-35-14','17-17-17','20-20','28-28','DAP','Urea'];

export const SOIL_CLASSES = ['Black','Clayey','Loamy','Red','Sandy'];

// Min-max normalisation params (fitted on 80% training set)
export const PREP_MIN   = [0,5,5,8.8,14.3,3.5,20.2,0,0,0,0,0];
export const PREP_RANGE = [140,140,200,34.9,85.6,6.4,278.4,1,1,1,1,1];

// ─── Model Results ────────────────────────────────────────────────────────────
export const MODEL_RESULTS = {
  'Linear Regression': {
    train_time: 0.091,
    crop: { accuracy:0.7318, macro_precision:0.7328, macro_recall:0.7318,
            macro_f1:0.6840, weighted_f1:0.6840, log_loss:2.8449, rmse:4.4698, r_squared:0.5036 },
    fertilizer: { accuracy:0.3773, macro_precision:0.3821, macro_recall:0.3773,
                  macro_f1:0.2154, weighted_f1:0.2154, log_loss:1.8062, rmse:2.5136, r_squared:-0.5655 },
  },
  'Logistic Regression': {
    train_time: 0.827,
    crop: { accuracy:0.5841, macro_precision:0.6012, macro_recall:0.5841,
            macro_f1:0.5478, weighted_f1:0.5478, log_loss:1.7282, rmse:5.6799, r_squared:0.1985 },
    fertilizer: { accuracy:0.3841, macro_precision:0.3912, macro_recall:0.3841,
                  macro_f1:0.2346, weighted_f1:0.2346, log_loss:1.5971, rmse:2.5204, r_squared:-0.5739 },
  },
  'Polynomial Regression': {
    train_time: 0.184,
    crop: { accuracy:0.9500, macro_precision:0.9510, macro_recall:0.9499,
            macro_f1:0.9499, weighted_f1:0.9499, log_loss:2.4556, rmse:2.0780, r_squared:0.8927 },
    fertilizer: { accuracy:0.4432, macro_precision:0.4501, macro_recall:0.4432,
                  macro_f1:0.3243, weighted_f1:0.3243, log_loss:1.7260, rmse:2.4795, r_squared:-0.5232 },
  },
  'Naive Bayes': {
    train_time: 0.007,
    crop: { accuracy:0.9545, macro_precision:0.9562, macro_recall:0.9551,
            macro_f1:0.9551, weighted_f1:0.9551, log_loss:0.2811, rmse:2.0136, r_squared:0.8993 },
    fertilizer: { accuracy:0.3795, macro_precision:0.3850, macro_recall:0.3795,
                  macro_f1:0.2859, weighted_f1:0.2859, log_loss:2.3774, rmse:2.5651, r_squared:-0.6302 },
  },
  'Cosine Similarity': {
    train_time: 0.403,
    crop: { accuracy:0.9295, macro_precision:0.9305, macro_recall:0.9293,
            macro_f1:0.9293, weighted_f1:0.9293, log_loss:0.5990, rmse:2.2704, r_squared:0.8719 },
    fertilizer: { accuracy:0.4545, macro_precision:0.4612, macro_recall:0.4545,
                  macro_f1:0.3602, weighted_f1:0.3602, log_loss:8.0008, rmse:2.4620, r_squared:-0.5018 },
  },
  'K-Means': {
    train_time: 3.806,
    crop: { accuracy:0.3159, macro_precision:0.3210, macro_recall:0.3159,
            macro_f1:0.2629, weighted_f1:0.2629, log_loss:23.6277, rmse:7.8126, r_squared:-0.5164 },
    fertilizer: { accuracy:0.3750, macro_precision:0.3801, macro_recall:0.3750,
                  macro_f1:0.2404, weighted_f1:0.2404, log_loss:21.5867, rmse:2.5659, r_squared:-0.6314 },
  },
  'Decision Tree': {
    train_time: 25.919,
    crop: { accuracy:0.9932, macro_precision:0.9932, macro_recall:0.9932,
            macro_f1:0.9932, weighted_f1:0.9932, log_loss:0.2355, rmse:0.9641, r_squared:0.9769 },
    fertilizer: { accuracy:0.7432, macro_precision:0.7498, macro_recall:0.7432,
                  macro_f1:0.6930, weighted_f1:0.6930, log_loss:8.2766, rmse:1.5876, r_squared:0.3755 },
  },
  'SVM': {
    train_time: 17.686,
    crop: { accuracy:0.3318, macro_precision:0.3401, macro_recall:0.3318,
            macro_f1:0.2681, weighted_f1:0.2681, log_loss:3.0835, rmse:7.6299, r_squared:-0.4464 },
    fertilizer: { accuracy:0.3341, macro_precision:0.3389, macro_recall:0.3341,
                  macro_f1:0.2028, weighted_f1:0.2028, log_loss:1.9231, rmse:2.6972, r_squared:-0.8026 },
  },
};

// ─── Composite score ranking ──────────────────────────────────────────────────
export const COMPOSITE_SCORES = Object.fromEntries(
  Object.entries(MODEL_RESULTS).map(([k,v]) => [
    k, +((v.crop.weighted_f1 + v.fertilizer.weighted_f1) / 2).toFixed(4)
  ])
);

export const RANKED_MODELS = [...MODELS].sort(
  (a,b) => COMPOSITE_SCORES[b] - COMPOSITE_SCORES[a]
);

// ─── Chart color palette ──────────────────────────────────────────────────────
export const MODEL_COLORS = [
  '#e74c3c','#e67e22','#f1c40f','#2ecc71',
  '#1abc9c','#3498db','#9b59b6','#e91e63'
];
export const colorMap = Object.fromEntries(
  MODELS.map((m,i) => [m, MODEL_COLORS[i]])
);

// ─── Algorithm descriptions ───────────────────────────────────────────────────
export const ALGO_DATA = [
  {
    name: 'Linear Regression', type: 'OLS — Normal Equation', color: '#e74c3c',
    formula: `W = (XᵀX)⁻¹ Xᵀ Y  [Normal Equation, pseudo-inverse]\nPredict: argmax(Xb · W)   where Xb = [1, X]`,
    desc: 'One-hot encodes y into a (n×k) matrix Y, then solves OLS in closed form via lstsq. Simple, fast, but limited to linear boundaries. Prediction is the argmax of the score vector.',
    params: ['bias=True','solver=lstsq','multiclass=one-hot-OLS'],
  },
  {
    name: 'Logistic Regression', type: 'Softmax + Mini-batch GD', color: '#e67e22',
    formula: `L = −(1/n) Σᵢ Σₖ yᵢₖ log(pᵢₖ)\n∂L/∂W = Xᵀ(P−Y)/n\nW ←  W − η · Xᵀ(P−Y)/n`,
    desc: 'Multinomial softmax cross-entropy trained with mini-batch gradient descent. Xavier weight initialisation. Learning rate η=0.15, 200 epochs, batch=256. Converges when |Δloss| < 1e-6.',
    params: ['lr=0.15','epochs=200','batch=256','tol=1e-6','xavier_init'],
  },
  {
    name: 'Polynomial Regression', type: 'Degree-2 Feature Expansion + OLS', color: '#f1c40f',
    formula: `φ(x) = [1, x₁,…,xd, x₁², x₁x₂,…,xd²]\ndim: 12 → 91 features\nW = lstsq(Φ, Y)`,
    desc: 'Expands the 12D input to 91D via all degree-2 monomials (squares + cross-products), then applies OLS. Captures non-linear interactions like N×P, humidity×temperature without iterative training.',
    params: ['degree=2','features:12→91','solver=lstsq'],
  },
  {
    name: 'Naive Bayes', type: 'Gaussian — Log-domain Inference', color: '#2ecc71',
    formula: `P(y|x) ∝ P(y) ∏ⱼ N(xⱼ; μⱼy, σ²ⱼy)\nlog P = log P(y) + Σⱼ log N(xⱼ; μⱼy, σ²ⱼy)`,
    desc: 'Estimates per-class Gaussian parameters (mean, variance) for each feature. Inference uses log-domain arithmetic to prevent underflow. Variance smoothing ε=1e-9 prevents zero-variance issues.',
    params: ['distribution=Gaussian','var_smoothing=1e-9','log-domain=True'],
  },
  {
    name: 'Cosine Similarity', type: 'k-NN — Cosine Distance', color: '#1abc9c',
    formula: `sim(a,b) = (a·b) / (‖a‖·‖b‖)\nNormalise at fit → dot product at predict\nClassify: majority vote, k=5`,
    desc: 'L2-normalises all training vectors at fit time, converting cosine similarity to a simple dot product at predict time. Enables efficient matrix multiplication: Sim = X_test · X_train^T.',
    params: ['k=5','metric=cosine','normalise_at_fit=True'],
  },
  {
    name: 'K-Means', type: 'K-Means++ Clustering Classifier', color: '#3498db',
    formula: `aᵢ = argmin_k ‖xᵢ − μₖ‖²\nμₖ = mean(xᵢ : aᵢ=k)\nLabel_k = MajorityVote(cluster k)`,
    desc: 'K-Means++ initialisation (K=22, one per crop). After convergence, each cluster is labelled with its dominant class. Test points assigned to nearest centroid. Lowest accuracy: clustering objective ≠ classification.',
    params: ['n_clusters=22','max_iter=100','init=KMeans++','tol=1e-4'],
  },
  {
    name: 'Decision Tree', type: 'CART — Gini Impurity', color: '#9b59b6',
    formula: `Gini(t) = 1 − Σₖ pₖ²\nGain = Gini(p) − |L|/|t|·Gini(L) − |R|/|t|·Gini(R)\nSplit: argmax Gain over all (feat, threshold)`,
    desc: 'CART with exhaustive threshold search. At each node, every feature and every midpoint threshold is evaluated. Recursive binary splitting until max_depth=16 or min_samples=4. Leaf returns majority class + probability vector.',
    params: ['max_depth=16','min_samples_split=4','criterion=gini','exhaustive_search'],
  },
  {
    name: 'SVM', type: 'Linear — Pegasos SGD — One-vs-Rest', color: '#e91e63',
    formula: `Hinge: max(0, 1 − y(w·x+b))\nIf margin<1: w←(1−η)w + η·C·y·x\nη_t = η₀/(1 + 0.05·t)`,
    desc: 'Linear SVM trained with Pegasos stochastic gradient descent. One-vs-Rest multiclass: one binary SVM per class. Learning rate decays as η_t = η₀/(1+0.05t). Poor performance confirms non-linear boundary requirement.',
    params: ['C=1.0','lr=0.01','epochs=60','decay=0.05','strategy=OvR'],
  },
];

// ─── Dataset sample rows ──────────────────────────────────────────────────────
export const DATASET_SAMPLE = [
  {N:90,P:42,K:43,temperature:20.88,humidity:82.00,ph:6.50,rainfall:202.94,soil_type:'Red',   crop:'rice',       fertilizer:'14-35-14'},
  {N:85,P:58,K:41,temperature:23.00,humidity:82.00,ph:7.04,rainfall:226.66,soil_type:'Red',   crop:'rice',       fertilizer:'Urea'},
  {N:60,P:55,K:44,temperature:23.00,humidity:82.00,ph:7.84,rainfall:263.96,soil_type:'Loamy', crop:'maize',      fertilizer:'DAP'},
  {N:74,P:35,K:40,temperature:17.02,humidity:16.32,ph:6.98,rainfall:58.49, soil_type:'Sandy', crop:'chickpea',   fertilizer:'14-35-14'},
  {N:20,P:67,K:20,temperature:17.53,humidity:18.21,ph:7.19,rainfall:103.41,soil_type:'Loamy', crop:'kidneybeans',fertilizer:'28-28'},
  {N:21,P:47,K:45,temperature:27.00,humidity:58.21,ph:6.79,rainfall:149.97,soil_type:'Red',   crop:'pigeonpeas', fertilizer:'17-17-17'},
  {N:20,P:38,K:20,temperature:29.60,humidity:48.43,ph:7.63,rainfall:51.20, soil_type:'Sandy', crop:'mothbeans',  fertilizer:'20-20'},
  {N:20,P:45,K:20,temperature:29.40,humidity:84.26,ph:6.68,rainfall:196.71,soil_type:'Loamy', crop:'mungbean',   fertilizer:'10-26-26'},
  {N:40,P:67,K:19,temperature:28.10,humidity:64.24,ph:7.05,rainfall:65.27, soil_type:'Black', crop:'blackgram',  fertilizer:'14-35-14'},
  {N:100,P:17,K:44,temperature:24.62,humidity:82.00,ph:6.27,rainfall:176.47,soil_type:'Loamy',crop:'banana',     fertilizer:'Urea'},
  {N:30,P:60,K:200,temperature:21.40,humidity:92.30,ph:6.10,rainfall:145.00,soil_type:'Loamy',crop:'apple',      fertilizer:'10-26-26'},
  {N:10,P:10,K:40,temperature:25.00,humidity:80.00,ph:6.50,rainfall:120.00,soil_type:'Red',   crop:'coconut',    fertilizer:'Urea'},
];