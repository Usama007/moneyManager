import { View, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/header';
import { FAB } from 'react-native-paper';



const Home = ({navigation}) => {
  return (
    <>
      <Header />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color='#fff'        
        onPress={() => navigation.navigate('ExpenseForm')}
      />

    </>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#6200ee'
  },
})

export default Home