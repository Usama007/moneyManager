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
import { useDispatch, useSelector } from 'react-redux';
import ExpenseList from '../screens/categoryEntryForm';
import { changeCurrentCategory } from '../redux/categorySlice';
import CategoryEntryForm from '../screens/categoryEntryForm';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNav = ({ navigation }) => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.category.categoryList)

    useEffect(() => {
    }, [])



    return (
        <Drawer.Navigator initialRouteName="Home"
            drawerContent={(props) => {
                return (
                    <DrawerContentScrollView {...props} >
                        <DrawerItemList {...props} />
                        {

                            categories.map((item) => (
                                <DrawerItem
                                    label={item}
                                    onPress={() => {
                                        dispatch(changeCurrentCategory(item));
                                        props.navigation.closeDrawer()
                                    }}
                                />
                            ))}

                    </DrawerContentScrollView>
                )
            }}


        >
            <Drawer.Screen name="Home" options={{ headerShown: false,drawerActiveBackgroundColor:'#fff',drawerActiveTintColor:'#000',title:'All' }} component={Home} />
            {/* <Drawer.Screen name="ExpenseList" options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} component={ExpenseList} /> */}


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
                <Stack.Screen name="CategoryEntryForm" options={{
                    title: 'Add New Category',
                    headerStyle: {
                        backgroundColor: '#6200ee',

                    }, headerTintColor: '#fff'
                }} component={CategoryEntryForm} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default route