import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { DocumentsPicture } from "../../Components/ProfilePicture";
import { Button, IconButton } from "react-native-paper";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import { saveDocumentPersonal } from "../../Services/UserInformation/DocumentsUser";
import { ModalReload } from "../../Components/Modal";
export const DocumentsData = ({ route }) => {
  const navigation = useNavigation();
  let InfoDocument = null;
  InfoDocument = route.params.InfoDocument;
  const [firstName, setFirstName] = React.useState(global.name);
  const [lastName, setLastName] = React.useState(global.lastName);
  // PERMISOS PARA INGRESAR AL ALMACENAMIENTO
  const [documentHojaVida, setDocumentHojaVida] = React.useState();
  const [nameHoja, setNameHoja] = React.useState();
  const [documentCedula, setDocumentCedula] = React.useState();
  const [nameCedula, setNameCedula] = React.useState();
  const [active, setActive] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);

  const pickDocumentHojaVida = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result != null) {
      console.log(result.name);
    }
    setNameHoja(result.name);
    setDocumentHojaVida(result.uri);
  };
  const pickDocumentCedula = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result != null) {
      const r = await fetch(result.uri);
      console.log(result.name);
    }
    setNameCedula(result.name);
    setDocumentCedula(result.uri);
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
    let nameFile =  firstName +"-"+ lastName

    var d = new Date();
    const fileStorage = ref(storage, "Documents/" + nameFile +"/"+ nameHoja);
    const uploadResult = await uploadBytes(fileStorage, blob);
    blob.close();
    const url = await getDownloadURL(fileStorage);
    console.log(url);
    global.hoja=url
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
    let nameFile =  firstName +"-"+ lastName

    var d = new Date();
    const fileStorage = ref(storage, "Documents/" + nameFile +"/"+ nameCedula);
    const uploadResult = await uploadBytes(fileStorage, blob);
    blob.close();
    const url = await getDownloadURL(fileStorage);
    console.log(url);
    global.cedula=url
  };
  React.useEffect(()=>{
    if(documentCedula != null && documentHojaVida !=null){
      setActive(false)
    }else{
      setActive(true)
    }
  })
  // SUBIR DATOS A LA BASE //
  const saveData = async () => {
    setModalVisible(true)
    setActive(true)
      await uploadFileHojaVida();
      await uploadFileCedula();
      const data={
        account:2,
        nameDocumentCedula:nameCedula,
        urlDocumentCedula:global.cedula,
        nameDocumentHojaVida:nameHoja,
        urlDocumentHojaVida:global.hoja,
      }
      saveDocumentPersonal(data);
      navigation.goBack()
      setModalVisible(false)
  };
  let Documents =()=>{
    if(global.documents==0){
      return(
        <>
        <Text style={{ fontSize: 20, fontWeight: "bold", }}> HOJA DE VIDA </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 12, fontWeight: "bold"}}>{nameHoja==null ? "Escoje el archivo que necesites: " : nameHoja}</Text>
        <IconButton
              icon={"calendar-month"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentHojaVida();
              }}
            />
        </View>
        <View style={{ alignItems: "center"}}>
        <Text style={{ fontSize: 20, fontWeight: "bold"}}> CEDULA </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 15, fontWeight: "bold"}}>{nameCedula==null ? "Escoje el archivo que necesites: " : nameCedula}</Text>
        <IconButton
              icon={"calendar-month"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentCedula()
              }}
            />
        </View>
        </>
      )
    }else{
      return(
        <>
        <Text style={{ fontSize: 20, fontWeight: "bold", }}> HOJA DE VIDA </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 12, fontWeight: "bold"}}>{InfoDocument.nameDocumentHojaVida}</Text>
        <IconButton
              icon={"calendar-month"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentHojaVida();
              }}
            />
        </View>
        <View style={{ alignItems: "center"}}>
        <Text style={{ fontSize: 20, fontWeight: "bold"}}> CEDULA </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 15, fontWeight: "bold"}}>{InfoDocument.nameDocumentCedula}</Text>
        <IconButton
              icon={"calendar-month"}
              iconColor={"black"}
              size={Dimensions.get("window").width / 12}
              onPress={async () => {
                pickDocumentCedula()
              }}
            />
        </View>
        </>
      )
    }
  }
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
          {global.workStation}
        </Text>
      </View>
      <View style={{ alignItems: "center",flex:3, minHeight: Dimensions.get("window").height/100}}>
          <Documents/>
      <View style={styles.containerBottom}>
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="archive"
            style={styles.buttonStyle}
            mode="contained"
            disabled={active}
            onPress={async() => 
              await saveData()
            }
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
        <ModalReload modalVisible={modalVisible} textModal={"SUBIENDO LOS DOCUMENTOS"}/>
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
