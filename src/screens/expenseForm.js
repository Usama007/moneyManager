import { View } from 'react-native'
import React from 'react'
import { TextInput, Button, Card,  Snackbar, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { List } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/expenseSlice';


const ExpenseForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category)
  const expense = useSelector(state => state.expense)
  const [selectedCategory, setselectedCategory] = useState(category.categoryList[0]);
  const [amount, setamount] = useState(0)
  const [note, setnote] = useState('')
  const [visibleSnackbar, setvisibleSnackbar] = useState(false);
  const [SnackbarMessage, setSnackbarMessage] = useState('')
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  const onPressSubmit = () => {
    if (amount <= 0) {
      setSnackbarMessage('Amount cannot be 0 or empty');
      setvisibleSnackbar(true);
      return;
    } else if (note == '') {
      setSnackbarMessage('Note cannot be empty');
      setvisibleSnackbar(true);
      return;
    }

    let payload = {
      category: selectedCategory,
      data: {
        id: Math.floor(Math.random() * (2000 - 37)) + 37,
        amount: amount,
        date: date,
        text: note
      }
    }

  
    dispatch(addExpense(payload))
    setSnackbarMessage('Successfully added');
    setvisibleSnackbar(true);

    setTimeout(() => {
     navigation.goBack()
    }, 5000);

  }

 

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Card.Content>
          <Picker
            style={{ margin: 0 }}
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue == 'NewCategory') {
                navigation.navigate('CategoryEntryForm')
              } else {
                setselectedCategory(itemValue)
              }
            }

            }>
            {
              category.categoryList.map((item) => (
                <Picker.Item key={(item, index) => { return item + "_" + index }} label={item} value={item} />

              ))
            }

            <Picker.Item label={'Add New Category'} value={'NewCategory'} />

          </Picker>
          <Divider />
          <List.Item
            title={date == undefined ? 'Select Date' : `Selected Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
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
            date={date}
            maximumDate={new Date()}
            onConfirm={(date) => {
              setDate(date)
              setOpen(false)
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
          {category.categoryList.length > 0 && (
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