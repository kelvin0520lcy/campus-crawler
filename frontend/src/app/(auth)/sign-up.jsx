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
import { authStyles as styles } from "../../../styles/authStyles"

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