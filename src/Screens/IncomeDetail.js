import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IncomeDetail({ route, navigation }) {
  let debtorName = "not defined";
  if (route.params !== undefined) {
    const { name } = route.params;
    debtorName = name;
  }

  const [totalAmountOwed, setTotalAmountOwed] = useState(0);
  const [debts, setDebts] = useState([{}]);

  const deleteHandler = async (debt) => {
    // Logic for deleting a debt
  };

  useEffect(() => {
    const getAllDebts = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("@incomes"));
      const debtorDebts = data.filter((item) => item.name === debtorName);
      let total = 0;
      debtorDebts.forEach((item) => {
        total += item.amount;
      });
      setTotalAmountOwed(total);
      setDebts(debtorDebts);
    };
    getAllDebts();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require(`../assets/back_w.png`)} />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>{`${debtorName}'s`} Debts</Text>
      <View style={styles.spentCard}>
        <Text style={styles.subheading}>Total Amount {debtorName} owes you</Text>
        <Text style={styles.paisa}>${totalAmountOwed}</Text>
      </View>
      <ScrollView>
        {debts.map((debt) => (
          <View key={Math.random()} style={styles.amts}>
            <View style={{ flex: 0.8 }}>
              <Text style={{ fontWeight: "600", fontSize: 30 }}>
                ${debt.amount}
              </Text>
              <View style={{ marginTop: "auto" }}>
                <Text style={styles.subheading2}>Description: </Text>
                <Text numberOfLines={1} style={{ fontWeight: "600" }}>
                  {debt.description}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => deleteHandler(debt)}>
                <Image source={require(`../assets/delete.png`)} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 25 }}>
                <Image source={require(`../assets/edit.png`)} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
  },
  spentCard: {
    marginTop: 30,
    height: 200,
    width: "95%",
    backgroundColor: "#5C2E7E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subheading: {
    color: "#EEEEEE",
    textAlign: "center",
    opacity: 0.5,
  },
  subheading2: {
    color: "#000000",
    opacity: 0.5,
  },
  paisa: {
    fontSize: 60,
    textAlign: "center",
    color: "#fff",
  },
  sectionTitle: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23,
    color: "#E6DDC4",
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 30,
    textAlign: "center",
  },
  amts: {
    height: 100,
    width: "95%",
    backgroundColor: "#8BBCCC",
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  actions: {
    flex: 0.2,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
