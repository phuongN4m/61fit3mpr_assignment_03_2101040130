import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DebtorCard from "../components/DebtorCard";

export default function IncomeScreen({ navigation }) {
  const [allIncomes, setAllIncomes] = useState([{}]);
  const [totalIncome, setTotalIncome] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchIncomes = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("@incomes"));
      if (data !== null) {
        let totalAmount = 0;
        data.forEach((item) => {
          totalAmount += item.amount;
        });
        setTotalIncome(totalAmount);
        setAllIncomes(data);
      }
    };
    fetchIncomes();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Image source={require(`../assets/BG.png`)} style={styles.image} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require(`../assets/Vector.png`)} />
      </TouchableOpacity>
      <Text style={styles.title}>Income</Text>
      <Text style={styles.subtitle}>Total Income</Text>
      <Text style={styles.amount}>${totalIncome}</Text>
      <View style={styles.tasksWrapper}>
        <ScrollView style={styles.cardContainer}>
          {allIncomes.map((item) => (
            <TouchableOpacity
              key={Math.random()}
              onPress={() =>
                navigation.navigate("TransactionDetails", {
                  transaction: item,
                  type: "Income",
                })
              }
            >
              <DebtorCard key={item.title} name={item.title} money={item.amount} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddIncome")}
      >
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 2,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 999,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23,
  },
  title: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23,
    position: "absolute",
    top: 16,
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
  },
  subtitle: {
    position: "absolute",
    top: 100,
    fontSize: 15,
    fontWeight: "400",
    width: "100%",
    textAlign: "center",
    color: "#91919F",
  },
  amount: {
    position: "absolute",
    top: 120,
    fontSize: 40,
    fontWeight: "600",
    width: "100%",
    textAlign: "center",
    color: "black",
  },
  tasksWrapper: {
    flex: 1,
    alignItems: "center",
    height: "70%",
    paddingHorizontal: 10,
  },
  cardContainer: {
    height: 200,
  },
  addButton: {
    position: "absolute",
    width: 320,
    height: 56,
    left: 20,
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
  addButtonText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    color: "#FCFCFC",
  },
});
