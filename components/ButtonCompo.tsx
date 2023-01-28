import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { useState, useRef } from "react";
import Images from "../constants/Images";
import Display from "../utils/Display";

const ButtonCompo: React.FC<{
  name: string;
  onPress?: () => void;
  isLoading?: boolean
}> = ({ name, onPress,isLoading }) => {
  const animation = useRef(null);
  
  return (
    <TouchableOpacity
      style={styles.signinButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <LottieView
          source={Images.LOADING}
          autoPlay
          ref={animation}
          style={{
            width: 50,
            height: 50,
          }}
        />
      ) : (
        <Text style={styles.signinButtonText}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCompo;

const styles = StyleSheet.create({
  signinButton: {
    backgroundColor: "#229954",
    borderRadius: 25,
    marginHorizontal: 30,
    height: Display.setHeight(5),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 16,
    lineHeight: 18 * 1.4,
    color: "#fff",
    fontFamily: "sf-font-bold",
    textAlign: "center",
  },
});
