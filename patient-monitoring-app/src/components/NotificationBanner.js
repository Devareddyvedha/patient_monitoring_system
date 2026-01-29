import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NotificationBanner({ message }) {
  if (!message) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>🚨 {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  }
});
