from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import time
import threading
import math
import pyttsx3
from datetime import datetime

# -------------------------
# Flask App
# -------------------------
app = Flask(__name__)
CORS(app)

# -------------------------
# Paths
# -------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "health_model.pkl")
FEATURES_PATH = os.path.join(BASE_DIR, "features.pkl")
DATA_PATH = os.path.join(BASE_DIR, "live_patient_data.csv")
HISTORY_PATH = os.path.join(BASE_DIR, "patient_history.csv")

# -------------------------
# Load model
# -------------------------
model = joblib.load(MODEL_PATH)
features = joblib.load(FEATURES_PATH)

RISK_LABELS = {0: "Normal", 1: "Warning", 2: "High Risk"}

# -------------------------
# Nearby hospitals (LAT, LON)
# -------------------------
HOSPITALS = [
    {
        "name": "City Care Hospital",
        "doctor": "Dr. Arun (Cardiologist)",
        "lat": 12.9750,
        "lon": 77.6000,
        "phone": "9876543210"
    },
    {
        "name": "Green Life Medical Center",
        "doctor": "Dr. Meena (General Physician)",
        "lat": 12.9600,
        "lon": 77.5800,
        "phone": "9123456780"
    },
    {
        "name": "Apollo Clinic",
        "doctor": "Dr. Ravi (Internal Medicine)",
        "lat": 13.0200,
        "lon": 77.6400,
        "phone": "9988776655"
    }
]

# -------------------------
# Geo-distance (Haversine)
# -------------------------
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) ** 2 + \
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * \
        math.sin(dlon / 2) ** 2
    return R * 2 * math.asin(math.sqrt(a))

def nearby_hospitals(patient_lat, patient_lon, radius_km=5):
    nearby = []
    for h in HOSPITALS:
        dist = haversine(patient_lat, patient_lon, h["lat"], h["lon"])
        if dist <= radius_km:
            h_copy = h.copy()
            h_copy["distance_km"] = round(dist, 2)
            nearby.append(h_copy)
    return nearby

# -------------------------
# Automatic Evaluation
# -------------------------
def auto_evaluate():
    if not os.path.exists(DATA_PATH):
        return {"error": "Live patient data not available"}

    df = pd.read_csv(DATA_PATH)
    latest = df.tail(1)

    # Safety check
    for col in features + ["LAT", "LON"]:
        if col not in latest.columns:
            return {"error": f"Missing column: {col}"}

    patient_features = latest[features]
    patient_lat = float(latest["LAT"].values[0])
    patient_lon = float(latest["LON"].values[0])

    pred = model.predict(patient_features)[0]
    proba = model.predict_proba(patient_features)[0]
    risk = RISK_LABELS[pred]

    # -------------------------
    # SAFE FIXED SCHEMA HISTORY
    # -------------------------
    record = {
        "GENHLTH": patient_features.iloc[0]["GENHLTH"],
        "DIABETE3": patient_features.iloc[0]["DIABETE3"],
        "CVDCRHD4": patient_features.iloc[0]["CVDCRHD4"],
        "CVDSTRK3": patient_features.iloc[0]["CVDSTRK3"],
        "BPHIGH4": patient_features.iloc[0]["BPHIGH4"],
        "_BMI5": patient_features.iloc[0]["_BMI5"],
        "SMOKE100": patient_features.iloc[0]["SMOKE100"],
        "_AGEG5YR": patient_features.iloc[0]["_AGEG5YR"],
        "SEX": patient_features.iloc[0]["SEX"],
        "Risk": risk,
        "Timestamp": datetime.now()
    }

    record_df = pd.DataFrame([record])
    record_df.to_csv(
        HISTORY_PATH,
        mode="a",
        header=not os.path.exists(HISTORY_PATH),
        index=False
    )

    # Voice alert
    if pred == 2:
        try:
            engine = pyttsx3.init()
            engine.say("High health risk detected. Please seek medical attention.")
            engine.runAndWait()
        except Exception:
            pass

    hospitals = nearby_hospitals(patient_lat, patient_lon)

    return {
        "risk": risk,
        "probability": {
            "Normal": round(proba[0] * 100, 2),
            "Warning": round(proba[1] * 100, 2),
            "High Risk": round(proba[2] * 100, 2)
        },
        "nearby_hospitals": hospitals
    }

# -------------------------
# Patient Trend Analysis (SAFE)
# -------------------------
def patient_trend():
    if not os.path.exists(HISTORY_PATH):
        return "No history available"

    df = pd.read_csv(HISTORY_PATH)
    df = df.dropna(subset=["Risk"])

    recent = df.tail(5)["Risk"].tolist()

    if recent.count("High Risk") >= 3:
        return "🚨 Increasing risk trend"
    elif "High Risk" in recent:
        return "⚠️ Occasional high risk"
    return "✅ Stable condition"

# -------------------------
# Continuous Monitoring
# -------------------------
def continuous_monitoring(interval=300):
    print("🟢 Continuous monitoring started")
    while True:
        try:
            auto_evaluate()
        except Exception as e:
            print("Monitoring error:", e)
        time.sleep(interval)

monitor_thread = threading.Thread(
    target=continuous_monitoring,
    daemon=True
)
monitor_thread.start()

# -------------------------
# API Endpoints
# -------------------------
@app.route("/")
def status():
    return jsonify({"status": "Patient Monitoring System Running"})

@app.route("/dashboard")
def dashboard():
    return jsonify({
        "latest": auto_evaluate(),
        "trend": patient_trend()
    })

# -------------------------
# Run App
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)
