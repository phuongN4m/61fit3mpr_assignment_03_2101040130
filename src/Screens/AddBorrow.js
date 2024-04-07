import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddDebt({ navigation }) {
  const [Amt, onChangeAmt] = React.useState(0);
  const [name, onChangeName] = React.useState("");
  const [details, onChangeDetails] = React.useState(null);
  const [contact, setContact] = useState("");
  const [contacts, setContacts] = useState([{}]);

  const handleSubmit = async () => {
    let data = await AsyncStorage.getItem("@moneyBorrowed");
    if (data == null) {
      await AsyncStorage.setItem("@moneyBorrowed", JSON.stringify([]));
    }
    data = JSON.parse(await AsyncStorage.getItem("@moneyBorrowed"));
    data.push({
      name: name.toLowerCase(),
      amount: Number(Amt),
      description: details,
    });
    await AsyncStorage.setItem("@moneyBorrowed", JSON.stringify(data));
    navigation.goBack();
  };

  useEffect(() => {
    const c = contacts.filter((e) => e.name === name.toLowerCase());
    if (c.length > 0) {
      setContact(c[0].phone);
    } else setContact("");
  }, [name]);

  const inputAmt = (
    <TextInput
      style={styles.input}
      onChangeText={onChangeAmt}
      value={Amt === 0 ? '' : Amt.toString()}
      placeholder="0.00"
      keyboardType="decimal-pad"
      placeholderTextColor="#fc8991"
    />
  );

  const inputName = (
    <TextInput
      style={styles.input}
      onChangeText={onChangeName}
      value={name}
      placeholder="Lender's Name"
      placeholderTextColor="#d3d3d9"
      keyboardType="default"
    />
  );

  const inputDetails = (
    <TextInput
      style={styles.input}
      onChangeText={onChangeDetails}
      value={details}
      placeholder="Enter Details Here..."
      placeholderTextColor="#d3d3d9"
      keyboardType="default"
    />
  );

  const inputContacts = (
    <TextInput
      style={styles.input}
      onChangeText={(text) => setContact(text)}
      value={contact}
      placeholder="Enter Contact Here..."
      placeholderTextColor="#d3d3d9"
      keyboardType="default"
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/white_left_arrow.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tasksWrapper}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Borrowed</Text>
          <Text style={styles.howMuch}>How much?</Text>
          <View style={styles.inputDebt}>
            <Text style={styles.dollarSign}>$</Text>
            <View>{inputAmt}</View>
          </View>
        </View>
        <View style={styles.WhiteCont}>
          <View>
            <View style={styles.inputPlace}>{inputName}</View>
            <View style={styles.inputPlace}>{inputContacts}</View>
            <View style={styles.inputPlace}>{inputDetails}</View>
          </View>
          <View style={styles.submit}>
            <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fd3c4a",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  WhiteCont: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    bottom: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: "60%",
  },
  tasksWrapper: {
    flex: 1,
    height: "70%",
  },
  sectionTitle: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23,
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  inputDebt: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    color: "#ffffff",
  },
  addButton: {
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 10,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7f3dff",
    color: "#ffffff",
  },
  input: {
    fontSize: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#d3d3d9",
    color: "#000000",
  },
  howMuch: {
    color: "#e9e7e6",
    paddingLeft: 10,
    fontSize: 25,
  },
  inputPlace: {
    color: "#8f9ca2",
    fontSize: 22,
    paddingBottom: 3,
    paddingTop: 20,
  },
  submit: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    width: 25,
    height: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 35,
  },
  dollarSign: {
    fontSize: 50,
    color: "#ffffff",
  },
  submitText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
});
