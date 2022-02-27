import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentCategory } from '../redux/categorySlice'
import { Divider, FAB, Button, Dialog, Portal, Provider, RadioButton, Title, List, Paragraph } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment';
import ExpenseListItem from '../components/expenseListItem'

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const expenseRedux = useSelector(state => state.expense)
  const category = useSelector(state => state.category)
  const [expenseObject, setexpenseObject] = useState({})
  const [individualCategoryExpenseList, setindividualCategoryExpenseList] = useState([])
  const [visibleDialog, setvisibleDialog] = useState(false)
  const [filterValue, setfilterValue] = useState('')
  const [filteredExpenseList, setfilteredExpenseList] = useState([])
  const [isFiltered, setisFiltered] = useState(false)


  useEffect(() => {
    const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
      dispatch(changeCurrentCategory('All'));
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
      generateList();
  }, [category.currentCategory,expenseRedux])

  const generateList = () => {
    if (category.currentCategory != 'All') {
      for (let data in expenseRedux) {
        if (data == category.currentCategory) {
          setindividualCategoryExpenseList(expenseRedux[data])
        }
      }
    }else{
      setexpenseObject(expenseRedux)
    }
  }

  const onPressFilter = () => {
    if (filterValue == 'Reset') {
      setfilteredExpenseList([]);
      setfilterValue('');
      setisFiltered(false);
    } else {
      let firstInputDate = new Date();

      for (let category in expenseObject) {
        for (let a = 0; a < expenseObject[category].length; a++) {
          let item = expenseObject[category][a];
          if (moment(item.date) < moment(firstInputDate)) {
            firstInputDate = moment(item.date)
          }
        }
      }

      let startOfMonth = moment(firstInputDate).clone().startOf('month');
      let endDate = moment(new Date());
      let continueWhile = true;
      let tempArray = [];

      while (continueWhile) {
        if (startOfMonth < endDate) {
          let total = 0;
          let obj = {};
          let categoryName = '';

          for (let category in expenseObject) {
            for (let a = 0; a < expenseObject[category].length; a++) {
              let item = expenseObject[category][a];
              if ((moment(item.date) >= moment(startOfMonth)) && (moment(item.date) <= moment(startOfMonth).add(filterValue == 'Weekly' ? 7 : moment(startOfMonth).daysInMonth(), 'days'))) {
                entryDate = item.date
                total += parseFloat(item.amount);
              }
            }
            if (total > 0) {
              categoryName += ' ' + category + ',';
            }
          }
          obj = {
            range: moment(startOfMonth).format('DD/MM/YYYY') + " - " + moment(startOfMonth).add(filterValue == 'Weekly' ? 7 : moment(startOfMonth).daysInMonth(), 'days').format('DD/MM/YYYY'),
            category: categoryName,
            total: total
          }
          tempArray.push(obj);
          startOfMonth = moment(startOfMonth).add(filterValue == 'Weekly' ? 7 : moment(startOfMonth).daysInMonth(), 'days');

        } else {
          continueWhile = false;
        }
      }

      setfilteredExpenseList(tempArray);
      setisFiltered(true);
    }
  }

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
                value="Weekly"
                color={'#6200ee'}
                status={filterValue == 'Weekly' ? 'checked' : 'unchecked'}
                onPress={() => setfilterValue('Weekly')}
              />
              <Text style={{ paddingTop: 7 }}>Weekly</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="Monthly"
                color={'#6200ee'}
                status={filterValue == 'Monthly' ? 'checked' : 'unchecked'}

                onPress={() => setfilterValue('Monthly')}
              />
              <Text style={{ paddingTop: 7 }}>Monthly</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="Monthly"
                color={'#6200ee'}
                status={filterValue == 'Reset' ? 'checked' : 'unchecked'}

                onPress={() => setfilterValue('Reset')}
              />
              <Text style={{ paddingTop: 7 }}>Reset</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            
            <Button onPress={() => {
              setvisibleDialog(false)
              onPressFilter();
            }}>Filter</Button>

          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

  const RenderExpenses = ({ category, list }) => {
    return (
      <>
        <Title>{category}</Title>
        {
          list.map((item, index) => {
            return (
              <ExpenseListItem key={index + '_' + item.id} item={item} />
            )
          })
        }
        <Divider />
      </>
    )
  }

  const RenderIndividualCategoryExpense = ({ list = [] }) => {

      return (
        <>
          {
            list?.map((item, index) => {
              return (
                <ExpenseListItem key={index + '_' + item.id} item={item} />
              )
            })
          }
          <Divider />
        </>
      )
  
   
  }

  const RenderFilteredExpense = ({ item }) => {
    return (
      <List.Item
        title={item.range}
        description={item.category}
        right={props => <Paragraph>{item.total}TK</Paragraph>}
      />
    )
  }


  return (
    <Provider>
      <Header title={category.currentCategory} showDialog={() => setvisibleDialog(true)} subtitle={filterValue=="Reset"?'':filterValue}/>
      <SafeAreaView style={styles.container}>
        <RenderDialog />
        <ScrollView>
          <>
            {category.currentCategory == 'All' ? (
              <>
                {!isFiltered ? (
                  <>
                    {
                      Object.keys(expenseObject).map(function (key, index) {
                        return (
                          <RenderExpenses key={index + "_" + key} category={key} list={expenseObject[key]} />
                        )
                      })
                    }
                  </>) : (<>
                    {filteredExpenseList.map((item, index) => (
                      <RenderFilteredExpense key={item.range + '-' + index} item={item} />
                    ))}
                  </>)}

              </>
            ) : (
            <RenderIndividualCategoryExpense list={individualCategoryExpenseList} />
            // <Text>{JSON.stringify(individualCategoryExpenseList)}</Text>
            )}
          </>
        </ScrollView>

        <FAB
          style={styles.fab}
          small
          icon="plus"
          color='#fff'
          onPress={() => navigation.navigate('ExpenseForm')}
        />
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee'
  },
})


export default Home