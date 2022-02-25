import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Splash from '../screens/splash';
import ExpenseForm from '../screens/expenseForm';

const Stack = createNativeStackNavigator();
const route = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
                <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
                <Stack.Screen name="ExpenseForm" options={{
                    title:'Add New Expense',
                    headerStyle: {
                        backgroundColor: '#6200ee',

                    }, headerTintColor: '#fff'
                }} component={ExpenseForm} />              
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default route