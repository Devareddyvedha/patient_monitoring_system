import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function LineRiskChart() {
  return (
    <LineChart
      data={{
        labels:["Mon","Tue","Wed","Thu","Fri"],
        datasets:[{data:[1,2,1,3,2]}]
      }}
      width={Dimensions.get("window").width-280}
      height={220}
      chartConfig={{
        color:()=>"#4f7cff",
        backgroundGradientFrom:"#fff",
        backgroundGradientTo:"#fff"
      }}
    />
  );
}
