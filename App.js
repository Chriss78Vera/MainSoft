import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// SCREENS //
import { LoginScreen } from "../MainSoft_Proyect/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";

//CONSTANTES USADAS //
const NativeStackNav = createNativeStackNavigator();
//LOGIN SCREEN//
//*************************************************//
const LoginNav = () => {
  return (
    <NativeStackNav.Navigator initialRouteName="LOGINS">
      <NativeStackNav.Screen
        name="LOGINS"
        component={LoginScreen}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
    </NativeStackNav.Navigator>
  );
};
export default App = () => {
  return (
    <NavigationContainer>
      <LoginNav />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
