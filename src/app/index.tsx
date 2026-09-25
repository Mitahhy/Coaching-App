import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { UserDetailContext } from "../../context/UserDetailContext";
import { auth, db } from "../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user);
      const result = await getDoc(doc(db, "users", user?.email));
      setUserDetail(result.data());
      router.replace("/(tabs)/home");
    }
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("../../assets/images/landing.jpg")}
        style={{
          width: "100%",
          height: 300,
          marginTop: 50,
        }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-bold",
          }}
        >
          Welcome to Coaching App
        </Text>

        <Text
          style={{
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 20,
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Transform your ideas into engaging educational content, effortlessly
          with AI
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../auth/signUp")}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
          onPress={() => router.push("../auth/signIn")}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Already have an Account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});
