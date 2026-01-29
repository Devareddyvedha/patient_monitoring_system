import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text } from "react-native";

export default function TrendChart({ history }) {
  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
        Risk Trend (Last Records)
      </Text>
      <LineChart
        data={{
          labels: history.map((_, i) => `T${i + 1}`),
          datasets: [{ data: history }]
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#e74c3c"
        }}
      />
    </View>
  );
}
