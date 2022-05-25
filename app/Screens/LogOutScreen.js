import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";

// NAVIGATIONS IMPORT
export const LogOut = () => {
  const navigation = useNavigation();
  const cerrar = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("LOGINS");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <View style={styles.container}>
      <Text> VUELVE PRONTO </Text>
      <Button
        icon={(20, "arrow-left")}
        mode="contained"
        color={"#6DC0D5"}
        labelStyle={[styles.buttonSubtittleStyle, { color: "white" }]}
        onPress={() => {
          cerrar();
        }}
      >
        DESCONECTARSE
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSubtittleStyle: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
