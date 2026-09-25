import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import Colors from "../../../constant/Colors";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebaseConfig";

import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "../../../context/UserDetailContext";

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateNewAccount = async () => {
    // Validation
    if (!fullName.trim() || !email.trim() || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Create Firebase account
      const resp = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = resp.user;

      console.log("User created:", user.uid);

      // Save user in Firestore
      await SaveUser(user);

      Alert.alert("Success", "Your account has been created successfully!");

      // Navigate to your next screen
      // router.replace("/(tabs)");
    } catch (e) {
      console.log("Firebase error code:", e.code);
      console.log("Firebase error message:", e.message);

      if (e.code === "auth/network-request-failed") {
        Alert.alert(
          "Network Error",
          "Unable to connect to Firebase. Check your internet connection.",
        );
      } else if (e.code === "auth/email-already-in-use") {
        Alert.alert("Error", "This email is already registered.");
      } else if (e.code === "auth/invalid-email") {
        Alert.alert("Error", "Please enter a valid email address.");
      } else if (e.code === "auth/weak-password") {
        Alert.alert("Error", "Password must contain at least 6 characters.");
      } else {
        Alert.alert("Error", e.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const SaveUser = async (user) => {
    const data = {
      name: fullName.trim(),
      email: email.trim(),
      member: false,
      uid: user.uid,
    }
    await setDoc(doc(db, "users", user.uid), data );

    setUserDetail(data)

    // Navigate to New Screen
    
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../../assets/images/logo.jpg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Create New Account</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.textInput}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.textInput}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={CreateNewAccount}
        disabled={loading}
        style={[styles.button, loading && { opacity: 0.6 }]}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={{ fontFamily: "outfit" }}>Already have an account?</Text>

        <Pressable onPress={() => router.push("/auth/signIn")}>
          <Text style={styles.loginText}>Sign In Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 100,
    flex: 1,
    padding: 25,
    backgroundColor: Colors.WHITE,
  },

  logo: {
    width: 180,
    height: 180,
  },

  title: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },

  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },

  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    marginTop: 25,
    borderRadius: 10,
  },

  buttonText: {
    fontFamily: "outfit",
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: "center",
  },

  loginContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },

  loginText: {
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
  },
});
