import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function ProbabilityChart({ probability }) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📊 Health Risk Probability</Text>
      <Text style={styles.subtitle}>
        Chance of each risk category (%)
      </Text>

      <BarChart
        data={{
          labels: ["Normal", "Warning", "High Risk"],
          datasets: [{
            data: [
              probability.Normal,
              probability.Warning,
              probability["High Risk"]
            ]
          }]
        }}
        width={screenWidth - 40}
        height={260}
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          barPercentage: 0.6,
          color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
          labelColor: () => "#2c3e50",
          propsForBackgroundLines: {
            stroke: "#ecf0f1"
          }
        }}
        style={{
          borderRadius: 16,
          marginTop: 16
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50"
  },
  subtitle: {
    fontSize: 13,
    color: "#7f8c8d",
    marginTop: 4
  }
});
