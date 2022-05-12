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
import { Profile } from "./Screens/ProfileScreen";
import { LogOut } from "./Screens/LogOutScreen";
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
      
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HOME") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "PROFILE") {
            iconName = focused ? "heart" : "ios-list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        //EDICION DE LA BARRA DE MENU
        tabBarActiveTintColor: "tomato",
        tabBarActiveBackgroundColor:"tomato",
        tabBarInactiveBackgroundColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <TabNav.Screen
        name="HOME"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></TabNav.Screen>
      <TabNav.Screen
        name="PROFILE"
        component={Profile}
        options={{ headerShown: false }}
      ></TabNav.Screen>
      <TabNav.Screen
        name="LOGOF"
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
