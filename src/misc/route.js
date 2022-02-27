import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerStatus
} from '@react-navigation/drawer';
import Splash from '../screens/splash';
import Home from '../screens/home';
import ExpenseForm from '../screens/expenseForm';
import CategoryEntryForm from '../screens/categoryEntryForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentCategory } from '../redux/categorySlice';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categoryList)




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
                                        props.navigation.closeDrawer()
                                        dispatch(changeCurrentCategory(item));
                                        
                                    }}
                                />
                            ))}

                    </DrawerContentScrollView>
                )
            }}
        >
            <Drawer.Screen options={{ headerShown: false, drawerActiveBackgroundColor: '#fff', drawerActiveTintColor: '#000', title: 'All' }} name="Home" component={Home} />
        </Drawer.Navigator>
    )


}

const Route = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
                <Stack.Screen name="DrawerNav" options={{ headerShown: false }} component={DrawerNav} />
                <Stack.Screen name="ExpenseForm" options={{ headerTintColor:'#fff',headerStyle:{
                    backgroundColor:'#6200ee'
                }  }} component={ExpenseForm} />
                <Stack.Screen name="CategoryEntryForm" options={{ headerTintColor:'#fff',headerStyle:{
                    backgroundColor:'#6200ee'
                }  }} component={CategoryEntryForm} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route