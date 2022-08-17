import React from "react";
import { Dimensions, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { Button, IconButton, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
export const ListDays = ({ days, date }) => {
  const navigation = useNavigation();

  if (days.id == null) {
    return (
      <ListItem
        containerStyle={{
          minWidth: Dimensions.get("window").width / 1.2,
          borderRadius: 7,
          borderColor: "#3D3D3D",
          borderWidth: 2,
          marginVertical: Dimensions.get("window").width / 100,
        
        }}
      >
        <ListItem.Content style={{ flexDirection: "row" }}>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize:Dimensions.get("window").width /25,
              paddingHorizontal: Dimensions.get("window").width / 20,
              color: "#ED6A5E",
            }}
          >
            00:00:00
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize:Dimensions.get("window").width /25,
              paddingRight: Dimensions.get("window").width / 20,
              color: "#6DC0D5",
            }}
          >
            00:00:00
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize:Dimensions.get("window").width /25,
              paddingRight: Dimensions.get("window").width / 20,
              color: "#2FDAA7",
            }}
          >
            00:00:00
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        containerStyle={{
          minWidth: Dimensions.get("window").width / 1.2,
          borderRadius: 7,
          borderColor: "#3D3D3D",
          borderWidth: 2,
          marginVertical: Dimensions.get("window").width / 100,
        }}
      >
        <ListItem.Content style={{ flexDirection: "row" }}>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize:Dimensions.get("window").width /25,
              paddingLeft: Dimensions.get("window").width / 20,
            }}
          >
            {days.id}
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize:Dimensions.get("window").width /25,
              paddingHorizontal: Dimensions.get("window").width / 20,
              color: "#ED6A5E",
            }}
          >
            {days.startWork == null ? "00:00:00" : days.startWork}
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize:Dimensions.get("window").width /25,
              paddingRight: Dimensions.get("window").width / 20,
              color: "#6DC0D5",
            }}
          >
            {days.finishTime == null ? "00:00:00" : days.finishTime}
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize:Dimensions.get("window").width /25,
              paddingRight: Dimensions.get("window").width / 20,
              color: "#2FDAA7",
            }}
          >
            {days.totalDay == null ? "00:00:00" : days.totalDay}
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              paddingRight: Dimensions.get("window").width / 20,
            }}
          >
            {days.totalDay == null ? (
              <IconButton
                icon="arrow-right"
                size={Dimensions.get("window").width /25}
                disabled={true}
                onPress={async () => {
                  navigation.navigate("TIMERMOREDATA", {
                    timeMoreData: days,
                    DayEfe: days.id,
                  });
                }}
              />
            ) : (
              <IconButton
                icon="arrow-right"
                size={20}
                onPress={async () => {
                  navigation.navigate("TIMERMOREDATA", {
                    timeMoreData: days,
                    DayEfe: days.id,
                  });
                }}
              />
            )}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
