import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Button } from "react-native-paper";
// IMPORT LIBRERY REACT NATIVE TIMER HOOK
import { useTime } from "react-timer-hook";
import { CalendarDay } from "../Components/Calendar";
// NAVIGATIONS IMPORT
export const HomeScreen = () => {
  //================================//
  //ESTILIZACION//
  // ELEMENTOS PARA EL TIEMPO REAL
  const { seconds, minutes, hours } = useTime({ format: "24-hour" });
  const [timeWork, setTimeWork] = React.useState(7);
  // PERSONAL DATA
  const [name, setName] = React.useState("Christopher");
  const [lastName, setLastName] = React.useState("Vera");
  //SAVE TIME
  const [activePerson, setActivePerson] = React.useState("NOTWORKING");
  const [finishTime, setFinishTime] = React.useState();
  const [breakTime, setBreakTime] = React.useState();
  const [startTime, setStartTime] = React.useState();
  const [extraTime, setExtraTime] = React.useState();
  // TEXT DEL BOTON //
  let newHours;
  let newSeconds;
  let newMinutes;
  let Newcolor;
  let Tops;
  // ----------------------------------------------------------------------- //
  // VALIDACION PARA EL ESTADO DE TARDE O TEMPRANO
  if (activePerson == "NOTWORKING") {
    if (hours > timeWork) {
      Newcolor = "#E85D75";
    } else {
      Newcolor = "#2FDAA7";
    }
  } else if (activePerson == "WORKING") {
    Newcolor = "#6DC0D5";
    Tops = 182;
  } else if (activePerson == "BREAK") {
    Newcolor = "#ED6A5E";
  } else if (activePerson == "FINISHED") {
    Newcolor = "#ECD47F";
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
  // ----------------------------------------------------------------------- //
  // TIEMPO GUARDO
  let DateTimer;
  React.useEffect(() => {
    setExtraTime(DateTimer);
    setBreakTime(DateTimer);
    setStartTime(DateTimer);
    setFinishTime(DateTimer);
  }, [(DateTimer = newHours + ":" + newMinutes + ":" + newSeconds)]);
  // ----------------------------------------------------------------------- //
  // VALIDACION DEL AM/PM ICON
  let IconDays = () => {
    return (
      <>
        {newHours <= 12 ? (
          <Image source={require("../../Resources/Images/sun.png")} />
        ) : newHours <= 18 ? (
          <Image source={require("../../Resources/Images/afternoon.png")} />
        ) : (
          <Image source={require("../../Resources/Images/night.png")} />
        )}
      </>
    );
  };
  // ----------------------------------------------------------------------- //
  // NO INGRESO A TRABAJAR//
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
            Hora de ingreso: {timeWork}:00
          </Text>
          {hours > timeWork && activePerson == "WORKING" ? (
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
  // FINALIZACION DE LA JORNADA //
  let TextFinished = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds}
        </Text>
        <View style={[styles.containerIcon]}>
          <IconDays />
        </View>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>Finalizaste tu dia!</Text>
          <Text style={[styles.informationText, { color: "#2FDAA7" }]}>
            Felicitaciones!
          </Text>
        </View>
      </>
    );
  };
  // TIEMPO DE DESCANSO //
  let TextBreak = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds}
        </Text>
        <View style={[styles.containerIcon]}>
          <IconDays />
        </View>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>Receso laboral!</Text>
          <Text style={[styles.informationText, { color: Newcolor }]}>
            Cuidado con tu tiempo!
          </Text>
        </View>
      </>
    );
  };
  // TIEMPO TRABAJANDO //
  let TextWorking = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds}
        </Text>
        <View style={[styles.containerIcon]}>
          <IconDays />
        </View>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>Trabajando...</Text>
        </View>
      </>
    );
  };
  // ----------------------------------------------------------------------- //
  // VALIDACION DEL TIEMPO //
  const TextValidator = () => {
    if (activePerson == "NOTWORKING") {
      return <TextNotWorking />;
    } else if (activePerson == "WORKING") {
      return <TextWorking />;
    } else if (activePerson == "BREAK") {
      return <TextBreak />;
    } else {
      return <TextFinished />;
    }
  };
  // VALIDACION DE LOS BOTONES //
  const ButtonValidator = () => {
    if (activePerson == "NOTWORKING") {
      return (
        <Button
          mode="contained"
          color={Newcolor}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={() => {
            console.log("INICIO DEL TRABAJO", startTime);
            setActivePerson("WORKING");
          }}
        >
          EMPEZAR A TRABAJAR
        </Button>
      );
    } else if (activePerson == "WORKING") {
      return (
        <>
          <Button
            mode="contained"
            color={"#ED6A5E"}
            style={styles.buttonStyle}
            labelStyle={styles.buttonTextStyle}
            onPress={() => {
              console.log("RECREO", breakTime);
              setActivePerson("BREAK");
            }}
          >
            IR AL RECESO
          </Button>
          <Button
            mode="contained"
            color={"#6DC0D5"}
            style={styles.buttonStyleWorking}
            labelStyle={styles.buttonTextStyle}
            onPress={() => {
              console.log("TERMINAR LA JORNADA", finishTime);
              setActivePerson("FINISHED");
            }}
          >
            FINALIZAR LA JORNADA
          </Button>
        </>
      );
    } else if (activePerson == "BREAK") {
      return (
        <Button
          mode="contained"
          color={Newcolor}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={() => {
            console.log("DEVUELTA", startTime);
            setActivePerson("WORKING");
          }}
        >
          VOLVER A TRABAJAR
        </Button>
      );
    } else {
      return (
        <Button
          mode="contained"
          color={Newcolor}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={() => {
            console.log("HORAS EXTRA", extraTime);
            setActivePerson("WORKING");
          }}
        >
          TRABAJAR HORAS EXTRA!
        </Button>
      );
    }
  };
  // ----------------------------------------------------------------------- //
  return (
    <View style={styles.container}>
      <View
        style={[styles.container2, { shadowColor: Newcolor, minHeight: Tops }]}
      >
        <View
          style={[
            styles.incontainer2,
            { shadowColor: Newcolor, borderColor: Newcolor },
          ]}
        >
          <Text style={styles.textinContainer2}>BIENVENIDO!</Text>
          <Text style={styles.text2inContainer2}>
            {name} {lastName}
          </Text>
        </View>
       
        <View style={styles.containerCalendar}>
            <CalendarDay colors={Newcolor}/>
        </View>
        <View style={styles.containerTextBlackContainer}>
          <Text style={styles.textBlackContainer}>REGISTRA TU HORA!</Text>
        </View>
      </View>
      <View style={[styles.container3, { shadowColor: Newcolor }]}>
        <TextValidator />
      </View>
      <View style={styles.containerButton}>
        <ButtonValidator />
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
  // DENTRO DEL CONTAINER GENERAL //
  containerButton: {
    position: "relative",
    bottom: 70,
  },
  buttonStyle: {
    borderRadius: 15,
    width: Dimensions.get("window").width / 1.5,
  },
  buttonStyleWorking: {
    marginVertical: 15,
    borderRadius: 15,
    width: Dimensions.get("window").width / 1.5,
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
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
    width: Dimensions.get("window").width / 1.14,
    backgroundColor: "white",
    borderRadius: 20,
    bottom: 140,
    maxHeight: 300,
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
    fontSize: 15,
    paddingLeft: 40,
    paddingTop: 20,
  },
  text2inContainer2: {
    fontSize: 18,
    paddingLeft: 20,
  },
  // CALENDARIO //
  containerCalendar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textCalendar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
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
  textTimer: {
    fontSize: 60,
    textAlign: "center",
    fontFamily: "Roboto",
    textShadowColor: "rgba(0,0,0,0.25) 100%",
    textShadowOffset: { width: 0, height: 2.5 },
    textShadowRadius: 1,
  },
  containerIcon: {
    paddingTop: 20,
  },
  containerText: {
    marginTop: 10,
  },
  informationText: {
    marginTop: 10,
    color: "#3D3D3D",
    fontSize: 18,
    textAlign: "center",
  },
});
