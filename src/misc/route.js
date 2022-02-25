import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import Home from '../screens/home';
import Splash from '../screens/splash';
import ExpenseForm from '../screens/expenseForm';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNav = ({ navigation }) => {
    const category = useSelector(state => state.category)

    useEffect(() => {
    }, [])



    return (
        <Drawer.Navigator initialRouteName="Home"
            drawerContent={(props) => {
                return (
                    <DrawerContentScrollView {...props} >
                        <DrawerItemList {...props} />                       
                        {

                            category.map((item) => (
                                <DrawerItem
                                    label={item}
                                    onPress={() => navigation.navigate("Splash")}
                                />
                            ))
                        }

                    </DrawerContentScrollView>
                )
            }}


        >
            <Drawer.Screen name="Home" options={{ headerShown: false }} component={Home} />


        </Drawer.Navigator>
    )

}


const route = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
                <Stack.Screen name="DrawerNav" options={{
                    headerShown: false
                }} component={DrawerNav} />
                <Stack.Screen name="ExpenseForm" options={{
                    title: 'Add New Expense',
                    headerStyle: {
                        backgroundColor: '#6200ee',

                    }, headerTintColor: '#fff'
                }} component={ExpenseForm} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default route