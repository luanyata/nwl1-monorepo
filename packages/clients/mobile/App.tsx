import { StatusBar } from 'expo-status-bar'
import React from 'react';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'
import Home from './src/pages/Home';
import { AppLoading } from 'expo';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Home />
    </>
  );
}
