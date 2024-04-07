import React, { useState } from "react";
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

export default function AddIncome({ navigation }) {
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState(null);

  const handleSubmit = async () => {
    let data = await AsyncStorage.getItem("@incomes");
    if (data === null) {
      await AsyncStorage.setItem("@incomes", JSON.stringify([]));
    }
    data = JSON.parse(await AsyncStorage.getItem("@incomes"));
    data.push({
      title: title.toLowerCase(),
      amount: Number(amount),
      description: details,
    });
    await AsyncStorage.setItem("@incomes", JSON.stringify(data));
    navigation.goBack();
  };

  const renderAmountInput = (
    <TextInput
      style={{ ...styles.input, fontSize: 50, color: "#ffffff" }}
      onChangeText={setAmount}
      value={amount === 0 ? '' : amount.toString()}
      placeholder="0.00"
      keyboardType="decimal-pad"
      placeholderTextColor={"#87d5b9"}
    />
  );

  const renderTitleInput = (
    <TextInput
      style={{
        ...styles.input,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: "#d3d3d9",
      }}
      onChangeText={setTitle}
      value={title}
      placeholder="Title"
      placeholderTextColor="#d3d3d9"
      keyboardType="default"
    />
  );

  const renderDetailsInput = (
    <TextInput
      style={{
        ...styles.input,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: "#d3d3d9",
      }}
      onChangeText={setDetails}
      value={details}
      placeholder="Enter Details Here..."
      placeholderTextColor="#d3d3d9"
      keyboardType="default"
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 25, height: 25 }}
        >
          <Image
            source={require(`../assets/white_left_arrow.png`)}
            style={{ width: 25, height: 25, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tasksWrapper}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Income</Text>
          </View>
          <View>
            <View>
              <Text style={styles.howMuch}>Amount</Text>
            </View>
            <View style={styles.inputDebt}>
              <Text style={{ fontSize: 50, color: "#ffffff" }}>$</Text>
              <View>{renderAmountInput}</View>
            </View>
          </View>
        </View>
        <View style={styles.WhiteCont}>
          <View>
            <View style={styles.inputPlace}>{renderTitleInput}</View>
            <View style={styles.inputPlace}>{renderDetailsInput}</View>
          </View>
          <View style={styles.submit}>
            <View style={styles.addButton}>
              <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    height: 70,
    backgroundColor: "#00a86b",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 20,
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
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    padding: 5,
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
});
