import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function ActionButton({ label, handlefunction, disabled }) {
  return (
    <View>
      <Button
        mode="elevated"
        buttonColor="#7367f0"
        textColor="white"
        onPress={handlefunction}
        labelStyle={{
          fontFamily: "Raleway_700Bold",
        }}
        style={{
          borderRadius: 6,
        }}
        contentStyle={{
          padding: 5,
        }}
        disabled={disabled}
      >
        {label}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});