import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { CalendarDay, DateTimer } from "../../Components/Calendar";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// NAVIGATIONS IMPORT
export const TimerScreen = ({ route }) => {
  const navigation = useNavigation();
  let timeMoreData = null;
  let DayEfe = null;
  timeMoreData = route.params.timeMoreData;
  DayEfe = route.params.DayEfe;
  const [dataTime, setDataTime] = React.useState([]);

  // VARIABLES UTILIZADAS
  const [startTime, setStartTime] = React.useState(timeMoreData[0].startWork);
  const [finishTime, setFinishTime] = React.useState(
    timeMoreData[0].startBreak
  );
  const [startBreak, setBreakTime] = React.useState(timeMoreData[0].startBreak);
  const [finishBreak, setFinishBreakTime] = React.useState(
    timeMoreData[0].startBack
  );
  const [startReturn, setStartReturnTime] = React.useState(
    timeMoreData[0].startBack
  );
  const [finishWork, setFinishWorkTime] = React.useState(
    timeMoreData[0].finishTime
  );
  let ComponentView = () => {
    if (timeMoreData == null) {
      return (
        <>
          <Text>NO HAY DATOS INGRESADOS ESE DIA </Text>
          <DateTimer dayNumber={DayEfe} />
        </>
      );
    } else {
      return (
        <>
          <SafeAreaProvider>
            <ScrollView>
              <View style={styles.viewTrabajando}>
                <Text style={styles.textTitleWork}> TRABAJANDO </Text>
                <View style={styles.viewTime}>
                  <Text style={styles.textTimeWork}>{startTime}</Text>
                  <Text style={styles.textTimeWork}>
                    - - - - - - - - - - - - - - - - - - - - -
                  </Text>
                  <Text style={styles.textTimeWork}>{finishTime}</Text>
                </View>
              </View>
              <View style={styles.viewDescanso}>
                <Text style={styles.textTitleBreak}> DESCANSO </Text>
                <View style={styles.viewTime}>
                  <Text style={styles.textBreakTime}>{startBreak}</Text>
                  <Text style={styles.textBreakTime}>
                    - - - - - - - - - - - - - - - - - - - - -
                  </Text>
                  <Text style={styles.textBreakTime}>{finishBreak}</Text>
                </View>
              </View>
              <View style={styles.viewFin}>
                <Text style={styles.textTitleFinsih}> FIN DE LA JORNADA </Text>
                <View style={styles.viewTime}>
                  <Text style={styles.textFinishTime}>{startReturn}</Text>
                  <Text style={styles.textFinishTime}>
                    - - - - - - - - - - - - - - - - - - - - -
                  </Text>
                  <Text style={styles.textFinishTime}>{finishWork}</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaProvider>
        </>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View>
          <Button
            icon={(20, "arrow-left")}
            labelStyle={[styles.buttonSubtittleStyle, { color: "white" }]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            VOLVER
          </Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <DateTimer dayNumber={DayEfe} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> JORNADA DIARIA: </Text>
          <Text style={styles.textSubtitle}>8 HORAS</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> HORAS EXTRA: </Text>
          <Text style={styles.textSubtitle}>4 HORAS</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <ComponentView />
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
    flex: 2,
    alignItems: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingVertical: Dimensions.get("window").width / 30,
  },
  textSubtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2FDAA7",
    paddingVertical: Dimensions.get("window").width / 30,
  },
  buttonSubtittleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  viewTrabajando: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 9,
  },
  viewDescanso: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 9,
  },
  viewFin: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 9,
  },
  viewTime: {
    paddingTop: Dimensions.get("window").height / 30,
    flexDirection: "row",
  },
  textTitleWork: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2FDAA7",
  },
  textTitleBreak: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ED6A5E",
  },
  textTitleFinsih: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6DC0D5",
  },
  textTimeWork: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2FDAA7",
    paddingHorizontal: Dimensions.get("window").width / 25,
  },
  textBreakTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ED6A5E",
    paddingHorizontal: Dimensions.get("window").width / 25,
  },
  textFinishTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6DC0D5",
    paddingHorizontal: Dimensions.get("window").width / 25,
  },
});
