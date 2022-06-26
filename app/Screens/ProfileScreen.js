import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ProfilePicture } from "../Components/ProfilePicture";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { getPersonalInformation } from "../Services/UserInformation/InfoUser";
import { getDocumentsData } from "../Services/UserInformation/DocumentsUser";
// NAVIGATIONS IMPORT
export const Profile = () => {
  const navigation = useNavigation();
  const [personalInformation, setPersonalInformation] = React.useState([]);
  const [documentsInformation, setDocumentsInformation] = React.useState([]);
  const getInformations = (information) => {
    setPersonalInformation(information);
  };
  const getDocuments = (documentation) => {
    setDocumentsInformation(documentation);
  }
  React.useEffect(() => {
    getPersonalInformation(getInformations);
    getDocumentsData(getDocuments)
  }, []);

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
  let ExtraMenu = () => {
    return (
      <View>
        <View>
          <View style={styles.picture}>
            <ProfilePicture />
          </View>
          <Text style={styles.textPerfil2}>
            {global.name} {global.lastName}
          </Text>
          <Text style={styles.textPerfil}>{global.workStation}</Text>
        </View>
        <View style={styles.viewPerfil}>
          <View>
            <Ionicons name={"person"} size={35} color={"#6DC0D5"} />
          </View>
          <View>
            <Text style={styles.textMenu}>Mi perfil</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SHOWDATA", {
                  InfoPersonal: personalInformation[0],
                });
              }}
            >
              <Ionicons
                name={"arrow-forward-circle-outline"}
                size={35}
                color={"#6DC0D5"}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
        {/* VISTA DE LOS DOCUMENTOS */}
        <View style={styles.viewDocuments}>
          <View>
            <Ionicons name={"save"} size={35} color={"#6DC0D5"} />
          </View>
          <View>
            <Text style={styles.textMenuDocuments}>Subir archivos</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DOCUMENTS", {
                  InfoDocument: documentsInformation[0],
                });
              }}
            >
              <Ionicons
                name={"arrow-forward-circle-outline"}
                size={35}
                color={"#6DC0D5"}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
        {/* VISTA DEL DESCONECTARSE */}
        <View style={styles.viewExit}>
          <View>
            <Ionicons name={"ios-exit-outline"} size={35} color={"#6DC0D5"} />
          </View>
          <View>
            <Text style={styles.textMenuExit}>Desconectarse</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                cerrar();
              }}
            >
              <Ionicons
                name={"arrow-forward-circle-outline"}
                size={35}
                color={"#6DC0D5"}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.textProfile}> MI PERFIL PERSONAL </Text>
      </View>
      <View style={styles.container3}>
        <ExtraMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // CONTAINER GENERAL //
  //----------------------------------------//
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  // CIRCULO //
  //CONTAINER NEGRO Y BLANCO//
  //----------------------------------------//
  container2: {
    flex: 2,
    position: "relative",
    backgroundColor: "#3D3D3D",
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 20,
    width: Dimensions.get("window").width,
    borderBottomStartRadius: 20,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
  },
  container3: {
    flex: 2,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width / 1.2,
    backgroundColor: "white",
    borderRadius: 20,
    bottom: 140,
    minHeight: Dimensions.get("window").height / 5,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
  },
  //----------------------------------------//
  // PICTURE PROFILE //
  picture: {
    alignItems: "center",
  },
  viewPerfil: {
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.5,
    minHeight: Dimensions.get("window").height / 10,
    paddingHorizontal: Dimensions.get("window").width / 200,
  },
  viewDocuments: {
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.5,
    minHeight: Dimensions.get("window").height / 10,
    paddingHorizontal: Dimensions.get("window").width / 200,
  },
  viewExit: {
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.5,
    minHeight: Dimensions.get("window").height / 10,
    paddingHorizontal: Dimensions.get("window").width / 200,
  },
  // ----------------------------------//
  // CONTENEDOR DE LA VISTA INICIAL //
  textPerfil: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 25,
  },
  textPerfil2: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  // EDICION DE LOS COMPONENTES //
  textMenu: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6DC0D5",
    textAlign: "center",
    paddingHorizontal: Dimensions.get("window").width / 7,
  },
  textMenuDocuments: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6DC0D5",
    textAlign: "center",
    paddingHorizontal: Dimensions.get("window").width / 14,
  },
  textMenuExit: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6DC0D5",
    textAlign: "center",
    paddingHorizontal: Dimensions.get("window").width / 16,
  },
  // TEXT DE LA PANTALLA NEGRA //
  textProfile: {
    textAlign: "center",
    color: "#6DC0D5",
    fontWeight: "bold",
    fontSize: 30,
    bottom: 60,
  },
});
