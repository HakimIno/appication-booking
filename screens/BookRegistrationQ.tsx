import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import TextInputs from "../components/TextInputs";
import ButtonCompo from "../components/ButtonCompo";
import firebase from "../database/firebase";
import moment from "moment";
import { useThemeColor } from "../components/Themed";

const BookRegistrationQ = () => {
  const [userName, setUserName] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [registration, setRegistration] = useState<any>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("bookregistrationq")
      .doc("queueID")
      .onSnapshot((snapshot: any) => {
        setRegistration(snapshot.data());
      });
  }, []);

  const book = async () => {
    try {
      const userId = firebase.auth().currentUser?.uid;
      const timestamp = moment().subtract(10, "days").calendar();

      const queue = registration.queue + 1;
      if (userName === "" && idNumber === "" && phoneNumber === "") {
        alert("กรอกข้อมูลให้ครบ");
        return;
      }

      await firebase
        .firestore()
        .collection("bookregistrationq")
        .doc(userId)
        .set({ userName, idNumber, phoneNumber, timestamp, queueUser: queue });
      await firebase
        .firestore()
        .collection("bookregistrationq")
        .doc("queueID")
        .update({ queue: queue });

      alert(
        `จองคิวจดทะเบียนสำเร็จ เลขที่คิว${queue} หมายเหตุ: หากยังไม่ได้รับแจ้งเติอนสามารถติดต่อเจ้าหน้าที่เพื่อสอบถามข้อมูล`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const colorBg1 = useThemeColor(
    { light: "#f9fafb", dark: "#000" },
    "background"
  );
  return (
    <View style={[styles.container, { backgroundColor: colorBg1 }]}>
      <View style={{ marginVertical: 20 }}>
        <TextInputs
          namePlaceholder="ชื่อ-นามสกุล"
          iconName="user"
          onChangeProps={setUserName}
        />
        <TextInputs
          namePlaceholder="เลขประจำตัวประชาชน"
          iconName="credit-card"
          onChangeProps={setIdNumber}
        />
        <TextInputs
          namePlaceholder="เบอร์โทรศัพทร์"
          iconName="phone"
          onChangeProps={setPhoneNumber}
        />
        <ButtonCompo name="จองคิวบริการ" onPress={book} />
      </View>
    </View>
  );
};

export default BookRegistrationQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
