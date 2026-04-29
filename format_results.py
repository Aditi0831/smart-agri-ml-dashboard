import json
import os

# Using r"..." (raw strings) so Windows backslashes are handled correctly
# Assuming your raw results.json is in the root "Smart agriculture" folder
input_path = r"C:\Coding\Smart agriculture\public\results.json" 

# The target directory inside your Next.js app
output_dir = r"C:\Coding\Smart agriculture\app\public"
output_path = os.path.join(output_dir, "results.json")

# 1. Create the public directory if it does not exist
os.makedirs(output_dir, exist_ok=True)

try:
    # 2. Read the raw data
    with open(input_path, 'r') as f:
        d = json.load(f)

    # 3. Filter and clean the data
    keep = ['Linear Regression', 'Logistic Regression', 'Polynomial Regression', 
            'Naive Bayes', 'Cosine Similarity', 'K-Means', 'Decision Tree', 'SVM']
    
    clean = {
        'model_results': {k: d.get('model_results', {}).get(k, {}) for k in keep if k in d.get('model_results', {})}, 
        'best_model': d.get('best_model', 'Decision Tree'),
        'crop_classes': d.get('crop_classes', 22),
        'fert_classes': d.get('fert_classes', 7)
    }

    # 4. Save to the app/public folder
    with open(output_path, 'w') as f:
        json.dump(clean, f, indent=2)

    print(f"Done! Cleaned file successfully saved to:\n{output_path}")

except FileNotFoundError:
    print(f"Error: Could not find the raw file at {input_path}")
    print("Please make sure your original results.json is placed there, or update the input_path in this script.")