import joblib
import pandas as pd

# Load model and helpers
model = joblib.load("health_model.pkl")
features = joblib.load("features.pkl")

# Sample input
sample = pd.DataFrame([{
    "GENHLTH": 3,
    "DIABETE3": 1,
    "CVDCRHD4": 0,
    "CVDSTRK3": 0,
    "BPHIGH4": 1,
    "_BMI5": 27.5,
    "SMOKE100": 1,
    "_AGEG5YR": 4,
    "SEX": 1
}])[features]   # ensure correct order

# Prediction
pred = model.predict(sample)[0]
proba = model.predict_proba(sample)[0]

result = {0: "Normal", 1: "Warning", 2: "High Risk"}

print("\nPredicted Health Risk:", result[pred])

# -------------------
# Risk Probability
# -------------------
print("\nRisk Probability:")
for i, label in result.items():
    print(f"{label}: {proba[i]*100:.2f}%")

# -------------------
# Feature Importance
# -------------------
importance_df = pd.DataFrame({
    "Feature": features,
    "Impact": model.feature_importances_
}).sort_values(by="Impact", ascending=False)

print("\nTop Risk Factors:")
print(importance_df.head(5))

# -------------------
# Health Advice
# -------------------
print("\nHealth Advice:")
if pred == 2:
    print("🚨 Immediate doctor consultation required.")
if sample["_BMI5"].values[0] > 30:
    print("🏃 High BMI detected. Exercise recommended.")
if sample["SMOKE100"].values[0] == 1:
    print("🚭 Smoking increases heart risk.")
if sample["BPHIGH4"].values[0] == 1:
    print("🩺 Monitor blood pressure daily.")
