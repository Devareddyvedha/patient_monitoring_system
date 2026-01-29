import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import joblib


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "..", "dataset", "2015.csv")


df = pd.read_csv(DATA_PATH, low_memory=False)
print("Original shape:", df.shape)

cols = [
    "GENHLTH",
    "DIABETE3",
    "CVDCRHD4",
    "CVDSTRK3",
    "BPHIGH4",
    "_BMI5",
    "SMOKE100",
    "_AGEG5YR",
    "SEX"
]

existing_cols = [c for c in cols if c in df.columns]
df = df[existing_cols]

print("Using columns:", existing_cols)


df = df.sample(n=50000, random_state=42)
print("Sampled shape:", df.shape)

df.replace([7, 9, 77, 99], pd.NA, inplace=True)
df.dropna(inplace=True)


if "_BMI5" in df.columns:
    df["_BMI5"] = df["_BMI5"] / 100

def risk_label(row):
    risk = 0
    if row["DIABETE3"] == 1:
        risk += 1
    if row["CVDCRHD4"] == 1:
        risk += 1
    if row["CVDSTRK3"] == 1:
        risk += 1
    if row["BPHIGH4"] == 1:
        risk += 1

    if risk == 0:
        return "Normal"
    elif risk <= 2:
        return "Warning"
    else:
        return "High Risk"

df["health_risk"] = df.apply(risk_label, axis=1)


le = LabelEncoder()
df["health_risk"] = le.fit_transform(df["health_risk"])

X = df.drop("health_risk", axis=1)
y = df["health_risk"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

joblib.dump(model, "health_model.pkl")
# Save feature names
joblib.dump(X.columns.tolist(), "features.pkl")

# Save label mapping
label_mapping = dict(zip(le.classes_, le.transform(le.classes_)))
joblib.dump(label_mapping, "label_mapping.pkl")

print("Features and label mapping saved.")

print("Model training completed and saved.")
