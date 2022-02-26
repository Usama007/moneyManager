import { StyleSheet } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';




const Header = ({showDialog}) => {
    const navigation = useNavigation();
    return (
        <Appbar>
            <Appbar.Action icon="menu" onPress={() => {
                navigation.openDrawer();
            }} />
            <Appbar.Content title="Title" subtitle="Subtitle" />
            <Appbar.Action icon="dots-vertical" onPress={showDialog} />
        </Appbar>
     
    )
}

const styles = StyleSheet.create({

});

export default Header