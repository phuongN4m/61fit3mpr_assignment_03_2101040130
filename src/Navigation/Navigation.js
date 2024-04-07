import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AddDebt from "../Screens/AddDebt";
import AddExpenses from "../Screens/AddExpenses";
import AddIncome from "../Screens/AddIncome";
import AddReceipts from "../Screens/AddReceipts";

const Navigation = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName ="Dashboard">
                <stack.Screen name="AddBorrow" component ={AddDebt} />
                <stack.Screen name="AddDebt" component ={AddDebt} />
                <stack.Screen name="AddExpense" component ={AddExpenses} />
                <stack.Screen name="AddIncome" component ={AddIncome} />
                <stack.Screen name="AddReceipts" component ={AddReceipts} />
            </stack.Navigator>
        </NavigationContainer>
    )
}