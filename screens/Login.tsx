import { useEffect, useState } from "react";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, useThemeColor, View } from "../components/Themed";
import Images from "../constants/Images";
import { RootStackScreenProps } from "../types";
import Display from "../utils/Display";

import TextInputs from "../components/TextInputs";
import TextInputPassword from "../components/TextInputPassword";
import { Platform, StyleSheet } from "react-native";
import ButtonCompo from "../components/ButtonCompo";
import firebase from "../database/firebase";

export default function Login({ navigation }: RootStackScreenProps<"Login">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((token) => {
      setIsLoading(false);
      if (token) {
        navigation.replace("Root");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          userCredentials.user?.getIdToken();
          console.log("Login success!!");
        });

      setErrorMsg("");
    } catch (error: any) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorMsg("รหัสผ่านหรืออีเมลไม่ถูกต้อง");
      }
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.Bgcontainer}>
        <Image source={Images.LogoApp} style={{ width: 112, height: 112 }} />
      </View>

      <TextInputs
        namePlaceholder="อีเมล"
        iconName="user"
        onChangeProps={setEmail}
      />

      <TextInputPassword
        namePlaceholder="รหัสผ่าน"
        onChangePassword={setPassword}
      />
      <Text style={styles.errorMagText}>{errorMsg}</Text>
      <View style={styles.signupContainer}>
        <Text style={styles.accountText}>ไม่มีบัญชีใช่หรือไม่?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("Register")}
        >
          สมัครสมาชิก
        </Text>
      </View>

      <ButtonCompo
        name="เข้าสู่ระบบ"
        onPress={handleLogin}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Bgcontainer: {
    alignItems: "center",
    marginTop: 50,
  },
  signupContainer: {
    marginHorizontal: 30,
    paddingVertical: 20,
    flexDirection: "row",
  },
  accountText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
  },
  signupText: {
    fontSize: 12,

    color: "#229954",
    fontFamily: "sf-font-bold",
    marginLeft: 5,
  },

  title: {
    fontSize: 20,
    fontFamily: "sf-font-bold",
    textAlign: "center",
    marginVertical: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  errorMagText: {
    fontSize: 10,
    color: "#ff0050",
    marginHorizontal: Display.setWidth(10),
  },
});
