import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentCategory } from '../redux/categorySlice';
import { Paragraph } from 'react-native-paper';

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
            <Paragraph style={styles.paragragh}>MONEY MANAGER</Paragraph>
            <ActivityIndicator
                size="large"
                color="#6200ee"
                style={styles.loader}
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
    paragragh:{
        textAlign:'center',
        color:'#7a8692'
    },
    loader:{
        justifyContent: 'flex-end'
    }
});


export default Splash;
