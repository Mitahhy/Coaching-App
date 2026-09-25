import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../../../constant/Colors";
import Button from "../../../components/Shared/Button";


export default function AddCourse() {
  const { loading, setLoading } = useState(false);
  const onGenerateTopic = () => {};
  return (
    <View style={{ padding: 25, backgroundColor: Colors.WHITE, flex: 1 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Create New Course
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 30 }}>
        What you want to learn today?
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        What course you want to create (ex.Learn JavaScript, Digital
        Marketing,10Th Science Chapters, etc ...)
      </Text>

      <TextInput
        placeholder="(Ex. Learn Python, Learn 12th Chemistry)"
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
      />

      <Button
        text={"Generate Topic"}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 15,
  },
});
