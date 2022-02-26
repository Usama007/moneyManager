import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Paragraph } from 'react-native-paper';


const ExpenseListItem = ({ item }) => {
    return (
        <Card style={styles.card}>
            <Card.Content >
                <Paragraph>Amount Expensed - {item.amount}TK</Paragraph>
                <Text>Note - {item.text}</Text>
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