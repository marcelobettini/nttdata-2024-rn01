import { StyleSheet, Pressable, View } from 'react-native'
import { Text, Dialog, Portal, Button } from 'react-native-paper'
import React, { useState } from 'react'
import { ITodo } from '@/types/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface Props extends ITodo {
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

const Todo = ({ id, description, isCompleted, onToggle, onDelete }: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const hideDialog = () => setIsVisible(!isVisible)
    const showDialog = () => setIsVisible(true)
    return (
        <GestureHandlerRootView>
            <View style={styles.todoContainer}>
                <Pressable onLongPress={() => onToggle(id)}
                    onPress={showDialog}
                >
                    <Text
                        style={[styles.taskText, styles.mt, isCompleted && styles.completed]}
                    >{description.slice(0, 30)}...</Text>
                </Pressable >
                <Pressable onPress={() => onDelete(id)}>

                    <MaterialCommunityIcons name="trash-can-outline" size={24} color="tomato" />
                </Pressable>
                <Portal>
                    <Dialog visible={isVisible} onDismiss={hideDialog}>
                        <Dialog.Icon icon="information-outline" size={34} color={isCompleted ? '#512da8' : undefined} />
                        <Dialog.Title>Details</Dialog.Title>
                        <Dialog.Content>
                            <Text variant='bodyLarge'>{description}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button mode='contained-tonal' onPress={hideDialog}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


            </View>
        </GestureHandlerRootView>
    )
}

export default Todo

const styles = StyleSheet.create({
    todoContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        justifyContent: "space-between",
        backgroundColor: 'rgb(237, 221, 245)',
        borderRadius: 12,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    mt: {
        marginTop: 16
    },

    taskText: {
        fontSize: 20
    },
    completed: {
        color: "tomato",
        textDecorationLine: "line-through",
    },
})