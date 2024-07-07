import { StyleSheet, View, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button, Checkbox, Text } from "react-native-paper";
import { ScrollView } from "react-native";
import MainHeading from "../Component/MainHeading";
import ActionButton from "../Component/ActionButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase.config";
import { AuthContext } from "../../AuthContext";

export default function Loginpg() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [checked, setChecked] = useState(false);
  const { signIn } = useContext(AuthContext);

  const navigation = useNavigation();

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  const navigateToRoot = () => {
    navigation.navigate("Root");
  };
  const HandleError = () => {
    setPassword("");
    setEmail("");
  };

  const handleLogin = async () => {
    try {
      signIn(email, password); // Call signIn directly
      Alert.alert("Success", "Login Success!", [
        {
          text: "Ok",
          onPress: navigateToRoot,
          style: "default",
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message, [
        {
          text: "Ok",
          onPress: () => HandleError,
          style: "default",
        },
      ]);
    }
  };

  const isButtonDisabled = !(email.length > 0 && password.length > 0);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* text & logo */}
      <MainHeading
        subheading={"Please sign-in to your account and start the adventure"}
      />
      {/* email */}
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

      {/* passwrd */}
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

      {/* remember */}
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

      <ActionButton
        label={"Login"}
        handlefunction={handleLogin}
        disabled={isButtonDisabled}
      />

      {/* botton text */}
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
            onPress={navigateToSignup}
          >
            Create an account
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "white",
  },
  welcomeBottomText: {
    fontFamily: "Raleway_400Regular",
    color: "gray",
    textAlign: "center",
  },

  inputLabel: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
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