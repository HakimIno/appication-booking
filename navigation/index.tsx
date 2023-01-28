/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Register from "../screens/Register";
import Login from "../screens/Login";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import BottomNavigator from "./BottomNavigator";
import BookRegistrationQ from "../screens/BookRegistrationQ";
import BookAppointmentQ from "../screens/BookAppointmentQ";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Oops!" }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          title: "ลงทะเบียน",
          headerTitleStyle: {
            fontSize: 16,
            fontFamily: "sf-font-bold",
          },
        }}
      />
      <Stack.Screen
        name="Root"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookRegistrationQ"
        component={BookRegistrationQ}
        options={{
          headerShown: true,
          title: "จองคิวจดทะเบียน",
          headerTitleStyle: {
            fontSize: 16,
            fontFamily: "sf-font-bold",
          },
        }}
      />
      <Stack.Screen
        name="BookAppointmentQ"
        component={BookAppointmentQ}
        options={{
          headerShown: true,
          title: "จองคิวรังวัด",
          headerTitleStyle: {
            fontSize: 16,
            fontFamily: "sf-font-bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
