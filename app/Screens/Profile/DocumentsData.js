import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { DocumentsPicture } from "../../Components/ProfilePicture";
import { Button, IconButton } from "react-native-paper";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import { saveDocumentPersonal } from "../../Services/UserInformation/DocumentsUser";
import { ModalReload } from "../../Components/Modal";
import { getAuth, signOut } from "firebase/auth";
export const DocumentsData = ({ route }) => {
  const navigation = useNavigation();
  let InfoDocument = null;
  InfoDocument = route.params.InfoDocument;
  const [firstName, setFirstName] = React.useState(global.name);
  const [lastName, setLastName] = React.useState(global.lastName);
  // PERMISOS PARA INGRESAR AL ALMACENAMIENTO
  const [documentHojaVida, setDocumentHojaVida] = React.useState(null);
  const [nameHoja, setNameHoja] = React.useState();
  const [documentCedula, setDocumentCedula] = React.useState(null);
  const [nameCedula, setNameCedula] = React.useState();
  const [documentPapeleta, setDocumentPapeleta] = React.useState(null);
  const [namePapeleta, setNamePapeleta] = React.useState();
  const [active, setActive] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);

  const pickDocumentHojaVida = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
  
    setNameHoja(result.name);
    setDocumentHojaVida(result.uri);
  };
  const pickDocumentCedula = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
  
    setNameCedula(result.name);
    setDocumentCedula(result.uri);
  };

  const pickDocumentpapeleta = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    setNamePapeleta(result.name);
    setDocumentPapeleta(result.uri);
  };

  // ENLACE CON FIREBASE
  const uploadFileHojaVida = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", documentHojaVida, true);
      xhr.send(null);
    });

    const storage = getStorage();
    let nameFile = firstName + "-" + lastName;

    var d = new Date();
    const fileStorage = ref(storage, "Documents/" + nameFile + "/" + nameHoja);
    const uploadResult = await uploadBytes(fileStorage, blob);
    blob.close();
    const url = await getDownloadURL(fileStorage);
   ;
    global.hoja = url;
  };
  const uploadFilePapeleta = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", documentPapeleta, true);
      xhr.send(null);
    });

    const storage = getStorage();
    let nameFile = firstName + "-" + lastName;

    var d = new Date();
    const fileStorage = ref(
      storage,
      "Documents/" + nameFile + "/" + namePapeleta
    );
    const uploadResult = await uploadBytes(fileStorage, blob);
    blob.close();
    const url = await getDownloadURL(fileStorage);

    global.hojaPapeleta = url;
  };
  const uploadFileCedula = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", documentCedula, true);
      xhr.send(null);
    });

    const storage = getStorage();
    let nameFile = firstName + "-" + lastName;

    var d = new Date();
    const fileStorage = ref(
      storage,
      "Documents/" + nameFile + "/" + nameCedula
    );
    const uploadResult = await uploadBytes(fileStorage, blob);
    blob.close();
    const url = await getDownloadURL(fileStorage);
  
    global.cedula = url;
  };
  React.useEffect(() => {
    if (
      documentCedula != null &&
      documentHojaVida != null &&
      documentPapeleta != null
    ) {
      setActive(false);
    } else {
      setActive(true);
    }
  });
  const cerrar = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("LOGINS");
        global.email = null;
        global.password = null;
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const saveData = async () => {
    setModalVisible(true);
    setActive(true);
    await uploadFileHojaVida();
    await uploadFileCedula();
    await uploadFilePapeleta();
    const data = {
      alldocuments: true,
      nameDocumentCedula: nameCedula,
      urlDocumentCedula: global.cedula,
      nameDocumentHojaVida: nameHoja,
      urlDocumentHojaVida: global.hoja,
      nameDocumentPapeleta: namePapeleta,
      urlDocumentPapeleta: global.hojaPapeleta,
    };
   await saveDocumentPersonal(data);
    setModalVisible(false);
    cerrar();
  };
  let Documents = () => {
    if (global.documents == false) {
      return (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {" "}
            HOJA DE VIDA{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width/1.5,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {nameHoja == null
                ? "Escoje el archivo que necesites: "
                : nameHoja}
            </Text>
            <IconButton
              icon={"file"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentHojaVida();
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}> CÉDULA </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width/1.5,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {nameCedula == null
                ? "Escoje el archivo que necesites: "
                : nameCedula}
            </Text>
            <IconButton
              icon={"image"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentCedula();
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}> PAPELETA </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: Dimensions.get("window").width/1.5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {namePapeleta == null
                ? "Escoje el archivo que necesites: "
                : namePapeleta}
            </Text>
            <IconButton
              icon={"image"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentpapeleta();
              }}
            />
          </View>
        </>
      );
    } else {
      return (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {" "}
            HOJA DE VIDA{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width/1.5,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {nameHoja == null ? InfoDocument.nameDocumentHojaVida : nameHoja}
            </Text>
            <IconButton
              icon={"file"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentHojaVida();
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}> CEDULA </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width/1.5,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {nameCedula == null
                ? InfoDocument.nameDocumentCedula
                : nameCedula}
            </Text>
            <IconButton
              icon={"image"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentCedula();
              }}
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> PAPELETA</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width/1.5,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {namePapeleta == null
                ? InfoDocument.nameDocumentPapeleta
                : namePapeleta}
            </Text>
            <IconButton
              icon={"file"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentpapeleta();
              }}
            />
          </View>
        </>
      );
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
        <Text
          style={{
            fontSize: 20,
            paddingBottom: Dimensions.get("window").width / 15,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {global.workStation}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 3,
          minHeight: Dimensions.get("window").height / 100,
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingTop: Dimensions.get("window").height / 20,
          }}
        >
          <Documents />
        </View>
        <View style={styles.containerBottom}>
          <View style={{ flexDirection: "row" }}>
            <Button
              icon="archive"
              style={styles.buttonStyle}
              mode="contained"
              disabled={active}
              onPress={async () => await saveData()}
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
        <ModalReload
          modalVisible={modalVisible}
          textModal={"SUBIENDO LOS DOCUMENTOS"}
        />
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
    marginBottom: 30,
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#3D3D3D",
    borderBottomEndRadius: 25,
    paddingTop: Dimensions.get("window").height / 10,
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
    minHeight: Dimensions.get("window").height / 18,
    backgroundColor: "#6DC0D5",
  },
});
