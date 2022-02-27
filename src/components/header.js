import React from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



const Header = ({ showDialog, title, subtitle = '' }) => {
    const navigation = useNavigation();
    return (
        <Appbar>
            <Appbar.Action icon="menu" onPress={() => {
                navigation.openDrawer();
            }} />
            <Appbar.Content title={title} subtitle={subtitle} />
            {title == 'All' && (
                <Appbar.Action icon="dots-vertical" onPress={showDialog} />
            )}
        </Appbar>

    )
}


export default Header