import { View, StyleSheet, Text, FlatList } from 'react-native'
import React from 'react'
import Header from '../components/header';
import { Dialog, FAB, Portal, Provider, RadioButton, Button, Title, Divider, Headline } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ExpenseListItem from '../components/expenseListItem';
import { useEffect } from 'react';



const Home = ({ navigation }) => {
  const expense = useSelector(state => state.expense)
  const [visibleDialog, setvisibleDialog] = useState(false)


  useEffect(() => {
    console.log(expense);
  }, [expense])

  const RenderDialog = () => {
    return (
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => {
          setvisibleDialog(false)
        }}>
          <Dialog.Title>Filter By</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="first"
                status={'checked'}
                onPress={() => setChecked('first')}
              />
              <Text style={{ paddingTop: 7 }}>Weekly</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="first"
                status={'unchecked'}

                onPress={() => setChecked('first')}
              />
              <Text style={{ paddingTop: 7 }}>Monthly</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              setvisibleDialog(false)
            }}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

  return (
    <Provider >
      <RenderDialog />
      <Header showDialog={() => setvisibleDialog(true)} />

      {Object.keys(expense).map(function (key) {
        return (
          <View style={{margin: 5}}>
            <Headline>{key}</Headline>
            <Divider />
            <FlatList
              data={expense[key]}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
              (
                <ExpenseListItem item={item} />
              )
              }
            />
          </View>
        )
      })
      }


      {/* <FlatList
        data={expense}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
        (
          <ExpenseListItem item={item} />
        )
        }
      /> */}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color='#fff'
        onPress={() => navigation.navigate('ExpenseForm')}
      />
    </Provider>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee'
  },
})

export default Home