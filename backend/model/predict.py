import joblib
import pandas as pd

# Load trained model
model = joblib.load("health_model.pkl")

# Sample patient input
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
}])

# Predict
prediction = model.predict(sample)[0]

result = {0: "Normal", 1: "Warning", 2: "High Risk"}
print("Predicted Health Risk:", result[prediction])
