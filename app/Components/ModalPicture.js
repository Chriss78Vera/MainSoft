import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
export const ModalReloadPicture = (props) => {
  const { modalVisible, picture, cerrar } = props;
  const [modal, setModal] = React.useState();
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Image
                style={{
                  minWidth: Dimensions.get("window").width / 1.5,
                  height: 300,
                }}
                source={{
                  uri: picture,
                }}
              />
            </View>

            <Button
              icon="archive"
              style={styles.buttonStyle}
              mode="contained"
              onPress={async () => {
                setModal(false);
              }}
            >
              CERRAR
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonStyle: {
    paddingHorizontal: 10,
  },
});
