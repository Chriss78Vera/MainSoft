// LIBRERIAS
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Button, Provider, Modal, Portal } from "react-native-paper";
import { useTime } from "react-timer-hook";
import { Icon } from "react-native-elements";

// COMPONENTES Y SERVICIO
import { CalendarDay } from "../../Components/Calendar"; // COMPONENTES CALENDARIO
import { ModalReload } from "../../Components/Modal"; // COMPONENTE DEL MODAL PARA RECARGAR
import { MenuPicture } from "../../Components/ProfilePicture"; // COMPONENTE PARA MOSTRAR EL MODAL
import {
  saveTimeUser,
  updateStateWork,
} from "../../Services/TimerRegister/TimerUser"; // GUARDAR EL TIEMPO DEL EMPLEADO EN LA BASE

// CODIFICACION DE LA PAGINA
export const ScreenWork = () => {
  const navigation = useNavigation();
  const [stateModal, setStateModal] = React.useState(false);
  const { seconds, minutes, hours } = useTime({ format: "24-hour" });
  const [timeWork, setTimeWork] = React.useState(7);
  const [name, setName] = React.useState(global.name);
  const [lastName, setLastName] = React.useState(global.lastName);
  const [startTime, setStartTime] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [documentsValidate, setDocumentsValidate] = React.useState(false);
  const [time, setTime] = React.useState(false)
  // TEXT DEL BOTON //
  let newHours;
  let newSeconds;
  let newMinutes;
  let Newcolor;
  let Tops;
  // ----------------------------------------------------------------------- //
  // VALIDACION PARA EL ESTADO DE TARDE O TEMPRANO
  if (hours > timeWork) {
    Newcolor = "#E85D75";
  } else {
    Newcolor = "#2FDAA7";
  }
  // VALIDACION DE LA HORA
  if (hours < 10) {
    newHours = "0" + hours;
  } else {
    newHours = hours;
  }
  // VALIDACION DE LOS MINUTOS
  if (minutes < 10) {
    newMinutes = "0" + minutes;
  } else {
    newMinutes = minutes;
  }
  // VALIDACION DE LOS SEGUNDOS
  if (seconds < 10) {
    newSeconds = "0" + seconds;
  } else {
    newSeconds = seconds;
  }
  // ----------------------------------------------------------------------- //
  // GUARDAR EL TIEMPO
  let DateTimer;
  React.useEffect(() => {
    setStartTime(DateTimer);
    if (global.documents != false) {
      setDocumentsValidate(false);
      if(hours < timeWork){
        setTime(true);
      }else{
        setTime(false);
      }
    } else {
      setDocumentsValidate(true);
  
     
    }
  }, [(DateTimer = newHours + ":" + newMinutes + ":" + newSeconds)]);

  // ----------------------------------------------------------------------- //
  // MODAL DE ACTIVACION //
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    margin: Dimensions.get("window").width / 22,
    borderRadius: 20,
    minHeight: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width / 1.1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };
  let ModalValidator = () => {
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} contentContainerStyle={containerStyle}>
            <Icon
              name="information-circle-outline"
              type="ionicon"
              size={100}
              color="#E85D75"
            />
            <Text style={styles.textModal}>
              Vas a empezar una nueva jornada?
            </Text>
            <View style={{ flexDirection: "row", padding: 50 }}>
              <View style={{ paddingHorizontal: 20 }}>
                <Button
                  style={styles.buttonStyleModalTrue}
                  labelStyle={styles.buttonTextStyle}
                  onPress={async () => {
                    hideModal();
                    setStateModal(true); // ABRIR EL MODAL
                    saveTimeUser(startTime, "startWork"); // GUARDAR EL ESTADO
                    setStateModal(false); // CERRAR EL MODAL
                    if (
                      global.timeToWork == "04" ||
                      global.timeToWork == "06"
                    ) {
                      navigation.navigate("RETURNBREAK");
                      global.navigation="RETURNBREAK"
                      await updateStateWork("WORKINGPERMISSIONS");
                    } else {
                      navigation.navigate("WORKINGTIME");
                      global.navigation="WORKINGTIME"
                      await updateStateWork("WORKING");
                    }
                  }}
                >
                  CONTINUAR
                </Button>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Button
                  style={styles.buttonStyleModalFalse}
                  labelStyle={styles.buttonTextStyle}
                  onPress={async () => {
                    hideModal();
                  }}
                >
                  CANCELAR
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    );
  };

  // VALIDACION DEL AM/PM ICON
  let IconDays = () => {
    return (
      <>
        {newHours <= 12 ? (
          <Image source={require("../../../Resources/Images/sun.png")} />
        ) : newHours <= 18 ? (
          <Image source={require("../../../Resources/Images/afternoon.png")} />
        ) : (
          <Image source={require("../../../Resources/Images/night.png")} />
        )}
      </>
    );
  };
  // ----------------------------------------------------------------------- //
  // VALIDACION DEL TEXTO//
  let TextNotWorking = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds}
        </Text>

        <View style={[styles.containerIcon]}>
          <IconDays />
        </View>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>
            Hora de ingreso: 0{timeWork}:00
          </Text>
          
          {hours < timeWork ? (
            <Text style={[styles.informationText, { color: Newcolor }]}>
              Llegas Temprano!
            </Text>
          ) : (
            <Text style={[styles.informationText, { color: Newcolor }]}>
              Estas tarde!
            </Text>
          )}
        </View>
      </>
    );
  };

  // VALIDACION DE LOS BOTONES //
  const ButtonValidator = () => {
    return (
      <Button
        mode="contained"
        color={Newcolor}
        disabled={documentsValidate || time}
        style={styles.buttonStyle}
        labelStyle={styles.buttonTextStyle}
        onPress={async () => {
          showModal();
        }}
      >
        EMPEZAR A TRABAJAR
      </Button>
    );
  };
  // ----------------------------------------------------------------------- //
  return (
    <View style={styles.container}>
      <View style={[styles.container2, { shadowColor: Newcolor }]}>
        <View
          style={[
            styles.incontainer2,
            { shadowColor: Newcolor, borderColor: Newcolor },
          ]}
        >
          <View style={{ width: Dimensions.get("window").width / 2 }}>
            <Text style={styles.textinContainer2}>BIENVENIDO</Text>
            <Text style={styles.text2inContainer2}>
              {name} {lastName}
            </Text>
            <ModalReload
              modalVisible={stateModal}
              textModal={"Registrando el tiempo!"}
            />
          </View>
          <View>
            <MenuPicture colorBackground={Newcolor} />
          </View>
        </View>

        <View style={styles.containerCalendar}>
          <CalendarDay colors={Newcolor} />
        </View>

        <View style={styles.containerTextBlackContainer}>
          <Text style={styles.textBlackContainer}>REGISTRA TU HORA!</Text>
          <Text style={styles.textBlackContainerInformation}>
            {global.timeToWork == "04"
              ? "HORARIO CON PERMISO"
              : global.timeToWork == "06"
              ? "HORARIO MATERNO"
              : "HORARIO NORMAL"}
          </Text>
        </View>
      </View>

      <View style={[styles.container3, { shadowColor: Newcolor }]}>
        <TextNotWorking />
      </View>
      <View style={styles.containerButton}>
        <ButtonValidator />
        {documentsValidate == true ? (
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#E85D75",
            }}
          >
            *Ingresa todos los archivos en la pantalla del usuario para poder continuar*
          </Text>
        ) : (
          <></>
        )}
      </View>

      <ModalValidator />
    </View>
  );
};
const styles = StyleSheet.create({
  // ============= ESTILO DEL VIEW ================= //
  // CONTENEDORES
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
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
    width: Dimensions.get("window").width / 1.14,
    minHeight: Dimensions.get("window").height / 15,
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
  },
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
  //  CONTENEDORES COMPONENTES
  containerIcon: {
    paddingTop: 20,
  },
  containerText: {
    marginTop: 10,
  },
  containerCalendar: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTextBlackContainer: {
    alignItems: "center",
  },
  containerButton: {
    alignItems: "center",
    paddingTop: Dimensions.get("window").height / 40,
  },
  // TEXTO
  textTimer: {
    fontSize: 60,
    textAlign: "center",
    fontFamily: "Roboto",
    textShadowColor: "rgba(0,0,0,0.25) 100%",
    textShadowOffset: { width: 0, height: 2.5 },
    textShadowRadius: 1,
  },
  textModal: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Roboto",
    textShadowColor: "rgba(0,0,0,0.25) 100%",
    textShadowOffset: { width: 0, height: 2.5 },
    textShadowRadius: 1,
  },
  informationText: {
    marginTop: 10,
    color: "#3D3D3D",
    fontSize: 18,
    textAlign: "center",
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

  textBlackContainer: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  textBlackContainerInformation: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#E85D75",
  },
  // BOTONES
  buttonStyle: {
    borderRadius: 15,
    width: Dimensions.get("window").width / 1.5,
  },
  buttonStyleModalFalse: {
    borderRadius: 15,
    backgroundColor: "#E85D75",
  },
  buttonStyleModalTrue: {
    borderRadius: 15,
    backgroundColor: "#2FDAA7",
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  // ============================================ //
});
