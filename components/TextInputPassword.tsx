import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Text, useThemeColor, View } from "../components/Themed";
import Display from "../utils/Display";


const TextInputPassword: React.FC<{
  namePlaceholder: string;
  onChangePassword: (text: any) => void;
}> = ({ namePlaceholder, onChangePassword }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  
  const color = useThemeColor({ light: "#9ca3af", dark: "#d1d5db" }, 'text');
  return (
    <View style={[styles.inputContainer , {borderColor: color}]}>
      <View style={styles.inputSubContainer}>
        <Feather
          name="lock"
          size={18}
          color={color}
          style={{ marginRight: 10 }}
        />
        <TextInput
          secureTextEntry={isPasswordShow ? false : true}
          placeholder={namePlaceholder}
          placeholderTextColor={color}
          selectionColor="#ff0050"
          style={[styles.inputText, { color: color}]}
          onChangeText={(text) => onChangePassword(text)}
        />
        <Feather
          name={isPasswordShow ? "eye" : "eye-off"}
          size={18}
          color={color}
          style={{ marginRight: 10 }}
          onPress={() => setIsPasswordShow(!isPasswordShow)}
        />
      </View>
      
    </View>
  );
};

export default TextInputPassword;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 30,
    borderRadius: 20,
    borderWidth: 0.2,
    justifyContent: "center",
    marginVertical: 10,
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin:2,
    borderRadius: 20,
  },
  inputText: {
    fontSize: 14,
    textAlignVertical: "center",
    fontFamily: 'sf-font-regular',
    height: Display.setHeight(5),
    flex: 1,
    color: "#f3f4f6",
  },
});
