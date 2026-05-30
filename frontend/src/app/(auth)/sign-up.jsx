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

export default function SignUpScreen() {
    const { signUp } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Missing fields", "Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password mismatch", "The passwords do not match.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Weak password", "Password should be at least 6 characters.");
            return;
        }

        try {
            setSubmitting(true);
            await signUp(email.trim(), password);
            router.replace("/");
        } catch (error) {
            Alert.alert("Sign up failed", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}> Campus Crawler </Text>

            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Join Campus Crawlers</Text>

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

            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#8a8a8a"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Pressable
                style={[styles.button, submitting && styles.buttonDisabled]}
                onPress={handleSignUp}
                disabled={submitting}
            >
                <Text style={styles.buttonText}>
                    {submitting ? "Creating account..." : "Sign Up"}
                </Text>
            </Pressable>

            <Text style={styles.footerText}>
                Already have an account?{" "}
                <Link href="/sign-in" style={styles.link}>
                    Sign in
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
    name: {
        position: "absolute",
        top: 30,
        left: 20,
        color: "white",
        fontSize: 26,
        fontWeight: "700",
    },
    title: {
        color: "white",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 8,
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