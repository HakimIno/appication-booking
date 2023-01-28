import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Text, useThemeColor, View } from "../components/Themed";
import Display from "../utils/Display";

const TextInputs: React.FC<{
  namePlaceholder: string;
  iconName: string;
  onChangeProps: (text: any) => void;
}> = ({ namePlaceholder, iconName, onChangeProps , }) => {

  const color = useThemeColor({ light: "#9ca3af", dark: "#d1d5db" }, 'text');
  return (
    <View style={[styles.inputContainer , {borderColor: color}]}>
      <View style={styles.inputSubContainer}>
        <Feather
          name={iconName}
          size={18}
          color={color}
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder={namePlaceholder}
          placeholderTextColor={color}
          selectionColor="#ff0050"
          style={[styles.inputText, { color: color}]}
          onChangeText={text => onChangeProps(text)}
        />
        
      </View>
    </View>
  );
};

export default TextInputs;

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
    lineHeight: 14 * 1.4,
    height: Display.setHeight(5),
    fontFamily: 'sf-font-regular',
    flex: 1
  },
});
