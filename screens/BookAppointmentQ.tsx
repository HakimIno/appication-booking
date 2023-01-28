import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonCompo from "../components/ButtonCompo";
import TextInputs from "../components/TextInputs";
import firebase from "../database/firebase";
import moment from "moment";
import { useThemeColor } from "../components/Themed";

const BookAppointmentQ = () => {
  const [userName, setUserName] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [appointments, setAppointments] = useState<any>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("bookappointmentq")
      .doc("queueID")
      .onSnapshot((snapshot: any) => {
        setAppointments(snapshot.data());
      });
  }, []);

  const book = async () => {
    try {
      const userId = firebase.auth().currentUser?.uid;
      const timestamp = moment().subtract(10, "days").calendar();

      const queue = appointments.queue + 1;

      if (userName === "" && idNumber === "" && phoneNumber === "") {
        alert("กรอกข้อมูลให้ครบ");
        return;
      }

      await firebase
        .firestore()
        .collection("bookappointmentq")
        .doc(userId)
        .set({ userName, idNumber, phoneNumber, timestamp, queueUser: queue });

      await firebase
        .firestore()
        .collection("bookappointmentq")
        .doc("queueID")
        .update({ queue: queue });

      alert(`จองคิวบริการรังวัดสำเร็จ เลขที่คิว${queue} หมายเหตุ: หากยังไม่ได้รับแจ้งเติอนสามารถติดต่อเจ้าหน้าที่เพื่อสอบถามข้อมูล`);
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

export default BookAppointmentQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
