import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
// IMPORTS DE NAVIGATE
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// SCREENS //
import { LoginScreenMail } from "./app/Screens/LoginScreenEmail";
import { LoginScreenPassword } from "./app/Screens/LoginScreenPassword";
import { HomeScreen } from "./app/Screens/HomeScreen";
import { Profile } from "./app/Screens/ProfileScreen";
import { TimerData } from "./app/Screens/TimerData";
import { loadFirebaseConfiguration } from "./app/Services/FireBaseConfig";
import { PersonalData } from "./app/Screens/Profile/PersonalData";
import { DocumentsData } from "./app/Screens/Profile/DocumentsData";
import { TimerScreen } from "./app/Screens/Timer/TimerScreen";
import { DescriptionTime } from "./app/Screens/Timer/DescriptionTime";
import { getTimers } from "./app/Services/TimerRegister/TimerUser";
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
        component={LoginScreenMail}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
      <NativeStackNav.Screen
        name="LOGINPASSWORD"
        component={LoginScreenPassword}
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
const DataPersonal = () => {
  return (
    <NativeStackNav.Navigator initialRouteName="DATAPERSONAL">
      <NativeStackNav.Screen
        name="DATAPERSONAL"
        component={Profile}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
      <NativeStackNav.Screen
        name="SHOWDATA"
        component={PersonalData}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
      <NativeStackNav.Screen
        name="DOCUMENTS"
        component={DocumentsData}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
    </NativeStackNav.Navigator>
  );
};
const TimeData = () => {
  return (
    <NativeStackNav.Navigator initialRouteName="DATATIME">
      <NativeStackNav.Screen
        name="DATATIME"
        component={TimerData}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
      <NativeStackNav.Screen
        name="TIMERMOREDATA"
        component={TimerScreen}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>
    </NativeStackNav.Navigator>
  );
};
const HomeRegisterTime = () => {
  return (
    <NativeStackNav.Navigator initialRouteName="HOMETIME">
      <NativeStackNav.Screen
        name="HOMETIME"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></NativeStackNav.Screen>

      <NativeStackNav.Screen
        name="DESCRIPTIONTIME"
        component={DescriptionTime}
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
            iconName = focused ? "ios-home-outline" : "ios-home";
          } else if (route.name === "PROFILE") {
            iconName = focused
              ? "ios-person-circle-outline"
              : "ios-person-circle";
          } else if (route.name === "DATATIMER") {
            iconName = focused ? "calendar-outline" : "calendar-sharp";
            
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        //EDICION DE LA BARRA DE MENU
        tabBarActiveTintColor: "#6DC0D5",
        tabBarActiveBackgroundColor: "#282828",
        tabBarInactiveBackgroundColor: "#3D3D3D",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { height: 50 },
        tabBarShowLabel: false,
      })}
    >
      <TabNav.Screen
        name="PROFILE"
        component={DataPersonal}
        options={{ headerShown: false }}
      ></TabNav.Screen>
      <TabNav.Screen
        name="HOME"
        component={HomeRegisterTime}
        options={{ headerShown: false }}
      ></TabNav.Screen>
      <TabNav.Screen
        name="DATATIMER"
        component={TimeData}
        options={{ headerShown: false }}
        
      ></TabNav.Screen>
    </TabNav.Navigator>
  );
};
export default App = () => {
  // INICIALIZACION DE LA BASE DE DATOS //
  loadFirebaseConfiguration();
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
