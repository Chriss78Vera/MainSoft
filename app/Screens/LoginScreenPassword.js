import { useNavigation } from "@react-navigation/native";
import {
  EmailAuthProvider,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { ModalReload } from "../Components/Modal";
import { ModalInfoError, ModalInfoConfirmation } from "../Components/Modals";
import { createTask } from "../Services/TimerRegister/TimerUser";
import {
  getDocumentsData,
  getPersonalRol,
} from "../Services/UserInformation/InfoUser";
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
  const [email, setEmail] = React.useState(false);
  const [activeConfirmation, setActiveConfirmation] = React.useState(false);
  const [change, setChange] = React.useState(false);
  // PERSONAL INFORMATION
  const [stateModal, setStateModal] = React.useState(false);
  const navigation = useNavigation();
  const recuperarContraseña = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        
        setActiveConfirmation(true);
      })
      .catch((error) => {
    
      });
  };
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
            right={
              <TextInput.Icon
                onPress={() => {
                  setChange(!change);
                }}
                name="eye"
                color="#6DC0D5"
              />
            }
            style={{ backgroundColor: "#3D3D3D" }}
            activeUnderlineColor="white"
            underlineColor="white"
            theme={{ colors: { text: "white", placeholder: "white" } }}
          />
          <Button
            labelStyle={[styles.buttonSubtittleStyle, { color: "white" }]}
            onPress={() => {
              recuperarContraseña(emailUser);
            }}
          >
            OLVIDASTE TU CONTRASEÑA
          </Button>
          <ModalReload
            modalVisible={stateModal}
            textModal={"Iniciando Sesión"}
          />
        </View>
        <Button
          mode="contained"
          color={"#6DC0D5"}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={() => {
            signInWithEmailAndPassword(auth, emailUser, password)
              .then(async (userCredential) => {
                if(userCredential.user.emailVerified==false){
                  setEmail(true);
                  setActive(true);
                }else{
                  setStateModal(true);
                  setEmail(false);
                  global.email = emailUser;
                  await getPersonalRol();
                  if (global.rol == "Empleado") {
                    await getDocumentsData();
                    await createTask();
                    navigation.navigate("TIMER");
                    setStateModal(false);
                  } else {
                    navigation.navigate("LOGINS");
                    setStateModal(false);
                  }
                }
              })
              .catch((error) => {
                setEmail(false);
             
                setActive(true);
                setStateModal(false);
              });
          }}
        >
          INICIAR SESIÓN
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
      </View>
      <ModalInfoError
        modalVisible={active}
        setModalVisible={setActive}
        message={"ACCESO ERRÓNEO"}
        description={email==true? "Verifica tu correo, en la bandeja de Spam o No deseados":"Revisa tus credenciales de acesso"}
      ></ModalInfoError>
      <ModalInfoConfirmation
        modalVisible={activeConfirmation}
        setModalVisible={setActiveConfirmation}
        message={"CORREO ENVIADO: " + emailUser}
        description={"Revisa la bandeja de Spam o No deseados"}
      ></ModalInfoConfirmation>
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
    paddingTop: Dimensions.get("window").height / 70,
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
    marginTop: Dimensions.get("window").height/200,
    textShadowColor: "rgba(0,0,0,0.25) 100%",
    textShadowOffset: { width: 0, height: 2.5 },
    textShadowRadius: 1,
    fontSize: Dimensions.get("window").width/15,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  textLogoBottom: {
    marginTop: Dimensions.get("window").height/200,
    fontSize: Dimensions.get("window").width/20,
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
