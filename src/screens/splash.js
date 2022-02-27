import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentCategory } from '../redux/categorySlice';

const Splash = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeCurrentCategory('All'));
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'DrawerNav' }],
            });
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/splash.png')}
                style={styles.image}
            />
            <ActivityIndicator
                size="large"
                color="#00aeef"
                style={{ justifyContent: 'flex-end' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center'
    },
    image: {
        height: 200,
        width: 200,
        resizeMode: 'cover',

    },
});


export default Splash;
