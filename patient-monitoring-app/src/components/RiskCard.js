import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RiskCard({ risk, trend }) {
  const config = {
    "High Risk": { color: "#e74c3c", icon: "🚨", bg: "#fdecea" },
    "Warning": { color: "#f39c12", icon: "⚠️", bg: "#fff4e5" },
    "Normal": { color: "#27ae60", icon: "✅", bg: "#eafaf1" }
  };

  const { color, icon, bg } = config[risk];

  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Text style={styles.label}>Current Health Status</Text>

      <Text style={[styles.risk, { color }]}>
        {icon} {risk}
      </Text>

      <Text style={styles.trend}>
        Trend: {trend}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20
  },
  label: {
    fontSize: 13,
    color: "#7f8c8d"
  },
  risk: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 8
  },
  trend: {
    fontSize: 14,
    color: "#34495e"
  }
});
