// mobile/app/(app)/index.jsx

import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../../../context/Auth";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>

      <View style={styles.overlay}>
        <Text style={styles.title}>Campus Crawlers</Text>
        <Text style={styles.text}>You are signed in as:</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  map: {
    height: 350,
    width: "100%",
  },
  content: {
    padding: 24,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    color: "#9ca3af",
    fontSize: 16,
  },
  email: {
    color: "white",
    fontSize: 18,
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: "rgba(7, 17, 31, 0.9)",
    padding: 20,
    borderRadius: 20,
  },
});