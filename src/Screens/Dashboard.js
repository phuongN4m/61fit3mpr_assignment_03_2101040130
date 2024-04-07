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
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// auth()
//   .signOut()
//   .then(() => console.log("User signed out!"));
export default function Dashboard({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currUser, setCurrUser] = useState({});
  const [many, setMany] = useState([]);
  const [lent, setLent] = useState(0);
  const [allDebts, setAllDebts] = useState([]);
  const [income, setIncome] = useState(0);
  const [allIncomes, setAllIncomes] = useState([]);
  const [expense, setExpense] = useState(0);
  const [allExpenses, setAllExpenses] = useState([]);
  const [borrow, setBorrow] = useState(0);
  const [allBorrows, setAllBorrows] = useState([]);
  const isFocused = useIsFocused();
  
 
  useEffect(() => {
    const getDebts = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("@moneyLent"));
      if (data != null) {
        let arr = data;
        let tot = 0;
        arr.map((obj) => {
          tot += obj.amount;
        });
        setLent(tot);
        setAllDebts(arr);
      }
    };
    getDebts();
  }, [isFocused]);
  useEffect(() => {
    const getIncomes = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("@incomes"));
      if (data != null) {
        let arr = data;
        let tot = 0;
        arr.map((obj) => {
          tot += obj.amount;
        });
        setIncome(tot);
        setAllIncomes(arr);
      }
    };
    getIncomes();
  }, [isFocused]);
  useEffect(() => {
    const getExpenses = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("@expenses"));
      if (data != null) {
        let arr = data;
        let tot = 0;
        arr.map((obj) => {
          tot += obj.amount;
        });
        setExpense(tot);
        setAllExpenses(arr);
      }
    };
    getExpenses();
  }, [isFocused]);
  useEffect(() => {
    const getBorrowed = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("@moneyBorrowed"));
      if (data != null) {
        let arr = data;
        let tot = 0;
        arr.map((obj) => {
          tot += obj.amount;
        });
        setBorrow(tot);
        setAllBorrows(arr);
      }
    };
    getBorrowed();
  }, [isFocused]);
  return (
    <>
      <View style={styles.container}>
        {/* <View style={styles.profile}></View> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profile}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Receipts")}
          style={styles.receiptsBtn}
        >
          <Text style={{color: "white"}}>Add Receipts</Text>
        </TouchableOpacity>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            marginLeft: "auto",
            position: "absolute",
            top: 60,
            color: "#91919F",
          }}
        >
          Account Balance
        </Text>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            marginLeft: "auto",
            position: "absolute",
            fontWeight: "600",
            fontSize: 40,
            top: 90,
            color: "#161719",
          }}
        >
          ${income - expense}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Income")}
          style={styles.income}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Income
          </Text>
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            ${income}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ExpensesScreen")}
          style={styles.expenses}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Expenses
          </Text>
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            ${expense}
          </Text>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.moneyLent}
            onPress={() => navigation.navigate("Debt")}
          >
            <Text
              style={{
                color: "#7F3DFF",
                fontWeight: "500",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Money Lent
            </Text>
            <Text
              style={{
                color: "#7F3DFF",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 30,
              }}
            >
              ${lent}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("BorrowScreen")}
            style={styles.moneyBorrowed}
          >
            <Text
              style={{
                color: "#7F3DFF",
                fontWeight: "500",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Money Borrowed
            </Text>
            <Text
              style={{
                color: "#7F3DFF",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 30,
              }}
            >
              ${borrow}
            </Text>
          </TouchableOpacity>
          <Text style={styles.transaction}>Recent Transcations</Text>
          <TouchableOpacity style={styles.seeall}  >
            <Text>See All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}></TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
  },
  seeall: {
    backgroundColor: "#EEE5FF",
    borderRadius: 20,
    width: 60,
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlign: "center",
    top: 120,
    borderWidth: 1,
    borderColor: "#7F3DFF",
    justifyContent: "center",
    alignItems: "center",
    right: 16,
    position: "absolute",
  },
  transaction: {
    left: 16,
    top: 120,
    fontSize: 20,
    fontWeight: "500",
  },
  container: {
    paddingTop: 20,
    backgroundColor: "#fff",
    flex: 0.5,
    marginTop: StatusBar.currentHeight,
  },
  options: {
    backgroundColor: "#f5f0ff",
    height: "120%",
    borderRadius: 50,
    // position: "absolute",
    top: "90%",
  },
  profile: {
    paddingTop: Platform.OS === "android" ? StatusBar.marginTop : 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#7F3DFF",
    width: 40,
    height: 40,
    borderRadius: 100,
    position: "absolute",
    top: 20,
    left: 16,
  },
  receiptsBtn: {
    
    backgroundColor: "#7F3DFF",
    borderWidth: 1,
    borderColor: "#7F3DFF",
    width: 100,
    height: 50,
    borderRadius: 50,
    position: "absolute",
    top: 20,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
    
  },
  income: {
    width: 160,
    height: 80,
    position: "absolute",
    left: 16,
    top: 209,
    backgroundColor: "#00A86B",
    borderRadius: 28,
  },
  expenses: {
    width: 160,
    height: 80,
    position: "absolute",
    right: 16,
    top: 209,
    backgroundColor: "#ff4f5c",
    borderRadius: 28,
  },
  moneyLent: {
    width: 160,
    height: 80,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#7F3DFF",
    borderRadius: 28,
    position: "absolute",
    left: 16,
    marginTop: 20,
  },
  moneyBorrowed: {
    width: 160,
    height: 80,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#7F3DFF",
    borderRadius: 28,
    position: "absolute",
    right: 16,
    marginTop: 20,
  },
});
