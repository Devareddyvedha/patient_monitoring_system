from flask import Flask, request, jsonify, render_template_string
import joblib
import pandas as pd
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "health_model.pkl")
model = joblib.load(MODEL_PATH)

# -------------------------
# Home page (Browser UI)
# -------------------------
@app.route("/")
def home():
    return render_template_string("""
    <h2>Patient Health Risk Prediction</h2>
    <form method="post" action="/predict-browser">
        General Health: <input type="number" name="GENHLTH"><br><br>
        Diabetes (1/0): <input type="number" name="DIABETE3"><br><br>
        Heart Disease (1/0): <input type="number" name="CVDCRHD4"><br><br>
        Stroke (1/0): <input type="number" name="CVDSTRK3"><br><br>
        High BP (1/0): <input type="number" name="BPHIGH4"><br><br>
        BMI: <input type="number" step="0.1" name="_BMI5"><br><br>
        Smoker (1/0): <input type="number" name="SMOKE100"><br><br>
        Age Group: <input type="number" name="_AGEG5YR"><br><br>
        Sex (1=Male,2=Female): <input type="number" name="SEX"><br><br>
        <button type="submit">Predict</button>
    </form>
    """)

# -------------------------
# Browser prediction route
# -------------------------
@app.route("/predict-browser", methods=["POST"])
def predict_browser():
    data = {k: float(v) for k, v in request.form.items()}
    df = pd.DataFrame([data])

    pred = model.predict(df)[0]
    result = {0: "Normal", 1: "Warning", 2: "High Risk"}

    return f"<h3>Predicted Health Risk: {result[pred]}</h3>"

# -------------------------
# API route (Thunder Client)
# -------------------------
@app.route("/predict", methods=["POST"])
def predict_api():
    data = request.json
    df = pd.DataFrame([data])

    pred = model.predict(df)[0]
    result = {0: "Normal", 1: "Warning", 2: "High Risk"}

    return jsonify({"health_risk": result[pred]})

if __name__ == "__main__":
    app.run(debug=True)
