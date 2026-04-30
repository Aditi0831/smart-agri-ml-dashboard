# 🌾 Smart Agriculture ML Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.3-ff6384?style=for-the-badge&logo=chart.js)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-From%20Scratch-success?style=for-the-badge)

A full-stack data science project that bridges the gap between raw agronomic data and interactive web deployment. 

Instead of relying on high-level libraries like `scikit-learn`, this project implements 8 foundational classification models using pure mathematical formulas and NumPy. The winning model logic (Gaussian Naive Bayes) is extracted and compiled directly into a Next.js frontend, enabling lightning-fast, real-time crop and fertilizer predictions entirely within the user's browser.

## ✨ Features

* **Real-Time Inference Engine:** A Live Predictor that uses log-domain Gaussian math to calculate crop and fertilizer probabilities instantly as you adjust environmental sliders.
* **Zero-Library ML:** 8 machine learning algorithms (Decision Trees, SVM, Logistic Regression, Naive Bayes, etc.) implemented from scratch to understand the underlying calculus and linear algebra.
* **Comprehensive EDA:** Explores a 2,200-sample dataset encompassing 22 crop classes, 7 fertilizer types, and 12 environmental/soil features.
* **Interactive Data Visualization:** Responsive, animated Chart.js dashboards comparing model accuracy, F1 scores, and composite rankings.
* **Dark-Themed UI:** A sleek, modern, and fully responsive sidebar layout built with pure CSS and Tailwind utility concepts.

## 🚀 Live Demo

**https://smart-agri-ml-dashboard.onrender.com/**

## 💻 Tech Stack

* **Frontend Framework:** Next.js 14 (App Router) & React 18
* **Styling:** CSS Variables, Grid/Flexbox layouts, Custom Dark Theme
* **Data Visualization:** Chart.js & React-Chartjs-2
* **Machine Learning:** Pure Python & NumPy (Offline Training)
* **Browser Inference:** Vanilla JavaScript (ES6 Modules)
* **Deployment:** Render (Node.js Environment)

## 🧠 The Machine Learning Approach

Unlike standard Python-backed Flask/FastAPI applications, this project decouples the ML inference from a traditional backend. 

1. **Training:** A Python script calculates the prior probabilities, means, and variances for all 22 crops and 7 fertilizers based on the dataset.
2. **Extraction:** These statistical parameters are exported as a strict JSON-like JavaScript module (`nbModel.js`).
3. **Browser Execution:** The Next.js frontend imports these arrays. When a user changes an input slider, the client runs the Gaussian Naive Bayes probability formula in real-time, completely eliminating server latency and API calls.

## 🛠️ Local Installation

Want to run this project locally? Follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/YourUsername/smart-agri-ml-dashboard.git](https://github.com/YourUsername/smart-agri-ml-dashboard.git)
cd smart-agri-ml-dashboard
