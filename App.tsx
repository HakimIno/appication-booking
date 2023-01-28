import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as Font from "expo-font";

const useCustomFont = async () => {
  await Font.loadAsync({
    "sf-font-bold": require("./assets/fonts/NotoSansThai-Bold.ttf"),
    "sf-font-medium": require("./assets/fonts/NotoSansThai-Medium.ttf"),
    "sf-font-regular": require("./assets/fonts/NotoSansThai-Regular.ttf"),
  });
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    useCustomFont();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
