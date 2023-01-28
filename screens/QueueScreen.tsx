import { useEffect, useRef, useState } from "react";
import { StyleSheet, Image, Platform, Button } from "react-native";
import Card from "../components/Card";

import { Text, useThemeColor, View } from "../components/Themed";
import Images from "../constants/Images";
import firebase from "../database/firebase";
import Display from "../utils/Display";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Expo from "expo";
import { AppState } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "EQLAND",
    body: "ใกล้ถึงคิวบริการจดทะเบียนของท่านแล้วท่าน",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function sendPushNotification1(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "EQLAND",
    body: "ใกล้ถึงคิวบริการรังวัดของท่านแล้วท่าน",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function QueueScreen() {
  const [appointments, setAppointments] = useState<any>([]);
  const [queueAppointments, setQueueAppointments] = useState<any>([]);
  const [registration, setRegistration] = useState<any>([]);
  const [queueRegistration, setQueueRegistration] = useState<any>([]);

  useEffect(() => {
    const userId = firebase.auth().currentUser?.uid;
    firebase
      .firestore()
      .collection("bookappointmentq")
      .doc(userId)
      .onSnapshot((snapshot: any) => {
        setAppointments(snapshot.data());
      });
    firebase
      .firestore()
      .collection("bookregistrationq")
      .doc(userId)
      .onSnapshot((snapshot: any) => {
        setRegistration(snapshot.data());
      });
    firebase
      .firestore()
      .collection("bookappointmentq")
      .doc("queueID")
      .onSnapshot((snapshot: any) => {
        setQueueAppointments(snapshot.data());
      });
    firebase
      .firestore()
      .collection("bookregistrationq")
      .doc("queueID")
      .onSnapshot((snapshot: any) => {
        setQueueRegistration(snapshot.data());
      });
  }, []);

  const [expoPushToken, setExpoPushToken] = useState<string | null>();

  const [notification, setNotification] = useState<any>(AppState.currentState);
  const notificationListener = useRef<any>(AppState.currentState);
  const responseListener = useRef<any>(AppState.currentState);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [expoPushToken]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (queueRegistration.queue >= 20) {
        await firebase
          .firestore()
          .collection("bookregistrationq")
          .doc("queueID")
          .update({ queue: 0 });
        return;
      }

      const newQueue1 = Number(queueRegistration.queue) + 1;
      console.log(`QR: ${newQueue1}`);

      if (newQueue1 === registration.queueUser - 1 && expoPushToken) {
        sendPushNotification(expoPushToken);
        setExpoPushToken("");
      }

      await firebase
        .firestore()
        .collection("bookregistrationq")
        .doc("queueID")
        .update({ queue: newQueue1 });
    }, 12000);

    return () => clearInterval(intervalId);
  }, [queueRegistration, expoPushToken]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (queueAppointments.queue >= 20) {
        firebase
          .firestore()
          .collection("bookappointmentq")
          .doc("queueID")
          .update({ queue: 0 });
        return;
      }

      const newQueue = Number(queueAppointments.queue) + 1;

      console.log(`QA: ${newQueue}`);

      if (newQueue === appointments.queueUser - 1 && expoPushToken) {
        sendPushNotification1(expoPushToken);
        setExpoPushToken("");
      }

      await firebase
        .firestore()
        .collection("bookappointmentq")
        .doc("queueID")
        .update({ queue: newQueue });
    }, 12000);

    return () => clearInterval(intervalId);
  }, [queueAppointments, expoPushToken]);

  const colorBg1 = useThemeColor(
    { light: "#f9fafb", dark: "#27272a" },
    "background"
  );
  return (
    <View style={[styles.container, { backgroundColor: colorBg1 }]}>
      {appointments.queueUser !== 0 ? (
        <View style={{ backgroundColor: colorBg1 }}>
          <Text style={{ marginTop: 10 }}>
            ลำดับคิวรังวัดตอนนี้ {queueAppointments.queue}
          </Text>
          <View style={{ backgroundColor: colorBg1 }}>
            {appointments && (
              <Card
                images={Images.images1}
                title="จองคิวรังวัด"
                username={appointments.userName}
                time={appointments.timestamp}
                queue={appointments.queueUser}
                queueId={queueAppointments.queue}
              />
            )}
          </View>
        </View>
      ) : (
        ""
      )}
      {registration.queueUser !== 0 ? (
        <View style={{backgroundColor: colorBg1}}>
          <Text>ลำดับคิวจดทะเบียนตอนนี้ {queueRegistration.queue}</Text>
          <View style={{ backgroundColor: colorBg1 }}>
            {registration && (
              <Card
                images={Images.images2}
                title="จองคิวจดทะเบียน"
                username={registration.userName}
                time={registration.timestamp}
                queue={registration.queueUser}
                queueId={queueRegistration.queue}
              />
            )}
          </View>
        </View>
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    marginVertical: 10,
    alignItems: "center",
    height: Display.setHeight(10),
    width: Display.setWidth(80),
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
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
