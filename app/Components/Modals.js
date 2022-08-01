import { StyleSheet, Text, View, Modal } from "react-native";
import { Icon } from "react-native-elements";

export const ModalInfoError = ({ modalVisible, setModalVisible, message,description }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <View style={styles.viewDirrect}>
            <View style={{ paddingLeft: 110 }}>
              <Icon
                name="information-circle-outline"
                type="ionicon"
                size={90}
                color="#E85D75"
              />
            </View>
            <View style={{ paddingLeft: 60 }}>
              <Icon
                name="close"
                type="ionicon"
                size={35}
                color="#E85D75"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
          <Text style={styles.modalTitle}>{message}</Text>
          <View style={[styles.viewFlex]}>
            <Text style={styles.textMessage}>{description}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export const ModalInfoConfirmation = ({ modalVisible, setModalVisible, message,description }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <View style={styles.viewDirrect}>
            <View style={{ paddingLeft: 110 }}>
              <Icon
                name="information-circle-outline"
                type="ionicon"
                size={90}
                color="#E85D75"
              />
            </View>
            <View style={{ paddingLeft: 60 }}>
              <Icon
                name="close"
                type="ionicon"
                size={35}
                color="#E85D75"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
          <Text style={styles.modalTitle}>{message}</Text>
          <View style={[styles.viewFlex]}>
            <Text style={styles.textMessage}>{description}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#979797",
  },
  viewFlex: {
    alignItems: "flex-start",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  },
  viewDirrect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewDirrect: {
    flexDirection: "row",
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#6DC0D5",
    textAlign: "center",
  },
  itemModalStyle: {
    flexDirection: "row",
  },
});
