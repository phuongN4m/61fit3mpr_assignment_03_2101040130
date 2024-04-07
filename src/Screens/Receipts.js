import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  StatusBar,
  ScrollAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useContext, useState } from "react";
import DebtorCard from "../components/DebtorCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
export default function Receipts({ navigation }) {
  const [allBorrowed, setAllBorrowed] = useState([{}]);
  const [borrow, setBorrow] = useState(0);
  const isFocused = useIsFocused();
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
  };
  let arr = [{}];
  useEffect(() => {
    const getDebts = async () => {
      // const data = await firestore().collection("credits").doc(user.uid).get();
      const data = JSON.parse(await AsyncStorage.getItem("@moneyBorrowed"));
      if (data != null) {
        arr = data;
        const map = new Map();
        let tot = 0;
        arr.map((obj) => {
          tot += obj.amount;
          map.set(obj.name, 0);
        });
        arr.map((obj) => {
          map.set(obj.name, obj.amount + map.get(obj.name));
        });
        let reduced = [];
        for (let [key, value] of map) {
          reduced.push({ name: key, amount: value });
        }
        setBorrow(tot);
        setAllBorrowed(reduced);
      }
    };
    getDebts();

    // console.log(reduced, reducedArr);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Image source={require(`../assets/BG.png`)} style={styles.image}></Image>
      <TouchableOpacity
        style={{ position: "absolute", left: 16, top: 16, zIndex: 999 }}
        onPress={() => navigation.goBack()}
      >
        <Image source={require(`../assets/Vector.png`)}></Image>
        {/* <Text style={{ color: "#fff" }}>Back</Text> */}
      </TouchableOpacity>
      <Text
        style={{
          position: "absolute",
          top: 16,
          fontSize: 20,
          fontWeight: "500",
          width: "100%",
          textAlign: "center",
        }}
      >
        Receipts
      </Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("AddReceipts")}>
        <Text style={styles.loginText}>+ Add New Receipt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    width: "100%",
    height: 300,
  },

  container: {
    flex: 1,
    height: 70,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems:"center",
  },
  loginBtn: {
    position: "absolute",
    width: 320,
    height: 56,
    // left: 20,
    top: "85%",
    backgroundColor: "#7F3DFF",
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    gap: 10,
  },
  loginText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    color: "#FCFCFC",
  },
});
