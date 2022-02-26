import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/header';
import { Dialog, FAB, Portal, Provider, RadioButton, Button, Title, Divider, Headline } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ExpenseListItem from '../components/expenseListItem';
import { useEffect } from 'react';
import { changeCurrentCategory } from '../redux/categorySlice';



const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const expense = useSelector(state => state.expense)
  const category = useSelector(state => state.category)
  const [visibleDialog, setvisibleDialog] = useState(false)
  const [expenseList, setexpenseList] = useState([])


  useEffect(() => {
    if (category.currentCategory != 'All') {
      for (let a in expense) {
        if (a == category.currentCategory) {
          // console.warn(expense[a]);
          setexpenseList(expense[a])
        }
      }
    }
  }, [category.currentCategory])


  useEffect(() => {
    const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
      // Prevent default behavior
      e.preventDefault();
      dispatch(changeCurrentCategory('All'));
      navigation.closeDrawer();

    });
    return unsubscribe;
  }, [navigation]);

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
      <Header showDialog={() => setvisibleDialog(true)} title={category.currentCategory} />
      <ScrollView>
        {category.currentCategory == "All" ? (
          <>
            {
              Object.keys(expense).map(function (key) {
                return (
                  <View style={{ margin: 5 }}>
                    <Headline>{key}</Headline>
                    <Divider />

                    {expense[key].map((item) => (
                      <ExpenseListItem key={item.id} item={item} />
                    ))
                    }
                  </View>
                )
              })
            }
          </>
        ) : (<>
          <View style={{ margin: 5 }}>
            <Headline>{category.currentCategory}</Headline>
            <Divider />

            {expenseList.map((item) => (
              <ExpenseListItem key={item.id} item={item} />
            ))
            }
          </View>

        </>)}

      </ScrollView>
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