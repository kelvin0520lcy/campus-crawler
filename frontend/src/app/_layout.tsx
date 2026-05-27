import { Stack } from "expo-router";
import { AuthContextProvider } from "../../context/Auth"

export default function RootLayout() {

  return (
    <AuthContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </AuthContextProvider>
  );
}