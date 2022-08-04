import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Icon } from "react-native-elements";
import { Input } from "@rneui/themed";
import { getAuth, signOut, updatePassword } from "firebase/auth";
// NAVIGATIONS IMPORT
export const PasswordScreen = ({ route }) => {
  const navigation = useNavigation();
  const [password1, setPassword1] = React.useState();
  const [password2, setPassword2] = React.useState();
  const [active, setActive] = React.useState(false);
  const [information, setInformation] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [change2, setChange2] = React.useState(false);
  React.useEffect(() => {
    if (validateCorrectPassword(password1) == true) {
      setInformation(true);
      if (password1 !== password2 || password1 == null || password2 == null) {
        setActive(true);
      } else {
        setActive(false);
      }
    } else {
      setInformation(false);
      setActive(true);
    }
  });
  const validateCorrectPassword = (password) => {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return re.test(password);
  };
  let Information = () => {
    return (
      <>
        <Text style={styles.textError}>*Es muy debil</Text>
        <Text style={styles.textError}>
          *Debe tener 6 caracteres entre mayuscular y minusculas
        </Text>
        <Text style={styles.textError}>
          *Debe contener algun caracter especial: ! @ # $ % ^ & *
        </Text>
      </>
    );
  };
  const cerrar = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("LOGINS");
        global.email=null;
        global.password=null;
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const resetUserPassword = async (password) => {
    const auth = getAuth();
    const user = auth.currentUser;
    updatePassword(user, password).then(() => {
      console.log("SI FUNCIONO")
      cerrar();
    }).catch((error) => {
        console.log("No funciono", error)
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View>
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

        <View style={{ flexDirection: "row" }}></View>
      </View>
      <View style={styles.container2}>
        <View
          style={{
            paddingTop: Dimensions.get("window").height / 30,
          }}
        >
          <Text style={styles.textInfo}>CAMBIAR CONTRASEÑA</Text>
        </View>
        <View
          style={{
            paddingTop: Dimensions.get("window").height / 30,
          }}
        >
          <Icon
            name="key-alert"
            type="material-community"
            color="#6DC0D5"
            size={Dimensions.get("window").width / 5}
          />
        </View>
        <View>{information == true ? <></> : <Information></Information>}</View>
        <View style={styles.viewTextInput}>
          <View
            style={{
              width: Dimensions.get("window").width / 1.1,
              paddingVertical: Dimensions.get("window").height / 45,
            }}
          >
            <TextInput
              label="Nueva contraseña"
              mode="outlined"
              secureTextEntry={!change}
              activeOutlineColor="black"
              left={<TextInput.Icon name="lock" color="#6DC0D5" />}
              right={
                <TextInput.Icon
                  onPress={() => {
                    setChange(!change);
                  }}
                  name="eye"
                  color="#6DC0D5"
                />
              }
              onChangeText={(password1) => setPassword1(password1)}
              style={{ backgroundColor: "white" }}
              activeUnderlineColor="black"
              underlineColor="black"
              theme={{ colors: { text: "black", placeholder: "black" } }}
            />
          </View>
        </View>
        <View style={styles.viewTextInput}>
          <View
            style={{
              width: Dimensions.get("window").width / 1.1,
              paddingBottom: Dimensions.get("window").height / 45,
            }}
          >
            <TextInput
              label="Repite la contraseña"
              mode="outlined"
              secureTextEntry={!change2}
              activeOutlineColor="black"
              left={<TextInput.Icon name="lock" color="#6DC0D5" />}
              right={
                <TextInput.Icon
                  onPress={() => {
                    setChange2(!change2);
                  }}
                  name="eye"
                  color="#6DC0D5"
                />
              }
              onChangeText={(password2) => setPassword2(password2)}
              style={{ backgroundColor: "white" }}
              activeUnderlineColor="black"
              underlineColor="black"
              theme={{ colors: { text: "black", placeholder: "black" } }}
            />
          </View>
        </View>
        <Button
          icon="archive"
          disabled={active}
          color="#6DC0D5"
          labelStyle={{ color: "white" }}
          style={styles.buttonStyle}
          mode="contained"
          onPress={async () => {
            resetUserPassword(password2);
          }}
        >
          Guardar
        </Button>
        <View style={{ paddingVertical: Dimensions.get("window").height / 50 }}>
          {active == true ? (
            <Text style={styles.textError}>No son iguales</Text>
          ) : (
            <Text style={styles.textConfirmation}>Son iguales</Text>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container3: {
    minHeight: Dimensions.get("window").height / 5,
    justifyContent: "center",
    backgroundColor: "#3D3D3D",
    alignItems: "center",
    width: Dimensions.get("window").width,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    shadowColor: "black",
  },
  container2: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: Dimensions.get("window").width / 35,
  },
  textSubtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2FDAA7",
    paddingVertical: Dimensions.get("window").width / 35,
  },
  buttonSubtittleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  viewTextInput: {
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.1,
  },
  textInfo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    padding: 7,
    marginLeft: Dimensions.get("window").width / 30,
  },
  buttonStyle: {
    borderRadius: 15,
    width: Dimensions.get("window").width / 1.5,
  },
  textError: {
    color: "red",
    fontWeight: "bold",
    fontSize: 10,
  },
  textConfirmation: {
    color: "#6DC0D5",
    fontWeight: "bold",
    fontSize: 15,
  },
});
