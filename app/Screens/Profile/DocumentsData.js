import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { DocumentsPicture } from "../../Components/ProfilePicture";
import { Button } from "react-native-paper";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
export const DocumentsData = ({ route }) => {
  const navigation = useNavigation();
  let InfoPersonal = [];
  InfoPersonal = route.params.InfoPersonal;
  const [firstName, setFirstName] = React.useState(InfoPersonal.firstName);
  const [lastName, setLastName] = React.useState(InfoPersonal.lastName);
  const [Id, setId] = React.useState(InfoPersonal.id);
  // PERMISOS PARA INGRESAR AL ALMACENAMIENTO
  const [imageUser, setImageUser] = React.useState(global.picture);
  const [data, setData] = React.useState([]);

  const [status, requestPermission] = useMediaLibraryPermissions();

  const chooseFile = async () => {
    let options = {
      mediaTypes: MediaTypeOptions.Images,
    };
    let response = await launchImageLibraryAsync(options);
    setImageUser(response.uri);
  };
  // ENLACE CON FIREBASE
  const uploadFile = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageUser, true);
      xhr.send(null);
    });

    const storage = getStorage();
    let nameFile = "Profile_" + firstName + lastName + "_" + Id;

    var d = new Date();
    let mes = d.getMonth() + 1;
    const fileStorage = ref(storage, "Profile/" + nameFile + ".jpg");
    const uploadResult = await uploadBytes(fileStorage, blob);

    blob.close();

    const url = await getDownloadURL(fileStorage);
    global.picture = url;
    console.log(global.picture);
  };
  // SUBIR DATOS A LA BASE //
  const saveData = async () => {
    if (imageUser == null || imageUser != null) {
      await uploadFile();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <DocumentsPicture />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {firstName} {lastName}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          DESAROLLADOR
        </Text>
      </View>
      <View style={styles.containerBottom}>
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="archive"
            style={styles.buttonStyle}
            mode="contained"
            onPress={() => console.log("Subir Documentos")}
          >
            Guardar
          </Button>
          <Button
            icon="close-outline"
            style={styles.buttonStyle}
            mode="contained"
            onPress={() => navigation.goBack()}
          >
            Volver
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerScroll: {
    width: Dimensions.get("window").width / 1.2,
  },
  containerBottom: {
    flex: 1,
    justifyContext: "center",
    alignItems: "center",
    paddingBottom: 100,
    paddingTop: 50,
    marginBottom: 30,
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#3D3D3D",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 24,
    shadowColor: "white",
    shadowOpacity: 1,
  },
  viewTextInput: {
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.5,
  },
  inputContainer: {
    padding: 7,
  },
  textInfo: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInfo2: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  textTittle: {
    fontSize: 17,
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
  },
  buttonStyle: {
    borderRadius: 15,
    margin: 10,
    width: Dimensions.get("window").width / 2.5,
    backgroundColor: "#6DC0D5",
  },
});
