import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HospitalList({ hospitals }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Nearby Hospitals</Text>

      {hospitals.length === 0 && (
        <Text>No hospitals in geo-fence</Text>
      )}

      {hospitals.map((h, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.name}>🏥 {h.name}</Text>
          <Text>{h.doctor}</Text>
          <Text>{h.distance_km} km away</Text>
          <Text>📞 {h.phone}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10
  },
  item: {
    marginBottom: 12
  },
  name: {
    fontWeight: "bold"
  }
});
