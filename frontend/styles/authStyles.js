import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#07111f",
        padding: 24,
        justifyContent: "center",
    },
    title: {
        color: "white",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 8,
    },
    name: {
        position: "absolute",
        top: 30,
        left: 20,
        color: "white",
        fontSize: 26,
        fontWeight: "700",
    },
    subtitle: {
        color: "#9ca3af",
        fontSize: 16,
        marginBottom: 32,
    },
    input: {
        backgroundColor: "#111827",
        color: "white",
        borderWidth: 1,
        borderColor: "#263244",
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#22c55e",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#07111f",
        fontSize: 16,
        fontWeight: "700",
    },
    footerText: {
        color: "#9ca3af",
        textAlign: "center",
        marginTop: 24,
    },
    link: {
        color: "#38bdf8",
        fontWeight: "700",
    },
});