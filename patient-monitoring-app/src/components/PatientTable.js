import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PatientTable() {
  const patients = [
    {name:"Ethan",risk:"High Risk"},
    {name:"Liam",risk:"Warning"},
    {name:"Sophia",risk:"Normal"}
  ];

  return (
    <View>
      {patients.map((p,i)=>(
        <View key={i} style={styles.row}>
          <Text>{p.name}</Text>
          <Text style={styles[p.risk.replace(" ","")]}>
            {p.risk}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",justifyContent:"space-between",padding:10},
  HighRisk:{color:"#ef4444"},
  Warning:{color:"#facc15"},
  Normal:{color:"#22c55e"}
});
