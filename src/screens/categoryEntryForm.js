import { View } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/categorySlice';


const CategoryEntryForm = ({navigation}) => {
  const dispatch = useDispatch();

  const [categoryName, setcategoryName] = useState('')

  const onPressSubmit = () => {
    dispatch(addCategory(categoryName))
    navigation.goBack();
  }

  return (
    <View style={{margin: 5}}>
      <TextInput
        label="Category Name"
        value={categoryName}
        mode='outlined'
        keyboardType='default'
        style={{ marginBottom: 5 }}
        placeholder={'Enter Category Name...'}
        onChangeText={text => setcategoryName(text)}
      />
       <Button mode='contained' onPress={onPressSubmit} disabled={categoryName==''}>Submit</Button>
    </View>
  )
}

export default CategoryEntryForm