import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { MenuPicture } from "../Components/ProfilePicture";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateComplete, dateMonth, ShowMonth } from "../Components/Date";
import { getTimers } from "../Services/TimerRegister/TimerUser";
// NAVIGATIONS IMPORT
export const TimerData = () => {
  const navigation = useNavigation();
  // DATE PICKER MONTH
  const [dateTmp, setDateTmp] = React.useState(dateMonth());
  const [date2, setDate2] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState("date");
  // DATE PICKER DATE
  const [dateDay, setDateDay] = React.useState(dateComplete());
  const [date1, setDate1] = React.useState(new Date());
  const [showDay, setShowDay] = React.useState(false);
  let textMonth = ShowMonth(dateTmp);
  // ESTADO
  // DATE PICKER MONTH
  const [dataTime, setDataTime] = React.useState([]);
  React.useEffect(() => {
    getTimers(refreshScreen);
  }, []);
  const refreshScreen = (data) => {
    setDataTime(data);
  };
  const setTime = async (date) => {
    await getTimers(refreshScreen);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === "windows");
    setDate2(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      (tempDate.getMonth() < 9 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    setDateTmp(fDate);
  };
  // DATE PCIKER DIA
  const showModeDay = (currentMode) => {
    setShowDay(true);
    setMode(currentMode);
  };
  const onChangeDay = async (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShowDay(Platform.OS === "windows");
    setDate1(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      (tempDate.getDate() < 10 ? "0" : "") +
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() < 9 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    setDateDay(fDate);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View style={[styles.incontainer2]}>
          <View style={{ width: Dimensions.get("window").width / 2.3 }}>
            <Text style={styles.textinContainer2}>
              {global.name} {global.lastName}
            </Text>
            <Text style={styles.text2inContainer2}>DESAROLLADOR</Text>
          </View>
          <View>
            <MenuPicture colorBackground={"#6DC0D5"} />
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textCalendar}> SELECCIONA EL MES: </Text>
          <Text style={styles.textCalendar}>{dateTmp}</Text>
          <IconButton
            icon={"calendar-month"}
            iconColor={"black"}
            size={Dimensions.get("window").width / 10}
            onPress={async() => {
              showMode(), console.log(ShowMonth(dateTmp))
            }}
          />
        </View>
        <View>
          <Text style={styles.textMonth}>{textMonth}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> HORAS MENSUALES: </Text>
          <Text style={styles.textSubtitle}>160 HORAS</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> HORAS EXTRAS: </Text>
          <Text style={styles.textSubtitle}>80 HORAS</Text>
        </View>
        <View>
          <Text style={styles.textMonthDetails}>DETALLES</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textCalendar}> SELECCIONA EL DIA: </Text>
          <Text style={styles.textCalendar}>{dateDay}</Text>
          <IconButton
            icon={"calendar-month"}
            iconColor={"black"}
            size={Dimensions.get("window").width / 10}
            onPress={async() => {
              showModeDay(), console.log(ShowMonth(dateTmp))
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> JORNADA DIARIA: </Text>
          <Text style={styles.textSubtitle}>8 HORAS</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> HORAS EXTRA: </Text>
          <Text style={styles.textSubtitle}>4 HORAS</Text>
        </View>
        <View>
          <Button
            mode="contained"
            color={"#6DC0D5"}
            style={styles.buttonStyle}
            labelStyle={styles.buttonTextStyle}
            onPress={async () => {
              await setTime();
                navigation.navigate("TIMERMOREDATA", {
                  timeMoreData: dataTime,
                  DayEfe: date1.getDay(),
                });
              console.log(dataTime);
            }}
          >
            MAS DETALLES
          </Button>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date2}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}
        {showDay && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date1}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDay}
            maximumDate={new Date()}
            minimumDate={date2}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container3: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#3D3D3D",
    alignItems: "center",
    width: Dimensions.get("window").width,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    shadowColor: "black",
  },
  container2: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width,
  },
  buttonSubtittleStyle: {
    fontWeight: "bold",
    fontSize: 45,
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
    borderColor: "#6DC0D5",
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
  buttonSubtittleStyle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textCalendar: {
    fontSize: 15,
    paddingTop: Dimensions.get("window").width / 17,
    paddingHorizontal: Dimensions.get("window").height / 40,
    fontWeight: "bold",
  },
  textMonth: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: Dimensions.get("window").width / 25,
  },
  textMonthDetails: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: Dimensions.get("window").width / 25,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: Dimensions.get("window").width / 30,
  },
  textSubtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2FDAA7",
    paddingVertical: Dimensions.get("window").width / 30,
  },
  buttonStyle: {
    borderRadius: 15,
    marginTop: 50,
    width: Dimensions.get("window").width / 1.5,
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
});
