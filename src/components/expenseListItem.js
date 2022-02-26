import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Paragraph } from 'react-native-paper';
import moment from 'moment';


const ExpenseListItem = ({ item }) => {
    return (
        <Card style={styles.card}>
            <Card.Content >
                <View style={styles.cardContentView}>
                    <Paragraph>{ moment(item.date).format('DD-MM-YYYY')}</Paragraph>
                    <Paragraph>{item.amount}TK</Paragraph>
                </View>
                <Text>{item.text}</Text>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5
    },
    cardContentView: {
        justifyContent: 'space-between', flexDirection: 'row'
    }

})

export default ExpenseListItem