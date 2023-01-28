import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

import HomeScreen from "../screens/HomeScreen";

import { RootTabParamList } from "../types";
import Ionicons from "react-native-vector-icons/Ionicons";

import AccountScreen from "../screens/AccountScreen";
import QueueScreen from "../screens/QueueScreen";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomNavigator = ({}) => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#229954",
        tabBarStyle: {
          height: 55,
        },
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text style={{ color: "#fff", fontFamily: "sf-font-bold" }}>
              EQLAND
            </Text>
          ),
          title: "หน้าแรก",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#229954",
          },

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="navigate-circle-outline" size={27} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: "sf-font-bold",
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      />
      <BottomTab.Screen
        name="QueueScreen"
        component={QueueScreen}
        options={{
          title: "คิวของฉัน",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-reader-outline"
              size={27}
              color={color}
              style={{ fontWeight: "bold" }}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: "sf-font-bold",
          },
          headerTitleStyle: {
            fontFamily: "sf-font-bold",
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      />
      <BottomTab.Screen
        name="TabTree"
        component={AccountScreen}
        options={{
          title: "บัญชี",
          headerTitleStyle: {
            fontFamily: "sf-font-bold",
          },
          tabBarLabelStyle: {
            fontFamily: "sf-font-bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="logo-octocat"
              size={size}
              color={color}
              style={{ fontWeight: "bold" }}
            />
          ),
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
