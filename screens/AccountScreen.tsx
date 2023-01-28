import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, useThemeColor, View } from "../components/Themed";
import Display from "../utils/Display";
import firebase from "../database/firebase";
import { RootStackScreenProps } from "../types";

const list = [
  {
    name: "ข้อความแจ้งเตือนเปิด/ปิดแจ้งแตือน",
    iconLeft: "ios-notifications-outline",
    iconRight: "Vice Chairman",
  },
  {
    name: "เปลี่ยนรหัสผ่าน",
    iconLeft: "settings-outline",
    iconRight: "Vice Chairman",
  },
];

export default function AccountScreen({
  navigation,
}: RootStackScreenProps<"TabTree">) {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace("Login");
      });
  };

  const color = useThemeColor({ light: "#fff", dark: "#000" }, "background");
  const icon = useThemeColor({ light: "#374151", dark: "#d1d5db" }, 'text');
  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider containerStyle={{ backgroundColor: color}}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: Display.setWidth(2),
              backgroundColor: color
            }}
          >
            <View style={{ flexDirection: "row" , backgroundColor: color}}>
              <Ionicons name={l.iconLeft} size={22} color={icon} />
              <Text style={{ marginHorizontal: Display.setWidth(3) }}>
                {l.name}
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={22}
              color={icon}
            />
          </View>
        </ListItem>
      ))}
      <TouchableOpacity onPress={handleLogout} style={{ justifyContent:'center', alignItems: 'center', marginVertical: Display.setHeight(5)}}>
        <Text style={{ color: "red",fontFamily: "sf-font-bold" }}>ออกจากระบบ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
