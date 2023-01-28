import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import ButtonCompo from "../components/ButtonCompo";
import TextInputPassword from "../components/TextInputPassword";
import TextInputs from "../components/TextInputs";

import { Text, View } from "../components/Themed";
import Display from "../utils/Display";
import firebase from "../database/firebase";
import { RootStackScreenProps } from "../types";

export default function Register({
  navigation,
}: RootStackScreenProps<"Register">) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMsg("รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (
      username === "" &&
      phoneNumber === "" &&
      username === "" &&
      confirmPassword === ""
    ) {
      setErrorMsg("กรอกข้อมูลให้ครบ");
      return;
    }

    try {
      // create user with email and password
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(username, password);
      // get the user's ID
      const userId = response.user?.uid;
      // add phone number to the user's profile
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set({ phoneNumber }, { merge: true });

      // update the user's display name
      await firebase
        .auth()
        .currentUser?.updateProfile({ displayName: username });

      await navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.componentContainer}>
        <TextInputs
          namePlaceholder="ชื่อผู้ใช้"
          iconName="user"
          onChangeProps={setUsername}
        />

        <TextInputPassword
          namePlaceholder="รหัสผ่าน"
          onChangePassword={setPassword}
        />
        <TextInputPassword
          namePlaceholder="ยืนยันรหัสผ่าน"
          onChangePassword={setConfirmPassword}
        />
        <TextInputs
          namePlaceholder="เบอร์โทรศัพท์"
          iconName="phone-call"
          onChangeProps={setPhoneNumber}
        />
        <Text style={styles.errorMagText}>{errorMsg}</Text>
      </View>
      <ButtonCompo name="ลงทะเบียน" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContainer: {
    marginHorizontal: Display.setWidth(0),
    marginTop: Display.setHeight(5),
  },
  title: {
    fontSize: 20,
    fontFamily: "sf-font-bold",
    textAlign: "center",
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  errorMagText: {
    fontSize: 10,
    color: "#ff0050",
    marginHorizontal: Display.setWidth(10),
  },
});
