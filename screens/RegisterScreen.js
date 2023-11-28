import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Input from "../components/Input";
import Header from "../components/Header";

function RegisterScreen({ route, navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [borough, setBorough] = useState("");

  async function createUser() {
    if (name && username && password && borough) {
      const user = { Name: name, Username: username, Password: password, Borough: borough };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };

      const response = await fetch(global.API_URL + "/api/user/new", requestOptions);
      const respData = await response.json();

      if (respData.insertID) {
        alert("The user has been created. You may log in now!")
        navigation.navigate('Login')
      }
      else {
        alert("There was an error while creating the user!")
      }
    }
    else {
      alert("All fields are required!")
    }

  }

  return (
    <ScrollView style={styles.container}>

      <Header value="CREATE ACCOUNT" />

      <Input inputvalue={setName} value={name} label="Name" />
      <Input inputvalue={setUsername} value={username} label="Username" />
      <Input inputvalue={setPassword} value={password} hidePassword={true} label="Password" />
      <Input inputvalue={setBorough} value={borough} label="Borough" />

      <Button mode="contained" icon="login" onPress={() => { createUser() }} style={{ margin: 20 }} labelStyle={{ fontSize: 25 }}>Register</Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default RegisterScreen;
