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

export default function EditTransactions({ navigation, route }) {
  const { transaction, type } = route.params;
  const [Amt, setAmt] = useState(transaction.amount.toString());
  const [title, setTitle] = useState(transaction.title || transaction.name || "");
  const [details, setDetails] = useState(transaction.description || "");

  const handleEdit = async () => {
    let data;
    switch (type) {
      case "Income":
        data = JSON.parse(await AsyncStorage.getItem("@incomes"));
        break;
      case "Expense":
        data = JSON.parse(await AsyncStorage.getItem("@expenses"));
        break;
      case "Lent":
        data = JSON.parse(await AsyncStorage.getItem("@moneyLent"));
        break;
      case "Borrowed":
        data = JSON.parse(await AsyncStorage.getItem("@moneyBorrowed"));
        break;
      default:
        break;
    }

    if (data) {
      data = data.map((obj) => {
        if (
          obj.title === transaction.title &&
          obj.amount === transaction.amount &&
          obj.description === transaction.description
        ) {
          obj.title = title;
          obj.amount = Number(Amt);
          obj.description = details;
        }
        return obj;
      });

      switch (type) {
        case "Income":
          await AsyncStorage.setItem("@incomes", JSON.stringify(data));
          navigation.navigate("Income");
          break;
        case "Expense":
          await AsyncStorage.setItem("@expenses", JSON.stringify(data));
          navigation.navigate("ExpensesScreen");
          break;
        case "Lent":
          await AsyncStorage.setItem("@moneyLent", JSON.stringify(data));
          navigation.navigate("Debt");
          break;
        case "Borrowed":
          await AsyncStorage.setItem("@moneyBorrowed", JSON.stringify(data));
          navigation.navigate("BorrowScreen");
          break;
        default:
          break;
      }
    }
  };

  const inputAmt = (
    <TextInput
      style={{ ...styles.input, fontSize: 50, color: "#ffffff" }}
      onChangeText={setAmt}
      value={Amt}
      placeholder="0.00"
      keyboardType="default"
      placeholderTextColor="#fc8991"
    />
  );

  const inputTitle = (
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

  const inputDetails = (
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

  let color;
  switch (type) {
    case "Income":
      color = "#00A86B";
      break;
    case "Lent":
    case "Borrowed":
      color = "#0077FF";
      break;
    case "Expense":
      color = "#FD3C4A";
      break;
    default:
      color = "#00A86B";
      break;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 25, height: 25 }}>
          <Image source={require(`../assets/white_left_arrow.png`)} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.tasksWrapper}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Edit {type}</Text>
          </View>
          <View>
            <View>
              <Text style={styles.howMuch}>Amount</Text>
            </View>
            <View style={styles.inputDebt}>
              <Text style={{ fontSize: 50, color: "#ffffff" }}>Rs.</Text>
              <View>{inputAmt}</View>
            </View>
          </View>
        </View>
        <View style={styles.WhiteCont}>
          <View>
            <View style={styles.inputPlace}>{inputTitle}</View>
            <View style={styles.inputPlace}>{inputDetails}</View>
          </View>
          <View style={styles.submit}>
            <View style={styles.addButton}>
              <TouchableOpacity onPress={handleEdit} style={styles.addButton}>
                <Text style={{ fontWeight: "bold", color: "#ffffff" }}>Edit</Text>
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
    top: 15,
    left: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    height: 70,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 10,
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
