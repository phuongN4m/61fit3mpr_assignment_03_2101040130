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
  TouchableOpacity,
} from "react-native";

export default function DebtorCard(props, { navigation }) {
  return (
    <View style={styles.card}>
      <View style={styles.nameWrapper}>
        <View style={styles.nameCard}>
          <Text style={styles.nameText}>{props.name}</Text>
        </View>
      </View>
      <View style={styles.moneyWrapper}>
        <View style={styles.moneyCard}>
          <Text style={styles.moneyText}>${props.money}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
   
    height: 90,
    width: 320,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  moneyCard: {
    flex: 1,
    height: 70,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  nameCard: {
    flex: 3,
    height: 70,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  moneyWrapper: {
    flex: 1,
    height: 90,
    paddingRight: 16,
  },
  nameWrapper: {
    flex: 3,
    height: 90,
  },
  moneyText: {
    fontSize: 20,
    fontWeight: "900",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
