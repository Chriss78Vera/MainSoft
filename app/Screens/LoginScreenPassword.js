import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { ModalReload } from "../Components/Modal";
import { ModalInfoError } from "../Components/Modals";
import { getPersonalRol } from "../Services/UserInformation/InfoUser";
export const LoginScreenPassword = ({ route }) => {
  // AUTH CON FIREBASE
  const auth = getAuth();
  // REACT NAVIGATION
  let UserEmail = null;
  UserEmail = route.params.UserEmail;
  // VARIABLES USADAS
  const [emailUser, setEmailUser] = React.useState(UserEmail);
  const [password, setPassword] = React.useState();
  const [active, setActive] = React.useState(false);
  const [change, setChange] = React.useState(false);
  // PERSONAL INFORMATION
  const [stateModal, setStateModal] = React.useState(false);
  const navigation = useNavigation();
 
  return (
    <View style={styles.container}>   

      <View style={styles.containerTop}>
        <View style={styles.containerLogo}>
          <Image source={require("../../Resources/Images/logo.png")} />
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
            secureTextEntry={!change}
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
            {change == true ? "OCULTAR CONTRASEÑA" : "MOSTRAR CONTRASEÑA"}
          </Button>
          <ModalReload modalVisible={stateModal} textModal={"Iniciando Sesion"} />
        </View>
        <Button
          mode="contained"
          color={"#6DC0D5"}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={() => {
            
            signInWithEmailAndPassword(auth, emailUser, password)
              .then(async (userCredential) => {
                setStateModal(true)
                global.email = emailUser;
               await getPersonalRol();
               navigation.navigate("TIMER");
               setStateModal(false)
              })
              .catch((error) => {
                console.log(error);
                setActive(true);
              });
          }}
        >
          INICIAR SESSION
        </Button>
        <Button
          icon={(20, "arrow-left")}
          labelStyle={[styles.buttonSubtittleStyle, { color: "white" }]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          VOLVER
        </Button>
      </View >
      <ModalInfoError
        modalVisible={active}
        setModalVisible={setActive}
        message={"CREDENCIALES ERRONEAS"}
        description={"REVISA LAS CREDENCIALES DE ACCESO"}
      ></ModalInfoError>
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  textLogoBottom: {
    marginTop: 45,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  textLogoBottom2: {
    marginBottom: 15,
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
    fontSize: 15,
  },
});
