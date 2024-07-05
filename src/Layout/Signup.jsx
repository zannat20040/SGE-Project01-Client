import { StyleSheet, View, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Checkbox, Text } from "react-native-paper";
import { ScrollView } from "react-native";
import MainHeading from "../Component/MainHeading";
import ActionButton from "../Component/ActionButton";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { updateProfile, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { AuthContext } from "../../AuthContext";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [whatsappNumber, setWhatsappNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmpassVisible, setConfirmpassVisible] = useState(true);
  const [checked, setChecked] = useState(false);
  const { signUp } = useContext(AuthContext);
  const navigation = useNavigation();

  const navigateToSignin = () => {
    navigation.navigate("Login"); // Navigate to Signup screen
  };

  const handleSignup = async () => {
    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

 
      if (firstName && lastName && phoneNumber) {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });


        Alert.alert("Success", "User created successfully!", [
          {
            text: "Ok",
            onPress: navigateToSignin,
            style: "default",
          },
        ]);
      } else {

        console.error("Missing required fields");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  //  Determine if the button should be disabled based on form validation
  const isButtonDisabled =
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !confirmPassword ||
    !checked;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* logo & text */}
      <MainHeading
        subheading={
          " Please sign up to explore and begin your educational journey with us."
        }
      />

      {/* name */}
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "49%" }}>
          <Text style={[styles.inputLabel]} variant="titleLarge">
            First Name *
          </Text>
          <TextInput
            style={[styles.textInput]}
            value={firstName}
            onChangeText={(e) => setFirstName(e)}
          />
        </View>
        <View style={{ width: "49%" }}>
          <Text style={[styles.inputLabel]} variant="titleLarge">
            Last Name *
          </Text>
          <TextInput
            style={[styles.textInput]}
            value={lastName}
            onChangeText={(e) => setLastName(e)}
          />
        </View>
      </View>

      {/* email */}
      <View>
        <Text style={[styles.inputLabel]} variant="titleLarge">
          Email *
        </Text>
        <TextInput
          style={[styles.textInput]}
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
        />
      </View>

      {/* phone number */}
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "49%" }}>
          <Text style={[styles.inputLabel]} variant="titleLarge">
            Phone Number *
          </Text>
          <TextInput
            style={[styles.textInput]}
            value={phoneNumber}
            onChangeText={(e) => setPhoneNumber(e)}
            keyboardType="number-pad"
          />
        </View>

        <View style={{ width: "49%" }}>
          <Text style={styles.inputLabel} variant="titleLarge">
            Whatsapp Number
          </Text>
          <TextInput
            style={styles.textInput}
            value={whatsappNumber}
            onChangeText={(e) => setWhatsappNumber(e)}
            keyboardType="number-pad"
          />
        </View>
      </View>

      {/* passwrd */}
      <View>
        <Text style={[styles.inputLabel]} variant="titleLarge">
          Password *
        </Text>

        <View style={[styles.passwordContainer, { borderColor: "#e7e7e9" }]}>
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

      {/* confirm passwrd */}

      <View style={{ marginTop: 10 }}>
        <Text style={[styles.inputLabel]} variant="titleLarge">
          Confirm Password *
        </Text>

        <View style={[styles.passwordContainer, { borderColor: "#e7e7e9" }]}>
          <TextInput
            style={{ width: "92%" }}
            secureTextEntry={confirmpassVisible}
            value={confirmPassword}
            onChangeText={(e) => setConfirmPassword(e)}
          />
          <Icon.Button
            name={confirmpassVisible ? "eye" : "eye-slash"}
            backgroundColor="transparent"
            underlayColor="transparent"
            color={confirmpassVisible ? "#7367f0" : "gray"}
            size={15}
            onPress={() => setConfirmpassVisible(!confirmpassVisible)}
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
          I accept all terms & conditions
        </Text>
      </View>

      <ActionButton
        label={"Signup"}
        handlefunction={handleSignup}
        disabled={isButtonDisabled}
      />

      {/* navigate */}
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
          Already have an account?{" "}
          <Text
            style={[
              styles.welcomeBottomText,
              { color: "#7367f0", fontSize: 15 },
            ]}
            variant="titleMedium"
            onPress={navigateToSignin}
          >
            Sign in instead
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
  inputLabel: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
    marginBottom: 5,
  },

  welcomeBottomText: {
    fontFamily: "Raleway_400Regular",
    color: "gray",
    textAlign: "center",
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
