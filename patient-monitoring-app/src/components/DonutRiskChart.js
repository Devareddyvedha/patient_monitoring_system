import React from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function DonutRiskChart() {
  return (
    <PieChart
      data={[
        {name:"Normal",population:40,color:"#22c55e"},
        {name:"Warning",population:30,color:"#facc15"},
        {name:"High Risk",population:30,color:"#ef4444"}
      ]}
      width={Dimensions.get("window").width-280}
      height={200}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
  );
}
