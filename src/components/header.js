import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Appbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Button, Text, Dialog, Portal, Provider, RadioButton } from 'react-native-paper';




const Header = () => {
    const [visibleDialog, setvisibleDialog] = useState(false)

    return (
        <Provider>
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
                            <Text style={{paddingTop: 7}}>Weekly</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={'unchecked'}
                                
                                onPress={() => setChecked('first')}
                            />
                            <Text style={{paddingTop: 7}}>Monthly</Text>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            setvisibleDialog(false)
                        }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Appbar style={styles.bottom}>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Title" subtitle="Subtitle" />
                <Appbar.Action icon="dots-vertical" onPress={() => {
                    setvisibleDialog(true)
                }} />
            </Appbar>
        </Provider>
    )
}

const styles = StyleSheet.create({

});

export default Header