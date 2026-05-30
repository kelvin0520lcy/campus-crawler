import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../../context/Auth";

export default function SignInScreen() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Missing fields", "Please enter your email and password.");
            return;
        }

        try {
            setSubmitting(true);
            await signIn(email.trim(), password);
            router.replace("/");
        } catch (error) {
            Alert.alert("Sign in failed", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}> Campus Crawler </Text>

            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue to Campus Crawlers</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#8a8a8a"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#8a8a8a"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Pressable
                style={[styles.button, submitting && styles.buttonDisabled]}
                onPress={handleSignIn}
                disabled={submitting}
            >
                <Text style={styles.buttonText}>
                    {submitting ? "Signing in..." : "Sign In"}
                </Text>
            </Pressable>

            <Text style={styles.footerText}>
                Don't have an account?{" "}
                <Link href="/sign-up" style={styles.link}>
                    Sign up
                </Link>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
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