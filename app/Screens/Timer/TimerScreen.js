import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, Modal } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { CalendarDay, DateTimer } from "../../Components/Calendar";
import { Input } from "@rneui/themed";
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
  const [dayTime, setDayTime] = React.useState(
    timeMoreData.totalDay == null ? "0" : timeMoreData.totalDay
  );
  const [startTime, setStartTime] = React.useState(
    timeMoreData.startWork == null ? "00:00:00" : timeMoreData.startWork
  );
  const [finishTime, setFinishTime] = React.useState(
    timeMoreData.startBreak == null ? "00:00:00" : timeMoreData.startBreak
  );
  const [startBreak, setBreakTime] = React.useState(
    timeMoreData.startBreak == null ? "00:00:00" : timeMoreData.startBreak
  );
  const [finishBreak, setFinishBreakTime] = React.useState(
    timeMoreData.startBack == null ? "00:00:00" : timeMoreData.startBack
  );
  const [startReturn, setStartReturnTime] = React.useState(
    timeMoreData.startBack == null ? "00:00:00" : timeMoreData.startBack
  );
  const [finishWork, setFinishWorkTime] = React.useState(
    timeMoreData.finishTime == null ? "00:00:00" : timeMoreData.finishTime
  );
  const [descriptionBreak, setDescriptionBreakTime] = React.useState(
    timeMoreData.DescriptionBeforeBreak == null
      ? null
      : timeMoreData.DescriptionBeforeBreak
  );
  const [descriptionFinish, setDescriptionFinish] = React.useState(
    timeMoreData.DescriptionFinishDay == null
      ? null
      : timeMoreData.DescriptionFinishDay
  );
  const [imageBreak, setImageBreakTime] = React.useState(
    timeMoreData.ImageBreak
  );
  const [imageFinish, setImageFinish] = React.useState(
    timeMoreData.ImageFinish
  );
  

  let ComponenteDescriptionBreak = () => {
    if (descriptionBreak == null) {
      return <></>;
    } else {
      return (
        <View style={styles.viewDescanso}>
          <Text style={styles.textTitleBreak}> DESCRIPCION </Text>
          <View style={styles.viewTimeBreak}>
            <Text style={styles.descrptionTextBreak}>{descriptionBreak}</Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              {imageBreak == null ? (
                <></>
              ) : (
                <Image
                  style={{
                    minWidth: Dimensions.get("window").width / 1.5,
                    height: 300,
                  }}
                  source={{
                    uri: imageBreak,
                  }}
                />
              )}
            </View>
          </View>
        </View>
      );
    }
  };
  let ComponenteDescriptionFinish = () => {
    if (descriptionFinish == null) {
      return <></>;
    } else {
      return (
        <View style={styles.viewFin}>
          <Text style={styles.textTitleFinsih}> DESCRIPCION FINAL </Text>
          <View style={styles.viewTimeFinish}>
            <Text style={styles.descrptionTextFinish}>{descriptionFinish}</Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              {imageFinish == null ? (
                <></>
              ) : (
                <Image
                  style={{
                    minWidth: Dimensions.get("window").width / 1.5,
                    height: 300,
                  }}
                  source={{
                    uri: imageFinish,
                  }}
                />
              )}
            </View>
          </View>
        </View>
      );
    }
  };
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
              <ComponenteDescriptionBreak />
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
              <ComponenteDescriptionFinish />
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
          <Text style={styles.textSubtitle}>{dayTime} HORAS</Text>
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
    paddingVertical: Dimensions.get("window").width / 35,
  },
  textSubtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2FDAA7",
    paddingVertical: Dimensions.get("window").width / 35,
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
    maxHeight: Dimensions.get("window").height / 2,
    paddingTop: 10,
  },
  viewFin: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").height / 2,
    paddingTop: 10,
  },
  viewFinDescription: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 10,
  },
  viewTime: {
    paddingTop: Dimensions.get("window").height / 30,
    flexDirection: "row",
  },
  viewTimeFinish: {
    flexDirection: "column",
  },
  viewTimeBreak: {
    flexDirection: "column",
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
    paddingHorizontal: Dimensions.get("window").width / 40,
  },
  textBreakTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ED6A5E",
    paddingHorizontal: Dimensions.get("window").width / 40,
  },
  textFinishTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6DC0D5",
    paddingHorizontal: Dimensions.get("window").width / 40,
  },
  descrptionTextBreak: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ED6A5E",
    textAlign: "center",
  },
  descrptionTextFinish: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6DC0D5",
  },
  buttonStyle: {
    borderRadius: 15,
    marginTop: Dimensions.get("window").height / 50,
  },
  // MODAL PL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor:
      "linear-gradient(0deg, rgba(236,236,236,1) 25%, rgba(47,218,167,0) 100%)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width / 1.3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
  viewDescription: {
    width: Dimensions.get("window").width / 1.5,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
  },
});
