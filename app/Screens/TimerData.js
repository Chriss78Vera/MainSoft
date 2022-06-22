import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { MenuPicture } from "../Components/ProfilePicture";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateComplete, dateMonth, ShowMonth } from "../Components/Date";
// NAVIGATIONS IMPORT
export const TimerData = () => {
  const navigation = useNavigation();
  // DATE PICKER
  const [dateTmp, setDateTmp] = React.useState(dateMonth());
  const [date2, setDate2] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState("date");
  let textMonth = ShowMonth(dateTmp);
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
            <MenuPicture colorBackground={"black"} />
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textCalendar}> Selecciona el Mes: </Text>
          <Text style={styles.textCalendar}>{dateTmp}</Text>
          <IconButton
            icon={"calendar-month"}
            iconColor={"black"}
            size={Dimensions.get("window").width / 10}
            onPress={() => {
              showMode(), console.log(ShowMonth(dateTmp));
            }}
          />
        </View>
        <View>
          <Text>{textMonth}</Text>
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
