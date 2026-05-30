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
