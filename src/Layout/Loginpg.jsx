import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button, Checkbox, Text } from "react-native-paper";
import { ScrollView } from "react-native";

export default function Loginpg() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [checked, setChecked] = useState(false);

  const handleAuthentication = () => {
    const data = {
      email,
      password,
    };

    console.warn(data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.logoContainer}>
        <Icon.Button
          name="react"
          backgroundColor="transparent"
          color="#7367f0"
          size={70}
          style={{ padding: 0 }}
        ></Icon.Button>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText} variant="titleLarge">
          Welcome to Shabuj Global Education!!
        </Text>
        <Text style={styles.welcomeBottomText} variant="titleMedium">
          Please sign-in to your account and start the adventure{" "}
        </Text>
      </View>

      <View>
        <Text style={styles.inputLabel} variant="titleLarge">
          Email
        </Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
        />
      </View>

      <View>
        <Text style={styles.inputLabel} variant="titleLarge">
          Password
        </Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={{ width: "92%" }}
            secureTextEntry={passwordVisible}
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
          <Icon.Button
            name={passwordVisible ? "eye" : "eye-slash"}
            backgroundColor="transparent"
            underlayColor="transparent"
            color={passwordVisible ? "#7367f0" : "gray"}
            size={15}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
          marginVertical: 20,
        }}
      >
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
          color="#7367f0"
          uncheckedColor="#c4c3c8"
        />
        <Text
          style={[styles.inputLabel, { color: "#898888" }]}
          variant="titleLarge"
        >
          Remember Me
        </Text>
      </View>

      <View>
        <Button
          mode="elevated"
          buttonColor="#7367f0"
          textColor="white"
          onPress={handleAuthentication}
          labelStyle={{
            fontFamily: "Raleway_700Bold",
          }}
          style={{
            borderRadius: 6,
          }}
          contentStyle={{
            padding: 5,
          }}
        >
          Login
        </Button>
      </View>

      <View
        style={{
          paddingVertical: 15,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={[styles.welcomeBottomText, { fontSize: 15 }]}
          variant="titleMedium"
        >
          New on our Platform?{" "}
          <Text
            style={[
              styles.welcomeBottomText,
              { color: "#7367f0", fontSize: 15 },
            ]}
            variant="titleMedium"
          >
            Create an account
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  headingText: {
    fontSize: 22,
    fontFamily: "Raleway_700Bold",
  },
  welcomeContainer: {
    marginTop: 40,
    marginBottom: 50,
  },
  welcomeText: {
    fontFamily: "Raleway_500Medium",
    marginBottom: 10,
  },
  welcomeBottomText: {
    fontFamily: "Raleway_400Regular",
    color: "gray",
  },
  inputLabel: {
    fontFamily: "Raleway_400Regular",
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "#e7e7e9",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#e7e7e9",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
});
