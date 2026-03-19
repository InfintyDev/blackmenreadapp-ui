import { Stack, Navigator } from 'expo-router';

export default function RootLayout() {
  //Navigator.Screen = "home"

  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="other" options={{ title: 'About' }} />
    </Stack>

  );



}