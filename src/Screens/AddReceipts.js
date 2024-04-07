import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function AddReceipts({ navigation }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    // Handle submission logic here
    console.log("Title:", title);
    console.log("Details:", details);
    console.log("Selected Image:", selectedImage);

    // Example: Storing data in AsyncStorage
    try {
      await AsyncStorage.setItem("title", title);
      await AsyncStorage.setItem("details", details);
      await AsyncStorage.removeItem("imageUri", selectedImage);
      alert("Receipt submitted successfully!");
    } catch (error) {
      console.error("Error storing data:", error);
    }

    // Navigate back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require(`../assets/BG.png`)} style={styles.image} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require(`../assets/Vector.png`)} />
      </TouchableOpacity>
      <Text style={styles.header}>Receipts</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTitle(text)}
          value={title}
          placeholder="Title"
          placeholderTextColor="#d3d3d9"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDetails(text)}
          value={details}
          placeholder="Enter Details Here..."
          placeholderTextColor="#d3d3d9"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    width: "100%",
    height: 300,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 999,
  },
  header: {
    position: "absolute",
    top: 16,
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    bottom: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: "60%",
    alignItems: "center",
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d3d3d9",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: "#7F3DFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    color: "#FCFCFC",
  },
});
