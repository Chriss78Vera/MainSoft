import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
export const LoginScreen = () => {

  return (
    <View style={styles.container}>
      <Image style={{height:130,minWidth: 240}} source={{uri:"https://dewey.tailorbrands.com/production/brand_version_mockup_image/160/7252404160_f7e73f6f-de4e-4158-b8d0-f253ac96bfc4.png?cb=1652138302%22"}} />
      <Text>Open up App.js to start working on your app!</Text>
        
      <StatusBar style="auto" />
    </View>
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
