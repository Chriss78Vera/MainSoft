import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
// PERFIL INICIO DEL INGRESO AL MENU DEL PERFIL
export const ProfilePicture = () => {
  return (
    <Image
      source={{
        uri:
          global.picture == null
            ? "https://ui-avatars.com/api/?background=6DC0D5&color=fff&size=600&font-size=0.4&name=" +
              global.name +
              "+" +
              global.lastName
            : global.picture,
      }}
      style={{
        width: 125,
        height: 125,
        borderRadius: 100,
        position: "relative",
        bottom: 50,
      }}
    />
  );
};
// SUBIR UN ARCHIVO 
export const EditProfilePicture = (props) => {
  //IMAGEN
  const{imageUser}=props
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{
          uri:
            imageUser == null
              ? "https://ui-avatars.com/api/?background=6DC0D5&color=fff&size=600&font-size=0.4&name=" +
                global.name +
                "+" +
                global.lastName
              : imageUser,
        }}
        style={{
          width: 125,
          height: 125,
          borderRadius: 100,
          position: "relative",
        }}
      />
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            color: "white",
            textDecorationLine: "underline",
          }}
        >
          Cambiar la foto
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// IMAGEN DE LOS DOCUMENTOS
export const DocumentsPicture = () => {
  return (
    <Image
      source={{
        uri:
          global.picture == null
            ? "https://ui-avatars.com/api/?background=6DC0D5&color=fff&size=600&font-size=0.4&name=" +
              global.name +
              "+" +
              global.lastName
            : global.picture,
      }}
      style={{
        width: 125,
        height: 125,
        borderRadius: 100,
        position: "relative",
      }}
    />
  );
};
// IMAGEN DEL textMenu
export const MenuPicture = (props) => {
  const {colorBackground}=props;
  return (
    <Image
      source={{
        uri:
          global.picture == null
            ? "https://ui-avatars.com/api/?background=6DC0D5&color=fff&size=600&font-size=0.4&name=" +
              global.name +
              "+" +
              global.lastName
            : global.picture,
      }}
      style={{
        width: Dimensions.get("window").width/5,
        height: Dimensions.get("window").height/10,
        borderRadius: 100,
        top: Dimensions.get("window").height/122,
        left: Dimensions.get("window").width/6,
        position: "relative",
        borderColor: colorBackground,
        borderWidth: 2
      }}
    />
  );
};