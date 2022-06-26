import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { MenuPicture } from "../../Components/ProfilePicture";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { saveTimeUser } from "../../Services/TimerRegister/TimerUser";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ModalReload } from "../../Components/ModalPicture";
export const DescriptionTime = ({ route }) => {
  let StartTime = null;
  StartTime = route.params.StartTime;
  let State = null;
  State = route.params.State;
  let DBstate = null;
  DBstate = route.params.DBstate;
  const navigation = useNavigation();
  const [Description, setDescription] = React.useState();
  const [imageUserBreak, setImageUserBreak] = React.useState();
  const [imageUserFinish, setImageUserFinish] = React.useState();
  const [status, requestPermission] = useMediaLibraryPermissions();
  const [modalVisible, setModalVisible] = React.useState(false);
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
    } else {
      setImageUserFinish(response.uri);
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
          <Text style={styles.textBlackContainer}>
            INGRESA UNA DESCRIPCION {StartTime}
          </Text>
        </View>
        <ModalReload
          modalVisible={modalVisible}
          textModal={"Actualizando los cambios"}
        />
      </View>
      <View style={[styles.container3]}>
        <View style={[styles.viewTextTittle, { flexDirection: "row" }]}>
          <Text
            style={{
              paddingTop: Dimensions.get("window").height / 50,
              fontSize: 15,
              paddingRight: Dimensions.get("window").width / 5,
            }}
          >
            {imageUserBreak == null || imageUserFinish == null
              ? "Selecciona una foto: "
              : "Description.jpg"}
          </Text>

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
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="archive"
            style={styles.buttonStyle}
            mode="contained"
            onPress={async () => {
              console.log("HOLA", Description);
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
                global.pictureDescription = null;
                saveTimeUser(
                  StartTime,
                  State,
                  Description,
                  global.pictureDescription
                );
                if (DBstate == "FINISHED") {
                  sumarHoras();
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
    paddingTop: 15,
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
  // MODAL
});
