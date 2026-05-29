import { router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../../../context/Auth";

export default function AccountScreen() {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.userSection}>
                <Text style={styles.title}>Campus Crawlers</Text>
                <Text style={styles.label}>You are signed in as:</Text>
                <Text style={styles.email}>{user?.email}</Text>

                <Pressable style={styles.logOutButton} onPress={logout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </Pressable>

            </View>
            <Pressable style={styles.button} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Back to Home Page</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8fafc",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 16,
    },
    userSection: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 10,
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        color: "#64748b",
    },
    email: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 4,
        marginBottom: 12,
    },
    logOutButton: {
        backgroundColor: "#ef4444",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    button: {
        backgroundColor: "#1164d8",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 8,
    },
    map: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginBottom: 16,
    },
    message: {
        color: "#475569",
        marginTop: 4,
    },
    error: {
        color: "#dc2626",
        marginTop: 4,
    },
    locationList: {
        marginTop: 4,
    },
    locationItem: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
});