import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function MainHeading({subheading}) {
  return (
    <View>
      {/* icon */}
      <View style={styles.logoContainer}>
        <Icon.Button
          name="react"
          backgroundColor="transparent"
          color="#7367f0"
          size={70}
          style={{ padding: 0 }}
        ></Icon.Button>
      </View>

      {/* text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText} variant="titleLarge">
          Shabuj Global Education!!
        </Text>
        <Text style={styles.welcomeBottomText} variant="titleMedium">
        {subheading} 
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  welcomeContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  welcomeText: {
    fontFamily: "Raleway_700Bold",
    marginBottom: 10,
    textAlign: "center",
    fontSize:25
  },

  welcomeBottomText: {
    fontFamily: "Raleway_400Regular",
    color: "gray",
    textAlign: "center",
    fontSize:15
  },
});
