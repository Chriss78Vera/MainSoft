import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { MenuPicture } from "../../Components/ProfilePicture";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  saveTimeUser,
  sumarHoras,
  updateStateWork,
} from "../../Services/TimerRegister/TimerUser";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ModalReload } from "../../Components/Modal";
import { ModalReloadPicture } from "../../Components/ModalPicture";
export const DescriptionTime = ({ route }) => {
  let StartTime = null;
  StartTime = route.params.StartTime;
  let State = null;
  State = route.params.State;
  let DBstate = null;
  DBstate = route.params.DBstate;
  const navigation = useNavigation();
  const [Description, setDescription] = React.useState();
  const [DescriptionValidation, setDescriptionValidation] = React.useState();
  const [imageUserBreak, setImageUserBreak] = React.useState();
  const [imageUserFinish, setImageUserFinish] = React.useState();
  const [nameImageBreak, setNameImageBreak] = React.useState();
  const [nameImageFinish, setNameImageFinish] = React.useState();
  const [status, requestPermission] = useMediaLibraryPermissions();
  const [validation, setValidation] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalPicture, setModalPicture] = React.useState(false);
  const [modalPictureFinish, setModalPictureFinish] = React.useState(false);
  // SELECCIONAR LA FOTO DEL BREAK
  global.pictureDescription = null;
  let nameFile = null;
  const chooseFile = async () => {
    let options = {
      mediaTypes: MediaTypeOptions.Images,
    };
    let response = await launchImageLibraryAsync(options);
    if (State == "startBreak") {
      setImageUserBreak(response.uri);
      setNameImageBreak(response.name);
    } else {
      setImageUserFinish(response.uri);
      setNameImageFinish(response.name);
    }
  };
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
      if (State == "startBreak") {
        xhr.open("GET", imageUserBreak, true);
      } else {
        xhr.open("GET", imageUserFinish, true);
      }

      xhr.send(null);
    });

    const storage = getStorage();
    if (State == "startBreak") {
      nameFile = "Break_" + global.name + global.lastName + "_" + global.id;
    } else {
      nameFile = "Finish_" + global.name + global.lastName + "_" + global.id;
    }

    var d = new Date();
    let mes = d.getMonth() + 1;
    let dia = d.getDate();
    let nombre = global.name + "-" + global.lastName;
    const fileStorage = ref(
      storage,
      "Register/" + mes + "/" + nombre + "/" + dia + "/" + nameFile + ".jpg"
    );
    const uploadResult = await uploadBytes(fileStorage, blob);
    blob.close();
    const url = await getDownloadURL(fileStorage);
    global.pictureDescription = url;
    console.log(global.pictureDescription);
  };
  let ModalBreak = () => {
    return (
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalPicture}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingBottom: Dimensions.get("window").height / 25,
                }}
              >
                {" "}
                TU FOTO SELECCIONADA{" "}
              </Text>
              <View>
                <Image
                  style={{
                    minWidth: Dimensions.get("window").width / 1.5,
                    height: 300,
                  }}
                  source={{
                    uri: imageUserBreak,
                  }}
                />
              </View>

              <Button
                icon="archive"
                style={styles.buttonStyle}
                mode="contained"
                onPress={async () => {
                  setModalPicture(false);
                }}
              >
                CERRAR
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  let ModalFinish = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPictureFinish}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingBottom: Dimensions.get("window").height / 25,
                }}
              >
                TU FOTO SELECCIONADA
              </Text>
              <View>
                <Image
                  style={{
                    minWidth: Dimensions.get("window").width / 1.5,
                    height: 300,
                  }}
                  source={{
                    uri: imageUserFinish,
                  }}
                />
              </View>

              <Button
                icon="archive"
                style={styles.buttonStyle}
                mode="contained"
                onPress={async () => {
                  setModalPictureFinish(false);
                }}
              >
                CERRAR
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  let ViewBreak = () => {
    return (
      <>
        <View style={[styles.viewTextTittle, { flexDirection: "row" }]}>
          <TouchableOpacity
            disabled={validation}
            onPress={() => {
              if (imageUserBreak != null) {
                setModalPicture(true);
              } else {
                console.log("NO DEBERIA INGRESAR");
              }
            }}
          >
            <Text
              style={{
                paddingTop: Dimensions.get("window").height / 50,
                fontSize: 15,
                paddingRight: Dimensions.get("window").width / 5,
                color: "green",
                fontWeight: "bold",
              }}
            >
              {imageUserBreak == null
                ? "Selecciona una foto!"
                : "Presiona para mostrar foto!"}
            </Text>
          </TouchableOpacity>
          <ModalReload
            modalVisible={modalVisible}
            textModal={"Actualizando los cambios"}
          />
          <ModalBreak />
          <ModalFinish />
          <IconButton
            icon="camera"
            iconColor={"black"}
            size={30}
            onPress={() => chooseFile()}
          />
        </View>
        <View style={styles.viewTextTittle}>
          <Text style={styles.textTittle}> REGISTRA TU DÍA: </Text>
        </View>
      </>
    );
  };
  let ViewFinish = () => {
    return (
      <>
        <View style={[styles.viewTextTittle, { flexDirection: "row" }]}>
          <TouchableOpacity
            disabled={validation}
            onPress={() => {
              if (imageUserFinish != null) {
                setModalPictureFinish(true);
              } else {
                console.log("NO DEBERIA INGRESAR");
              }
            }}
          >
            <Text
              style={{
                paddingTop: Dimensions.get("window").height / 50,
                fontSize: 15,
                paddingRight: Dimensions.get("window").width / 5,
                color: "green",
                fontWeight: "bold",
              }}
            >
              {imageUserFinish == null
                ? "Selecciona una foto!"
                : "Presiona para mostrar foto!"}
            </Text>
          </TouchableOpacity>
          <ModalReload
            modalVisible={modalVisible}
            textModal={"Actualizando los cambios"}
          />
          <ModalBreak />
          <ModalFinish />
          <IconButton
            icon="camera"
            iconColor={"black"}
            size={30}
            onPress={() => chooseFile()}
          />
        </View>
        <View style={styles.viewTextTittle}>
          <Text style={styles.textTittle}> REGISTRA TU DÍA: </Text>
        </View>
      </>
    );
  };
  React.useEffect(() => {
    if (Description == null || Description == "") {
      setDescriptionValidation(true);
    } else {
      setDescriptionValidation(false);
    }
  });
  return (
    <View style={styles.container}>
      <View style={[styles.container2]}>
        <View style={[styles.incontainer2]}>
          <View style={{ width: Dimensions.get("window").width / 2.3 }}>
            <Text style={styles.textinContainer2}>BIENVENIDO</Text>
            <Text style={styles.text2inContainer2}>
              {global.name} {global.lastName}
            </Text>
          </View>
          <View>
            <MenuPicture colorBackground={"black"} />
          </View>
        </View>
        <View style={styles.containerTextBlackContainer}>
          <Text style={styles.textBlackContainer}>INGRESA UNA DESCRIPCION</Text>
        </View>
      </View>
      <View style={[styles.container3]}>
        {State == "startBreak" ? <ViewBreak /> : <ViewFinish />}
        <View style={styles.viewDescription}>
          <Input
            multiline
            numberOfLines={5}
            value={Description}
            inputStyle={{ fontSize: 15, textAlign: "justify" }}
            onChangeText={setDescription}
            maxLength={255}
          />
        </View>
        <Button
          icon="archive"
          style={styles.buttonStyle}
          mode="contained"
          disabled={DescriptionValidation}
          onPress={async () => {
            setModalVisible(true);
            if (imageUserBreak != null || imageUserFinish != null) {
              await uploadFile();

              saveTimeUser(
                StartTime,
                State,
                Description,
                global.pictureDescription
              );
              await updateStateWork(DBstate);
              if (DBstate == "FINISHED") {
                await sumarHoras();
              } else {
                console.log("NADA");
              }
            } else {
              saveTimeUser(
                StartTime,
                State,
                Description,
                global.pictureDescription
              );
              if (DBstate == "FINISHED") {
                await sumarHoras();
              } else {
                console.log("NADA");
              }
              await updateStateWork(DBstate);
            }
            setModalVisible(false);
            navigation.goBack();
          }}
        >
          GUARDAR
        </Button>
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
  //CONTAINER NEGRO Y BLANCO//
  //----------------------------------------//
  container2: {
    flex: 2,
    position: "relative",
    backgroundColor: "#3D3D3D",
    alignItems: "center",
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
    width: Dimensions.get("window").width / 1.15,
    backgroundColor: "white",
    borderRadius: 20,
    bottom: Dimensions.get("window").height / 6,
    minHeight: Dimensions.get("window").height / 10,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
  },
  //----------------------------------------//
  // DENTRO DEL CONTAINER NEGRO //
  // CONTAINER DEL NOMBRE //
  incontainer2: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    position: "relative",
    width: Dimensions.get("window").width / 1.09,
    maxHeight: 100,
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
  },
  textinContainer2: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 20,
  },
  text2inContainer2: {
    fontSize: 18,
    textAlign: "center",
  },
  // CALENDARIO //
  containerTextBlackContainer: {
    paddingTop: Dimensions.get("window").height / 60,
  },
  textBlackContainer: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  //----------------------------------------//
  // DENTRO DEL CONTAINER BLANCO //
  viewTextTittle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: Dimensions.get("window").width / 1.5,
  },
  textTittle: {
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 10,
  },
  viewDescription: {
    width: Dimensions.get("window").width / 1.5,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
  },
  buttonStyle: {
    borderRadius: 15,
    marginTop: Dimensions.get("window").height / 50,
    backgroundColor: "#6DC0D5",
    width: Dimensions.get("window").width / 1.5,
  },
  // MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor:
      "linear-gradient(0deg, rgba(236,236,236,1) 25%, rgba(47,218,167,0) 100%)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width / 1.3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
});
