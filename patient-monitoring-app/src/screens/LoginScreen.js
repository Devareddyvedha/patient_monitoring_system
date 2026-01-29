import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { googleLogin, emailLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Health Monitoring System</Text>

        <TextInput placeholder="Email" style={styles.input}
          value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input}
          value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.primary}
          onPress={() => emailLogin(email, password)}>
          <Text style={styles.btnText}>Sign in with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.google}
          onPress={googleLogin}>
          <Text style={styles.btnText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#eef3f8"},
  card:{width:380,backgroundColor:"#fff",padding:30,borderRadius:16},
  title:{fontSize:22,fontWeight:"bold",marginBottom:20},
  input:{borderWidth:1,borderColor:"#ddd",borderRadius:8,padding:10,marginBottom:12},
  primary:{backgroundColor:"#4f7cff",padding:12,borderRadius:8,marginBottom:10},
  google:{backgroundColor:"#db4437",padding:12,borderRadius:8},
  btnText:{color:"#fff",textAlign:"center",fontWeight:"bold"}
});
