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
import { Button, IconButton } from "react-native-paper";
import { savePersonalInformation } from "../../Services/UserInformation/InfoUser";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { ModalReload } from "../../Components/Modal";
import { getAuth, signOut } from "firebase/auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
export const PersonalData = ({ route }) => {
  const navigation = useNavigation();
  let InfoPersonal = [];

  InfoPersonal = route.params.InfoPersonal;
  const [user, setUser] = React.useState(InfoPersonal.mail);
  const [firstName, setFirstName] = React.useState(InfoPersonal.firstName);
  const [validationName, setValidationName] = React.useState();
  const [secondName, setSecondName] = React.useState(InfoPersonal.secondName);
  const [validationSecond, setValidationSecond] = React.useState();
  const [lastName, setLastName] = React.useState(InfoPersonal.lastName);
  const [validationLast, setValidationLast] = React.useState();
  const [motherLastName, setMotherLastName] = React.useState(
    InfoPersonal.secondLastName
  );
  const [validationMother, setValidationMother] = React.useState();
  const [email, setEmail] = React.useState(InfoPersonal.personalEmail);
  const [Id, setId] = React.useState(InfoPersonal.id);
  const [phoneNumber, setPhoneNumber] = React.useState(
    InfoPersonal.phoneNumber
  );
  const [validationPhone, setValidationPhone] = React.useState();
  const [phoneHouse, setPhoneHouse] = React.useState(InfoPersonal.phoneHouse);
  const [validationHouse, setValidationHouse] = React.useState();
  const [address, setAddress] = React.useState(InfoPersonal.address);
  const [civilState, setCivilState] = React.useState(InfoPersonal.civilStatus);
  const [gender, setGender] = React.useState(InfoPersonal.gender);
  // PERMISOS PARA INGRESAR AL ALMACENAMIENTO
  const [imageUser, setImageUser] = React.useState(global.picture);
  const [status, requestPermission] = useMediaLibraryPermissions();
  const [stateModal, setStateModal] = React.useState(false);
  const [active, setActive] = React.useState();
  var regexNumber = /^[0-9]+$/;
  var regex = /^[a-zA-Z]+$/;
  // EL PICKER DE LA FECHA DE NACIMIENTO
  const [dateBirthDay, setDateBirthDay] = React.useState(
    InfoPersonal.birthday == null
      ? "Selecciona la fecha :"
      : InfoPersonal.birthday
  );
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState("date");
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "windows");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() < 9 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "-" +
      (tempDate.getDate() < 10 ? "0" : "") +
      tempDate.getDate();
    setDateBirthDay(fDate);
  };
  const chooseFile = async () => {
    let options = {
      mediaTypes: MediaTypeOptions.Images,
    };
    let response = await launchImageLibraryAsync(options);
    setImageUser(response.uri);
  };
  // CERRAR SESSION
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
  React.useEffect(() => {
    if (regexNumber.test(phoneNumber)) {
      setValidationPhone(true);
    } else {
      setValidationPhone(false);
    }
    if (regexNumber.test(phoneHouse)) {
      setValidationHouse(true);
    } else {
      setValidationHouse(false);
    }
    if (regex.test(firstName)) {
      setValidationName(true);
    } else {
      setValidationName(false);
    }
    if (regex.test(secondName)) {
      setValidationSecond(true);
    } else {
      setValidationSecond(false);
    }
    if (regex.test(lastName)) {
      setValidationLast(true);
    } else {
      setValidationLast(false);
    }
    if (regex.test(motherLastName)) {
      setValidationMother(true);
    } else {
      setValidationMother(false);
    }
    if (
      gender != "1" &&
      civilState != "1" &&
      motherLastName != "" &&
      address != "" &&
      validationHouse == true &&
      phoneHouse != "" &&
      phoneNumber != "" &&
      firstName != "" &&
      lastName != "" &&
      secondName != "" &&
      validationLast == true &&
      validationMother == true &&
      validationName == true &&
      validationPhone == true &&
      validationSecond == true
    ) {
      setActive(false);
    } else {
      setActive(true);
    }
  });
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
      birthday: dateBirthDay,
      rol: InfoPersonal.rol,
      imageUser: imageUser != null ? global.picture : null,
      personalEmail: email,
      id: InfoPersonal.id,
      gender: gender,
      civilStatus: civilState,
      workingState: global.workState,
      finishDay: global.finishDay == null ? null : global.finishDay,
      address: address,
    };
    await savePersonalInformation(data);
    setStateModal(false);
    cerrar();
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
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "red",
                  textAlign: "center",
                }}
              >
                *Estos datos no se pueden editar*
              </Text>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textInfo}> Usuario: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={user}
                  disabled={true}
                  disabledInputStyle={{ color: "black" }}
                  onChangeText={setUser}
                  placeholder={global.email}
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
                  disabled={true}
                  onChangeText={setId}
                  disabledInputStyle={{ color: "black" }}
                  maxLength={10}
                  placeholder={Id}
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
                  maxLength={20}
                  onChangeText={setFirstName}
                  placeholder={
                    firstName == "" || firstName == null
                      ? "Ingresa tu primer nombre."
                      : firstName
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
                    secondName == "" || secondName == null
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
                    lastName == "" || lastName == null
                      ? "Ingresa tu primer apellido."
                      : lastName
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
                    motherLastName == "" || motherLastName == null
                      ? "Ingresa tu segundo apellido."
                      : motherLastName
                  }
                  containerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                <Text style={styles.textInfo}> Numero </Text>
                <Text style={styles.textInfo}> Celular: </Text>
              </View>
              <View style={{ width: Dimensions.get("window").width }}>
                <Input
                  value={phoneNumber}
                  maxLength={10}
                  onChangeText={setPhoneNumber}
                  placeholder={
                    phoneNumber == "" || phoneNumber == null
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
                    phoneHouse == "" || phoneHouse == null
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
                    address == "" || address == null
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
              <View
                style={{
                  width: Dimensions.get("window").width,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.textCalendar}>{dateBirthDay}</Text>
                <IconButton
                  icon={"calendar-month"}
                  iconColor={"black"}
                  style={{
                    paddingTop: Dimensions.get("window").height / 70,
                    paddingHorizontal: Dimensions.get("window").width / 70,
                  }}
                  size={Dimensions.get("window").width / 20}
                  onPress={async () => {
                    showMode();
                  }}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View
                style={{
                  paddingTop: Dimensions.get("window").height / 50,
                  paddingLeft: 30,
                }}
              >
                <Text style={styles.textInfo}> Genero: </Text>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width / 1.5,
                  maxHeight: Dimensions.get("window").height / 15,
                }}
              >
                <Picker
                  style={{
                    height: Dimensions.get("window").height / 15,
                  }}
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                  <Picker.Item label="Selecciona la opcion:" value="1" />
                  <Picker.Item label="Hombre" value="Male" />
                  <Picker.Item label="Mujer" value="Female" />
                </Picker>
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View
                style={{ paddingTop: Dimensions.get("window").height / 50 }}
              >
                <Text style={styles.textInfo}> Estado Civil: </Text>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width / 1.5,
                  maxHeight: Dimensions.get("window").height / 15,
                }}
              >
                <Picker
                  style={{ height: Dimensions.get("window").height / 15 }}
                  selectedValue={civilState}
                  ColorValue={"red"}
                  onValueChange={(itemValue, itemIndex) =>
                    setCivilState(itemValue)
                  }
                >
                  <Picker.Item label="Selecciona la opcion:" value="1" />
                  <Picker.Item label="Casado" value="Married" />
                  <Picker.Item label="Divorciado" value="Divorced" />
                  <Picker.Item label="Soltero" value="Single" />
                  <Picker.Item label="Viudo/a" value="Widower" />
                </Picker>
              </View>
            </View>
          </ScrollView>
        </SafeAreaProvider>
        <View>
          {active == false ? (
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "green" }}>
              Todos los datos son validos
            </Text>
          ) : (
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
              Datos erroneos
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="archive"
            style={styles.buttonStyle}
            mode="contained"
            disabled={active}
            onPress={async () => {
              await saveData();
            }}
          >
            Guardar
          </Button>
          <Button
            icon="close-outline"
            style={styles.buttonStyle}
            mode="contained"
            onPress={() => {navigation.goBack()}}
          >
            Volver
          </Button>
        </View>
        <ModalReload
          modalVisible={stateModal}
          textModal={"Guardando cambios"}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
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
    height: Dimensions.get("window").height / 10,
  },
  inputContainer: {
    padding: 7,
    marginLeft: Dimensions.get("window").width / 30,
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
  textCalendar: {
    fontSize: 15,
    paddingTop: Dimensions.get("window").height / 50,
    paddingLeft: Dimensions.get("window").width / 10,
  },
});
