import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, IconButton } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { MenuPicture } from "../Components/ProfilePicture";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  dateComplete,
  dateMonth,
  ShowMonth,
  getMonth,
} from "../Components/Date";
import { getTimers, getTimersMonth } from "../Services/TimerRegister/TimerUser";
import { ModalReload } from "../Components/Modal";
import { DateTimer, DateTimerData } from "../Components/Calendar";
import MonthPicker from "react-native-month-year-picker";
import { Picker } from "@react-native-picker/picker";
import { ListDays } from "../Components/ListDays";
// NAVIGATIONS IMPORT
export const TimerData = () => {
  // DATE PICKER MONTH
  const [mode, setMode] = React.useState("date");
  // DATE PICKER DATE
  const [dateDay, setDateDay] = React.useState(dateComplete());
  const [month, setMonth] = React.useState();
  const [date1, setDate1] = React.useState(new Date());
  const [showDay, setShowDay] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [dataTime, setDataTime] = React.useState();
  let textMonth = ShowMonth(dateDay);
  let totalDay = 0;
  let date = new Date().getFullYear() - 1;
  // ESTADO
  // DATE PICKER MONTH

  if (dataTime != null || dataTime != undefined) {
    totalDay = dataTime.totalDay;
  }
  let ActualizacionTime = () => {
    if (change == true) {
      return <></>;
    } else {
      return <ComponenteCarga />;
    }
  };
  let ComponenteBottom = () => {
    if (search == false) {
      return (
        <Button
          mode="contained"
          color={"#6DC0D5"}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={async () => {
            setChange(true);
            getTimers(setDataTime, date1);
            getTimersMonth(setMonth, date1);
            setChange(false);
            setSearch(true);
          }}
        >
          Buscar
        </Button>
      );
    } else {
      return (
        <View>
          <FlatList
            data={dataTime}
            renderItem={({ item }) => {
              return <ListDays days={item} date={date1.getDay()} />;
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    }
  };
  let ComponenteCarga = () => {
    if (search == true) {
      if (dataTime == null) {
        return (
          <>
            <View>
              <Text style={styles.textMonth}>{textMonth}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}> HORAS MENSUALES: </Text>
              <Text style={styles.textSubtitle}>
                {month != null ? month : "00:00:00"} HORAS
              </Text>
            </View>
            <View>
              <Text style={styles.textMonthDetails}>DETALLES</Text>
            </View>
          </>
        );
      } else {
        return (
          <>
            <View>
              <Text style={styles.textMonth}>{textMonth}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}> HORAS MENSUALES: </Text>
              <Text style={styles.textSubtitle}>
                {" "}
                {month == undefined || month == null
                  ? "NO TIENES NINGUN REGISTRO"
                  : month + " HORAS"}
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={styles.textMonthDetails}>DETALLES</Text>
              <View
                style={{
                  minWidth: Dimensions.get("window").width / 1.3,
                  borderRadius: 7,
                  borderColor: "#3D3D3D",
                  borderWidth: 2,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.textMenuDia}>DIA</Text>
                <Text style={styles.textMenuInicio}>INICIO</Text>
                <Text style={styles.textMenuFin}>FIN</Text>
                <Text style={styles.textMenuTotal}>TOTAL</Text>
                <Text style={styles.textMenuTotalMore}>INFO</Text>
              </View>
            </View>
          </>
        );
      }
    } else {
      return <></>;
    }
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
      (tempDate.getMonth() < 9 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    setDateDay(fDate);
    setSearch(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View style={[styles.incontainer2]}>
          <View style={{ width: Dimensions.get("window").width / 2.3 }}>
            <Text style={styles.textinContainer2}>
              {global.name} {global.lastName}
            </Text>
            <Text style={styles.text2inContainer2}>{global.workStation}</Text>
          </View>
          <View>
            <MenuPicture colorBackground={"#6DC0D5"} />
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textCalendar}> SELECCIONA LA FECHA: </Text>
          <Text style={styles.textCalendar}>{dateDay}</Text>
          <IconButton
            icon={"calendar-month"}
            iconColor={"black"}
            size={Dimensions.get("window").width / 12}
            onPress={async () => {
              showModeDay();
            }}
          />
        </View>
        <ActualizacionTime />
        <View>
          <ComponenteBottom />
        </View>
        {showDay && (
          <DateTimePicker
            testID="dateMonthPicker"
            value={date1}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDay}
            maximumDate={new Date("12/31/2022")}
            minimumDate={new Date("01/01/2022")}
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
    paddingVertical: Dimensions.get("window").width / 25,
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
  textMenuDia: {
    fontWeight: "bold",

    paddingHorizontal: Dimensions.get("window").width / 40,
  },
  textMenuInicio: {
    fontWeight: "bold",

    paddingHorizontal: Dimensions.get("window").width / 20,
  },
  textMenuFin: {
    fontWeight: "bold",

    paddingHorizontal: Dimensions.get("window").width / 20,
  },
  textMenuTotal: {
    fontWeight: "bold",

    paddingHorizontal: Dimensions.get("window").width / 15,
  },
  textMenuTotalMore: {
    fontWeight: "bold",

  },
});
