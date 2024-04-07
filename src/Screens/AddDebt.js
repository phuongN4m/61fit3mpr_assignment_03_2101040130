import React, { useEffect } from "react";
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
} from "react-native";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AddDebt({ navigation }) {
  const [Amt, onChangeAmt] = React.useState('');
  const [name, onChangeName] = React.useState('');
  const [details, onChangeDetails] = React.useState(null);
  const [contact, setContact] = useState('');
  const [contacts, setContacts] = useState([{}]);
  const handleSubmit = async () => {
    let data = await AsyncStorage.getItem("@moneyLent");
    if (data == null) {
      await AsyncStorage.setItem("@moneyLent", JSON.stringify([]));
    }
    data = JSON.parse(await AsyncStorage.getItem("@moneyLent"));
    data.push({
      name: name.toLowerCase(),
      amount: Number(Amt),
      description: details,
    });
    await AsyncStorage.setItem("@moneyLent", JSON.stringify(data));
    navigation.goBack();
  };
//   useEffect(() => {
//     const cont = async () => {
//       const data = await firestore().collection("debts").doc(user.uid).get();
//       setContacts(data._data.contacts);
//     };
//     cont();
//     // console.log(contacts);
//   }, []);
  useEffect(() => {
    const c = contacts.filter((e) => e.name === name.toLowerCase());
    if (c.length > 0) {
      setContact(c[0].phone);
    } else setContact("");
  }, [name]);
  const inputAmt = (
    <TextInput
      style={{ ...styles.input, fontSize: 50, color: "#ffffff" }}
      onChangeText={onChangeAmt}
      value={Amt === 0 ? '' : Amt.toString()}
       placeholder="0.00" 
       keyboardType="decimal-pad"
       placeholderTextColor={"#fc8991"}
    />
  );

  const inputName = (
    <TextInput
      style={{
        ...styles.input,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: "#d3d3d9",
      }}
      onChangeText={onChangeName}
      value={name}
      placeholder="Borrower's Name"
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
      onChangeText={onChangeDetails}
      value={details}
      placeholder="Enter Details Here..."
      placeholderTextColor="#d3d3d9"
      keyboardType="default"
    />
  );
  const inputContacts = (
    <TextInput
      style={{
        ...styles.input,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: "#d3d3d9",
      }}
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 25, height: 25 }}
        >
          <Image
            source={require(`../assets/white_left_arrow.png`)}
            style={{ width: 25, height: 25 }}
          ></Image>
          {/* <Text style={{ color: "#fff" }}>Back</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.tasksWrapper}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1,paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10 }}>
            <Text style={styles.sectionTitle}>Debt</Text>
          </View>
          <View>
            <View>
              <Text style={styles.howMuch}>How much?</Text>
            </View>
            <View style={styles.inputDebt}>
              <Text style={{ fontSize: 50, color: "#ffffff" }}>$</Text>
              <View>{inputAmt}</View>
            </View>
          </View>
        </View>
        <View style={styles.WhiteCont}>
          <View>
            {/* <View><Text style={styles.inputTitle}>Borrower's Name :</Text></View> */}
            <View style={styles.inputPlace}>{inputName}</View>
            {/* <View><Text style={styles.inputTitle}>Details :</Text></View> */}
            <View style={styles.inputPlace}>{inputContacts}</View>

            <View style={styles.inputPlace}>{inputDetails}</View>
          </View>
          <View style={styles.submit}>
            <View style={styles.addButton}>
              <TouchableOpacity onPress={handleSubmit }style={styles.addButton}>
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
    backgroundColor: "#fd3c4a",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    // justifyContent: "space-between"
  },
  tasksWrapper: {
    flex: 1,
    height: "70%",
  },
  sectionTitle: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 23,
    // flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    // width:"70%",
    textAlign: "center",
  },
  inputDebt: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    color: "#ffffff",
  },
  addButton: {
    // elevation: 100,
    // marginTop: 40,
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
