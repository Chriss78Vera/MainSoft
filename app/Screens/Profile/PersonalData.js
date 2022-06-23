import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EditProfilePicture } from "../../Components/ProfilePicture";
import { Button } from "react-native-paper";
import { savePersonalInformation } from "../../Services/UserInformation/InfoUser";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { ModalReload } from "../../Components/Modal";
export const PersonalData = ({ route }) => {
  const navigation = useNavigation();
  let InfoPersonal = [];
  InfoPersonal = route.params.InfoPersonal;
  const [user, setUser] = React.useState(InfoPersonal.mail);
  const [firstName, setFirstName] = React.useState(InfoPersonal.firstName);
  const [secondName, setSecondName] = React.useState(InfoPersonal.secondName);
  const [lastName, setLastName] = React.useState(InfoPersonal.lastName);
  const [motherLastName, setMotherLastName] = React.useState(
    InfoPersonal.secondLastName
  );
  const [email, setEmail] = React.useState(InfoPersonal.personalEmail);
  const [Id, setId] = React.useState(InfoPersonal.id);
  const [phoneNumber, setPhoneNumber] = React.useState(
    InfoPersonal.phoneNumber
  );
  const [phoneHouse, setPhoneHouse] = React.useState(InfoPersonal.phoneHouse);
  const [address, setAddress] = React.useState(InfoPersonal.address);
  const [brithday, setBrithday] = React.useState("");
  const [state, setState] = React.useState("");
  const [gender, setGender] = React.useState("");
  // PERMISOS PARA INGRESAR AL ALMACENAMIENTO
  const [imageUser, setImageUser] = React.useState(global.picture);
  const [data, setData] = React.useState([]);

  const [status, requestPermission] = useMediaLibraryPermissions();
  const [stateModal, setStateModal] = React.useState(false);
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
    setStateModal(true);
    if (imageUser == null || imageUser != null) {
      await uploadFile();
    }
    let data = {
      firstName: firstName,
      secondName: secondName,
      lastName: lastName,
      secondLastName: motherLastName,
      mail: InfoPersonal.mail,
      phoneNumber: phoneNumber,
      phoneHouse: phoneHouse,
      rol: InfoPersonal.rol,
      imageUser: imageUser != null ? global.picture : null,
      personalEmail: email,
      id: Id,
      address: address,
    };
    await savePersonalInformation(data);
    setStateModal(false);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <TouchableOpacity
          onPress={() => {
            chooseFile();
          }}
        >
          <EditProfilePicture imageUser={imageUser} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            paddingTop: 10,
          }}
        >
          {firstName} {lastName}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          DESAROLLADOR
        </Text>
      </View>
      <View style={styles.containerBottom}>
        <SafeAreaProvider
          style={{ minHeight: Dimensions.get("window").height / 2.3 }}
        >
          <ScrollView style={styles.containerScroll}>
            {/* INFORMACION DEL USUARIO  */}
            <Text style={styles.textTittle}> INFORMACION DEL USUARIO </Text>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Usuario: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={user}
                  onChangeText={setUser}
                  placeholder={global.email}
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            {/* INFORMACION PERSONAL */}
            <Text style={styles.textTittle}> INFORMACION PERSONAL </Text>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Primer </Text>
                <Text style={styles.textInfo}> Nombre: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={firstName}
                  maxLength={10}
                  onChangeText={setFirstName}
                  placeholder={
                    firstName == null ? "Ingresa tu primer nombre." : firstName
                  }
                  inputStyle={{ fontSize: 15 }}
                  containerStyle={styles.inputContainer}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Segundo</Text>
                <Text style={styles.textInfo}> Nombre:</Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={secondName}
                  onChangeText={setSecondName}
                  maxLength={10}
                  placeholder={
                    secondName == null
                      ? "Ingresa tu segundo nombre."
                      : secondName
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Primer </Text>
                <Text style={styles.textInfo}> Apellido: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={lastName}
                  onChangeText={setLastName}
                  maxLength={15}
                  placeholder={
                    lastName == null ? "Ingresa tu primer apellido." : lastName
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Segundo </Text>
                <Text style={styles.textInfo}> Apellido: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={motherLastName}
                  maxLength={15}
                  onChangeText={setMotherLastName}
                  placeholder={
                    motherLastName == null
                      ? "Ingresa tu segundo apellido."
                      : motherLastName
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 20, paddingLeft: 20 }}>
                <Text style={styles.textInfo2}> Email: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder={
                    email == null ? "Ingresa tu correo electronico." : email
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Cedula: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={Id}
                  onChangeText={setId}
                  maxLength={10}
                  placeholder={Id == null ? "Ingresa tu cedula." : Id}
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Numero </Text>
                <Text style={styles.textInfo}> Celular: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={phoneNumber}
                  maxLength={10}
                  onChangeText={setPhoneNumber}
                  placeholder={
                    phoneNumber == null
                      ? "Ingresa tu numero celular."
                      : phoneNumber
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Telefono: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={phoneHouse}
                  maxLength={10}
                  onChangeText={setPhoneHouse}
                  placeholder={
                    phoneHouse == null
                      ? "Ingresa tu numero convencional."
                      : phoneHouse
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Dirreción: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={address}
                  onChangeText={setAddress}
                  placeholder={
                    address == null
                      ? "Ingresa tu dirrecion domiciliaria."
                      : address
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Fecha</Text>
                <Text style={styles.textInfo}> Nacimiento: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  placeholder="BASIC INPUT"
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Genero: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  placeholder="BASIC INPUT"
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaProvider>
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="archive"
            style={styles.buttonStyle}
            mode="contained"
            onPress={() => saveData()}
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
        <ModalReload
          modalVisible={stateModal}
          textModal={"Guardando cambios"}
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
