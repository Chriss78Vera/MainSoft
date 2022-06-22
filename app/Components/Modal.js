import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator, Dimensions } from "react-native";

export const ModalReload = (props) => {
  const {modalVisible, textModal} = props;
  let backgroundColor= "linear-gradient(0deg, rgba(236,236,236,1) 25%, rgba(47,218,167,0) 100%)"
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={75} color="#6DC0D5" />
            <Text style={styles.modalText}>{textModal}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create(
  {
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor:"linear-gradient(0deg, rgba(236,236,236,1) 25%, rgba(47,218,167,0) 100%)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: Dimensions.get("window").height,
    width: Dimensions.get("window").width/1.5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize:20,
    textAlign: "center"
  }
});
