import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { ModalInfoError } from "../Components/Modals";
import NetInfo from "@react-native-community/netinfo";
import { Icon } from "react-native-elements";
export const LoginScreenMail = () => {
  // VARIABLES USADAS
  const [emailUser, setEmailUser] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [internet, setInternet] = React.useState();

  // REACT NAVIGATION
  const navigation = useNavigation();
  // VALIDATION EMAIL ///
  var validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      setInternet(state.isConnected);
    });
  });
  let BotonValidator = () =>{
    if(internet == true){
      return(
        <>
            <Button
          mode="contained"
          color={"#6DC0D5"} 
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={() => {
            if (emailUser == null) {
              setActive(true);
            } else {
              let validation = validateEmail(emailUser);
              if (validation) {
                navigation.navigate("LOGINPASSWORD", { UserEmail: emailUser });
              } else {
                setActive(true);
              }
            }
          }}
        >
          CONTINUAR
        </Button></>
      )
    }else{
      return(
        <View style={{alignItems: "center", paddingTop: Dimensions.get("window").height/40 }}>
          <Icon name="radio" type="ionicon" size={50} color="#E85D75" />
          <Text style={{fontWeight: "bold", color:"#E85D75", fontSize: 15}}>Es necesario permanecer conectado a internet</Text>
        </View>
      )
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.containerLogo}>
          <Image source={require("../../Resources/Images/logo.png")} />
          <Text style={styles.textLogo}>BIENVENIDO A MAINSOFT!</Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.textLogoBottom}>
          INGRESA TU CORREO ELECTRONICO!
        </Text>
        <View style={styles.textInput}>
          <TextInput
            label="Email"
            disabled={!internet}
            mode="outlined"
            activeOutlineColor="white"
            left={<TextInput.Icon name="email" color="#6DC0D5" />}
            onChangeText={setEmailUser}
            style={{ backgroundColor: "#3D3D3D" }}
            activeUnderlineColor="white"
            underlineColor="white"
            theme={{ colors: { text: "white", placeholder: "white" } }}
          />
        </View>
        <BotonValidator></BotonValidator>
        <ModalInfoError
          modalVisible={active}
          setModalVisible={setActive}
          message={"EMAIL ERRONEO"}
          description={"VUELVE A INGRESAR"}
        ></ModalInfoError>
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
    marginTop: 20,
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
    marginTop: 30,
    width: Dimensions.get("window").width / 1.5,
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
});
