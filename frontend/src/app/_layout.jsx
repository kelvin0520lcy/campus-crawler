import { Stack } from "expo-router";
import { AuthContextProvider } from "../../context/Auth"
import SafeScreen from "../../components/SafeScreen"

export default function RootLayout() {

  return (
    <AuthContextProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
        </Stack>
      </SafeScreen>
    </AuthContextProvider>
  );
}