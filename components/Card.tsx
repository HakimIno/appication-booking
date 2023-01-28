import React from "react";
import { StyleSheet, Image } from "react-native";
import Display from "../utils/Display";
import { Text, useThemeColor, View } from "../components/Themed";

const Card: React.FC<{
  images: any;
  title: string;
  username: string;
  time: string;
  queue: number;
  queueId: number;
}> = ({ images, title, username, time, queue, queueId }) => {
  const color = useThemeColor({ light: "#000", dark: "#fff" }, "background");
  const colorBg = useThemeColor(
    { light: "#fff", dark: "#18181b" },
    "background"
  );
  return (
    <View
      style={[styles.content, { shadowColor: color, backgroundColor: colorBg }]}
    >
      <Image
        source={images}
        style={{
          width: 62,
          height: 62,
          marginLeft: Display.setWidth(5),
          resizeMode: "stretch",
        }}
      />
      <View style={{ width: "60%", marginLeft: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colorBg,
          }}
        >
          <Text
            numberOfLines={1}
            style={[styles.subtitle, { fontFamily: "sf-font-bold" }]}
          >
            {title}
          </Text>
          <Text style={{ fontFamily: "sf-font-medium", fontSize: 10 }}>
            คิว <Text>{queue}</Text>
          </Text>
        </View>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colorBg,
          }}
        >
          <Text style={[styles.subtitle, { width: "50%" }]} numberOfLines={1}>
            {username}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 11 }}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  content: {
    marginVertical: 10,
    alignItems: "center",
    height: Display.setHeight(10),
    width: Display.setWidth(80),
    flexDirection: "row",
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "100%",
  },
  subtitle: {
    fontSize: 12,
  },
});
