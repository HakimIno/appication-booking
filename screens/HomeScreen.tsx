import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, useThemeColor, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import firebase from "../database/firebase";
import Layout from "../constants/Layout";
import Display from "../utils/Display";
import Images from "../constants/Images";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"HomeScreen">) {
  const titleBox = [
    {
      title: "จองคิวจดทะเบียน",
      image: Images.images2,
      queue: "BookRegistrationQ",
    },
    { title: "จองคิวรังวัด", image: Images.images1, queue: "BookAppointmentQ" },
  ];
  const colorBg = useThemeColor(
    { light: "#f3f4f6", dark: "#18181b" },
    "background"
  );
  const colorBg1 = useThemeColor(
    { light: "#f9fafb", dark: "#27272a" },
    "background"
  );
  const color1 = useThemeColor(
    { light: "#000", dark: "#ffffff" },
    "background"
  );

  return (
    <View style={[styles.container, { backgroundColor: colorBg }]}>
      <View style={[styles.containerBox, { backgroundColor: colorBg }]}>
        <Text style={{ marginHorizontal: 20, fontFamily: "sf-font-bold" }}>
          วันนี้รับบริการแบบไหนฮะ?
        </Text>
        {titleBox.map((item: any, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(`${item.queue}`)}
          >
            <View
              style={[
                styles.boxContainer,
                { shadowColor: color1, backgroundColor: colorBg1 },
              ]}
            >
              <Image source={item.image} style={{ width: 82, height: 82 }} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerBox: {
    marginVertical: Display.setHeight(10),
  },
  passContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  boxContainer: {
    marginHorizontal: Display.setWidth(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: Display.setWidth(5),
    width: Display.setWidth(80),
    height: Display.setHeight(20),

    elevation: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: "sf-font-bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
