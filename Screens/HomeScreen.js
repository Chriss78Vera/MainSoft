import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
// IMPORT LIBRERY REACT NATIVE TIMER HOOK
import { useTime } from "react-timer-hook";
// NAVIGATIONS IMPORT
export const HomeScreen = () => {
  // ELEMENTOS PARA EL TIEMPO REAL
  const { seconds, minutes, hours, ampm } = useTime({ format: "24-hour" });
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
  let newHours;
  let newSeconds;
  let newMinutes;
  let Newcolor;

  // VALIDACION PARA EL ESTADO DE TARDE O TEMPRANO
  if (activePerson == "NOTWORKING") {
    if (hours > timeWork) {
      Newcolor = "#E85D75";
    } else {
      Newcolor = "#2FDAA7";
    }
  } else if (activePerson == "WORKING") {
    Newcolor = "#3D3D3D";
  } else if (activePerson == "BREAK") {
    Newcolor = "#ED6A5E";
  } else if (activePerson == "FINISHED") {
    Newcolor = "#6DC0D5";
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
  // TIEMPO GUARDO
  let DateTimer;
  React.useEffect(() => {
    setExtraTime(DateTimer);
    setBreakTime(DateTimer);
    setStartTime(DateTimer);
    setFinishTime(DateTimer);
  }, [(DateTimer = newHours + ":" + newMinutes + ":" + newSeconds)]);
  // VALIDACION DEL TEXTO
  // TIEMPO EXTRA //
  let TextFinished = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds}
        </Text>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>You finished your day!</Text>
          <Text style={[styles.informationText, { color: Newcolor }]}>
            Congratulations!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="alarm"
            mode="contained"
            color={Newcolor}
            style={styles.styleButton}
            labelStyle={styles.textButton}
            onPress={async () => {
              console.log("SAVE EXTRA TIME: " + extraTime);
              setActivePerson("WORKING");
            }}
          >
            Enter work
          </Button>
        </View>
      </>
    );
  };
  // TIEMPO DE DESCANSO //
  let TextBreak = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds} ! {ampm }
        </Text>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>Break Time</Text>
          <Text style={[styles.informationText, { color: Newcolor }]}>
            Watch your time!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="alarm"
            mode="contained"
            color={Newcolor}
            style={styles.styleButton}
            labelStyle={styles.textButton}
            onPress={() => {
              console.log("SAVE RETURN WORKING: ", breakTime);
              setActivePerson("WORKING");
            }}
          >
            Enter work
          </Button>
        </View>
      </>
    );
  };
  let TextNotWorking = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds}
        </Text>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>
            Working time: {timeWork}:00
          </Text>
          {hours > timeWork && activePerson == "WORKING" ? (
            <Text style={[styles.informationText, { color: Newcolor }]}>
              You are late!
            </Text>
          ) : (
            <Text style={[styles.informationText, { color: Newcolor }]}>
              You are on time!
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="alarm"
            mode="contained"
            color={Newcolor}
            style={styles.styleButton}
            labelStyle={styles.textButton}
            onPress={() => {
              console.log("SAVE ENTER WORK: ", startTime);
              setActivePerson("WORKING");
            }}
          >
            Enter work
          </Button>
        </View>
      </>
    );
  };
  let TextWorking = () => {
    return (
      <>
        <Text style={[styles.textTimer, { color: Newcolor }]}>
          {newHours} : {newMinutes} : {newSeconds}
        </Text>
        <View style={[styles.containerText]}>
          <Text style={styles.informationText}>Working...</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="headset"
            mode="contained"
            color={"#ED6A5E"}
            style={styles.styleButtonWorking}
            labelStyle={styles.textButton}
            onPress={() => {
              console.log("SAVE BREAK", breakTime);
              setActivePerson("BREAK");
            }}
          >
            Break
          </Button>
          <Button
            icon="logout"
            mode="contained"
            color={"#6DC0D5"}
            style={styles.styleButtonWorking}
            labelStyle={styles.textButton}
            onPress={() => {
              console.log("SAVE FINISH WORK", finishTime);
              setActivePerson("FINISHED");
            }}
          >
            Finish
          </Button>
        </View>
      </>
    );
  };
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
  // RETURN PARA MOSTRAR LA HORA:MINUTOS:SEGUNDOS
  return (
    <View style={styles.container}>
      {/* <TextValidator /> */}
      <View style={[styles.container2, { shadowColor: Newcolor }]}>
        <View style={[styles.incontainer2, { shadowColor: Newcolor }]}>
          <Text style={styles.textinContainer2}>WELCOME BACK!</Text>
          <Text style={styles.text2inContainer2}>
            {name} {lastName}
          </Text>
        </View>
      </View>
      <View style={[styles.container3, { shadowColor: Newcolor }]}>
        <TextValidator/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  container2: {
    flex: 2,
    position: "relative",
    backgroundColor: "#3D3D3D",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16.0,
    elevation: 24,
  },
  incontainer2: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    top: 50,
    left: 20,
    width: 355,
    maxHeight: 100,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
  },
  textinContainer2: {
    fontWeight: "bold",
    fontSize: 12,
    paddingLeft: 30,
    paddingTop: 25,
  },
  text2inContainer2: {
    fontSize: 15,
    paddingLeft: 20,
  },
  container3: {
    flex: 2,
    position: "relative",
    bottom: 150,
    left: 25,
    width: 337,
    height: 326,
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1.0,
    shadowRadius: 16.0,
    elevation: 24,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  containerText: {
    marginTop: 10,
  },
  textTimer: {
    fontSize: 60,
    textAlign: "center",
    textShadowColor: 'rgba(0,0,0,0.25) 100%',
    textShadowOffset: { width: 0, height: 3, },
    textShadowRadius: 1,
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  informationText: {
    marginTop: 10,
    color: "#3D3D3D",
    fontSize: 18,
    textAlign: "center",
    
  },
 

  styleButton: {
    marginTop: 100,
    width: 220,
  },
  styleButtonWorking: {
    marginTop: 100,
    marginHorizontal: 10,
    width: 200,
  },
});
