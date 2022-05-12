import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
export const LoginScreen = () => {
  // VARIABLES USADAS 
  const [emailUser, setEmailUser] = React.useState();
  const [password, setPassword] = React.useState();
  const [active, setActive] = React.useState(false);
  // REACT NAVIGATION 
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require("../Resources/Images/logo.png")} />
        <Text style={styles.textLogo}> Welcome to MainSoft </Text>
      </View>
      <TextInput
        mode="outlined"
        value={emailUser}
        onChangeText={setEmailUser}
        label="Email"
        placeholder="Enter your email"
        left={
          <TextInput.Icon
            name="email"
            color="#6DC0D5"
            style={{ marginTop: 15 }}
          />
        }
        style={styles.textInput}
        outlineColor={"#3D3D3D"}
        selectionColor={"#6DC0D5"}
        activeOutlineColor={"#3D3D3D"}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        left={
          <TextInput.Icon
            name="lock"
            color="#6DC0D5"
            style={{ marginTop: 15 }}
          />
        }
        style={styles.textInput}
        outlineColor={"#3D3D3D"}
        selectionColor={"#6DC0D5"}
        activeOutlineColor={"#3D3D3D"}
      />
      <Button
        icon="login"
        mode="contained"
        color="#6DC0D5"
        style={styles.styleButton}
        labelStyle={styles.textButton}
        loading={active}
        onPress={() => {
          console.log("Waiting for login services!!"), setActive(!active) , navigation.navigate("TIMER")
        }}
      >
        Sing In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  textInput: {
    width: 300,
    height: 50,
    marginBottom: 20,
  },
  textButton: {
    color: "white",
  },
  styleButton: {
    marginTop: 15,
    width: 175,
  },
  textLogo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
});
