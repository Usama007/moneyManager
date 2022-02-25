import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, Button, Card, Title, Snackbar, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/expenseSlice';





const ExpenseForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category)
  const expense = useSelector(state => state.expense)
  const [selectedCategory, setselectedCategory] = useState(category[0]);
  const [amount, setamount] = useState(0)
  const [note, setnote] = useState('')
  const [visibleSnackbar, setvisibleSnackbar] = useState(false);
  const [SnackbarMessage, setSnackbarMessage] = useState('')
  const [date, setDate] = useState()
  const [open, setOpen] = useState(false)


  // useEffect(() => {
  //   console.warn(expense);
  // }, [expense])
  

  const onPressSubmit = () => {
    if (amount <= 0) {
      setSnackbarMessage('Amount cannot be 0 or empty');
      setvisibleSnackbar(true);
      return;
    }else if(date == undefined){
      setSnackbarMessage('Select Expense Date');
      setvisibleSnackbar(true);
      return;
    }

    let payload = {
      id: Math.floor(Math.random() * (2000 - 37) ) + 37,
      category: selectedCategory,
      amount: amount,
      date: date,
      text: note
    }
    dispatch(addExpense(payload))
    
  }

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Card.Content>
          <Picker
            style={{ margin: 0 }}
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setselectedCategory(itemValue)
            }>
            {
              category.map((item) => (
                <Picker.Item key={(item, index) => { return item + "_" + index }} label={item} value={item} />

              ))
            }
          </Picker>
          <Divider />
          <List.Item
            title={date == undefined ? 'Select Date' : `Selected Date: ${date.getDate()}/${date.getDay()}/${date.getFullYear()}`}
            onPress={() => {
              setOpen(true)
            }}
            right={props => <List.Icon {...props} icon="calendar" />}
          />
          <Divider />

          <TextInput
            label="Amount(BDT)"
            value={amount > 0 ? amount : ''}
            mode='outlined'
            keyboardType='decimal-pad'
            style={{ marginBottom: 5 }}
            placeholder={'Enter Amount...'}
            onChangeText={text => setamount(text)}
          />

          <Divider />


          <DatePicker
            modal
            mode='date'
            open={open}
            date={date == undefined ? new Date() : date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />

          <TextInput
            label="Note"
            numberOfLines={3}
            multiline={true}
            value={note}
            mode='outlined'
            style={{ marginBottom: 5, maxHeight: 150 }}
            placeholder={'Note...'}
            onChangeText={text => setnote(text)}
          />
          <Divider />
        </Card.Content>

        <Card.Actions>
          <Button onPress={() => { navigation.goBack() }}>Cancel</Button>
          {category.length > 0 && (
            <Button onPress={onPressSubmit}>Submit</Button>
          )}
        </Card.Actions>
      </Card>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => {
          setSnackbarMessage('');
          setvisibleSnackbar(false);
        }}
        action={{
          label: 'GOT IT',
          onPress: () => {
            setSnackbarMessage('');
            setvisibleSnackbar(false);
          },
        }}>
        {SnackbarMessage}
      </Snackbar>
    </View>
  )
}

export default ExpenseForm