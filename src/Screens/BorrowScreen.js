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
  
  export default function BorrowScreen({ navigation }) {
    const [allBorrowed, setAllBorrowed] = useState([{}]);
    const [borrow, setBorrow] = useState(0);
    const isFocused = useIsFocused();
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
  
    // console.log(allDebts);
    // console.log(allDebts);
    // console.log(allDebts);
    // console.log(allDebts);
    // console.log(allDebts);
  
    // reduced.map((item) => {
    //   console.log(item);
    // });
    // const marr = reduced;
    // setAll(marr);
    // // console.log(marr);
    // console.log("alllllll", all);
  
    return (
      <View style={styles.container}>
        <Image source={require(`../assets/BG.png`)} style={styles.image}></Image>
        <TouchableOpacity
          style={{ position: "absolute", left: 16, top: 16, zIndex: 999,paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23 }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require(`../assets/Vector.png`)}></Image>
          {/* <Text style={{ color: "#fff" }}>Back</Text> */}
        </TouchableOpacity>
        <Text
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23,
            position: "absolute",
            top: 16,
            fontSize: 20,
            fontWeight: "500",
            width: "100%",
            textAlign: "center",
          }}
        >
          Money Borrowed
        </Text>
        <Text
          style={{
            position: "absolute",
            top: 100,
            fontSize: 15,
            fontWeight: "400",
            width: "100%",
            textAlign: "center",
            color: "#91919F",
          }}
        >
          Total Money Lent
        </Text>
        <Text
          style={{
            position: "absolute",
            top: 120,
            fontSize: 40,
            fontWeight: "600",
            width: "100%",
            textAlign: "center",
            color: "black",
          }}
        >
          ${borrow}
        </Text>
  
        <View style={styles.tasksWrapper}>
          <View style={{ height: "70%" }}>
            <ScrollView style={styles.cardContainer}>
              {allBorrowed !== undefined &&
                allBorrowed.map((obj) => {
                  return (
                    <TouchableOpacity
                      key={Math.random()}
                      onPress={() =>
                        navigation.navigate("BorrowDetails", { name: obj.name })
                      }
                    >
                      <DebtorCard
                        key={obj.name}
                        name={obj.name}
                        money={obj.amount}
                      ></DebtorCard>
                    </TouchableOpacity>
                  );
                })}
  
              {/* <DebtorCard name="Khushi" money={400}></DebtorCard>
                <DebtorCard name="Sekhar" money={400}></DebtorCard>
                <DebtorCard name="Mihir" money={400}></DebtorCard>
                <DebtorCard name="Abhinav" money={400}></DebtorCard>
                <DebtorCard name="Khushi" money={400}></DebtorCard>
                <DebtorCard name="Sekhar" money={400}></DebtorCard>
                <DebtorCard name="Mihir" money={400}></DebtorCard> */}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("AddBorrow")}
        >
          <Text style={styles.loginText}>+ Add</Text>
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
    },
    tasksWrapper: {
      flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      height: "70%",
      paddingHorizontal: 10,
    },
    sectionTitle: {
      color: "#E6DDC4",
      fontWeight: "bold",
      fontSize: 35,
      marginBottom: 30,
    },
    cardContainer: {
      height: 200,
    },
    addButton: {
      elevation: 100,
      marginTop: 40,
      borderRadius: 10,
      paddingVertical: 10,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: 100,
      backgroundColor: "#D6E4E5",
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
  