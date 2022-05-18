import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
// IMPORTS DE NAVIGATE
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// SCREENS //
import { LoginScreen } from "../MainSoft_Proyect/Screens/LoginScreen";
import { HomeScreen } from "../MainSoft_Proyect/Screens/HomeScreen";
import { Profile } from "../MainSoft_Proyect/Screens/ProfileScreen";
import { LogOut } from "../MainSoft_Proyect/Screens/LogOutScreen";
//CONSTANTES USADAS //
const NativeStackNav = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();
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
      <NativeStackNav.Screen
        name="TIMER"
        component={UserNav}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
    </NativeStackNav.Navigator>
  );
};

const UserNav = () => {
  return (
    <TabNav.Navigator
      initialRouteName="HOME"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "HOME") {
            iconName = focused
              ? "ios-home-outline":"ios-home"
              ;
          } else if (route.name === "PROFILE") {
            iconName = focused ? "ios-person-circle-outline":"ios-person-circle" ;
          }else if(route.name === "LOG-OUT"){
            iconName = focused ? "md-log-in-outline":"md-log-in";
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        //EDICION DE LA BARRA DE MENU
        tabBarActiveTintColor: "#6DC0D5",
        tabBarActiveBackgroundColor: "#282828",
        tabBarInactiveBackgroundColor: "#3D3D3D",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {height:50},
        tabBarShowLabel: false,
      })}
    >
      <TabNav.Screen
        name="PROFILE"
        component={Profile}
        options={{ headerShown: false }}
      ></TabNav.Screen>
      <TabNav.Screen
        name="HOME"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></TabNav.Screen>
      <TabNav.Screen
        name="LOG-OUT"
        component={LogOut}
        options={{ headerShown: false }}
      ></TabNav.Screen>
    </TabNav.Navigator>
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
