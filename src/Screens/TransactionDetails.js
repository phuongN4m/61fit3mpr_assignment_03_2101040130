import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TransactionDetails({ navigation, route }) {
  const { transaction, type } = route.params;
  const deleteTransaction = async () => {
    console.log("delete");
    if (type == "Income") {
      const data = JSON.parse(await AsyncStorage.getItem("@incomes"));
      if (data != null) {
        let newData = [];
        data.map((obj) => {
          if (
            obj.description !== transaction.description ||
            obj.title !== transaction.title ||
            obj.amount !== transaction.amount
          ) {
            newData.push(obj);
          }
        });
        await AsyncStorage.setItem("@incomes", JSON.stringify(newData));
      }
    }
    if (type == "Expense") {
      const data = JSON.parse(await AsyncStorage.getItem("@expenses"));
      if (data != null) {
        let newData = [];
        data.map((obj) => {
          if (
            obj.description !== transaction.description ||
            obj.title !== transaction.title ||
            obj.amount !== transaction.amount
          ) {
            newData.push(obj);
          }
        });
        await AsyncStorage.setItem("@expenses", JSON.stringify(newData));
      }
    }
    if (type == "Lent") {
      const data = JSON.parse(await AsyncStorage.getItem("@moneyLent"));
      if (data != null) {
        let newData = [];
        data.map((obj) => {
          if (
            obj.description !== transaction.description ||
            obj.name !== transaction.name ||
            obj.amount !== transaction.amount
          ) {
            newData.push(obj);
          }
        });
        await AsyncStorage.setItem("@moneyLent", JSON.stringify(newData));
      }
    }
    if (type == "Borrowed") {
      const data = JSON.parse(await AsyncStorage.getItem("@moneyBorrowed"));
      if (data != null) {
        let newData = [];
        data.map((obj) => {
          if (
            obj.description !== transaction.description ||
            obj.name !== transaction.name ||
            obj.amount !== transaction.amount
          ) {
            newData.push(obj);
          }
        });
        await AsyncStorage.setItem("@moneyBorrowed", JSON.stringify(newData));
      }
    }
    navigation.goBack();
  };
  let containerStyle;
  if (type == "Income") containerStyle = styles.greenContainer;
  if (type == "Expense") containerStyle = styles.redContainer;
  if (type == "Lent" || type == "Borrowed")
    containerStyle = styles.blueContainer;
  return (
    <View style={styles.container}>
      <View style={containerStyle}>
        <TouchableOpacity
          style={{ position: "absolute", left: 16, top: 16, zIndex: 999,paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23 }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require(`../assets/Vector.png`)}></Image>
          {/* <Text style={{ color: "#fff" }}>Back</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={{ zIndex: 999, }} onPress={deleteTransaction}>
          <Text
            style={{
              position: "absolute",
              right: 16,
              top: 16,
              paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Detail Transaction</Text>
        <Text style={styles.amount}>${transaction.amount}</Text>
      </View>
      <View style={styles.detailCard}>
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <Text style={{ textAlign: "center", color: "#91919F" }}>Type</Text>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
          >
            {type}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          {type == "Lent" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>
                From
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                {/* {username} */}
                currUser
              </Text>
            </>
          )}
          {type == "Borrowed" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>
                From
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                {transaction.name}
              </Text>
            </>
          )}
          {type == "Income" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>
                Title
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                {transaction.title}
              </Text>
            </>
          )}
          {type == "Expense" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>
                Title
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                {transaction.title}
              </Text>
            </>
          )}
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          {type == "Lent" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>To</Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                {transaction.name}
              </Text>
            </>
          )}
          {type == "Borrowed" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>To</Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                {/* {username} */}
                currUser
              </Text>
            </>
          )}
          {type == "Income" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>
                Wallet
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                PayTM
              </Text>
            </>
          )}
          {type == "Expense" && (
            <>
              <Text style={{ textAlign: "center", color: "#91919F" }}>
                Wallet
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                PayTM
              </Text>
            </>
          )}
        </View>
      </View>
      <View>
        <Text style={{ textAlign: "center", color: "#91919F", fontSize: 20 }}>
          Description
        </Text>
        <Text style={{ padding: 16, fontSize: 23 }}>
          {transaction.description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() =>
          navigation.navigate("EditTransactions", {
            transaction: transaction,
            type: type,
          })
        }
      >
        <Text style={styles.loginText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: StatusBar.currentHeight },
  greenContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#00A86B",
    height: "35%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  redContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FD3C4A",
    height: "35%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  blueContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#0077FF",
    height: "35%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23,
    position: "absolute",
    top: 16,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  amount: {
    textAlign: "center",
    color: "#fff",
    top: "30%",
    fontSize: 48,
    fontWeight: "700",
  },
  detailCard: {
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#cfcccc",
    borderRadius: 12,
    borderStyle: "solid",
    bottom: 40,
    backgroundColor: "#fff",
    // flex: 3,
    height: 80,
    width: "90%",
    flexDirection: "row",
  },
  loginBtn: {
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
  loginText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    color: "#FCFCFC",
  },
});
