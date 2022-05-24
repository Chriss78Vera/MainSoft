import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
export const LoginScreenPassword = ({ route }) => {
  // REACT NAVIGATION
  let UserEmail = null;
  UserEmail = route.params.UserEmail;
  // VARIABLES USADAS
  const [emailUser, setEmailUser] = React.useState(UserEmail);
  const [password, setPassword] = React.useState();
  const [active, setActive] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.containerLogo}>
          <Image source={require("../Resources/Images/logo.png")} />
          <Text style={styles.textLogo}>BIENVENIDO A MAINSOFT!</Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.textLogoBottom}>BIENVENIDO!</Text>
        <Text style={styles.textLogoBottom2}>{emailUser}</Text>
        <View style={styles.textInput}>
          <TextInput
            label="Contraseña"
            mode="outlined"
            secureTextEntry={change}
            activeOutlineColor="white"
            left={<TextInput.Icon name="lock" color="#6DC0D5" />}
            onChangeText={(password) => setPassword(password)}
            style={{ backgroundColor: "#3D3D3D" }}
            activeUnderlineColor="white"
            underlineColor="white"
            theme={{ colors: { text: "white", placeholder: "white" } }}
          />
          <Button
            icon={"eye"}
            color={"#6DC0D5"}
            labelStyle={styles.buttonTextStyle}
            onPress={() => {
              setChange(!change);
            }}
          >
            MOSTRAR CONTRASEÑA
          </Button>
        </View>
        <Button
          mode="contained"
          color={"#6DC0D5"}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={() => {
            console.log("USER: ", emailUser);
            console.log("PASSWORD: ", password);
            navigation.navigate("TIMER");
          }}
        >
          INICIAR SESSION
        </Button>
        <Button
          icon={(20, "arrow-left")}
          labelStyle={styles.buttonSubtittleStyle}
          onPress={() => {
            navigation.goBack();
          }}
        >
          VOLVER
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D3D3D",
  },
  containerBottom: {
    flex: 1,
    justifyContext: "center",
    alignItems: "center",
    padding: 16,
  },
  containerTop: {
    flex: 1,
    backgroundColor: "white",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 24,
    shadowColor: "white",
    shadowOpacity: 1,
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 45,
    textShadowColor: "rgba(0,0,0,0.25) 100%",
    textShadowOffset: { width: 0, height: 2.5 },
    textShadowRadius: 1,
    fontSize: 25,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  textLogoBottom: {
    marginTop: 45,
    textShadowColor: "rgba(255,255,255,0.5583275546546744) 25%",
    textShadowOffset: { width: 0, height: 2.5 },
    textShadowRadius: 1,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  textLogoBottom2: {
    marginBottom: 15,
    textShadowColor: "rgba(255,255,255,0.5583275546546744) 25%",
    textShadowOffset: { width: 0, height: 2.5 },
    textShadowRadius: 1,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  buttonStyle: {
    borderRadius: 15,
    marginTop: 50,
    width: Dimensions.get("window").width / 1.5,
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  buttonSubtittleStyle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
});
