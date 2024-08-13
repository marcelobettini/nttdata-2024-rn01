import * as Crypto from "expo-crypto"
import { FontAwesome } from "@expo/vector-icons"
import { Todo } from "@/types/types";
import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable, Alert } from
    "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "./AppHeader";
import AddTodo from "./AddTodo";


function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [text, setText] = useState("")
    const addTodo = () => {
        if (text.trim()) {
            const newTask = {
                id: Crypto.randomUUID(),
                description: text,
                isCompleted: false
            }
            setTodos([...todos, newTask])
            setText("")
        }



    }
    const toggleTaskStatus = (id: string) => {
        const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)
        setTodos([...updatedTodos])
    }
    const deleteTask = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id)
        setTodos([...updatedTodos])
    }
    return (

        <LinearGradient
            colors={['#dadde4', '#c0d3fd', '#76a9d5', '#512da8']}
            style={styles.fullHeigth}

        ><AppHeader />
            <View style={{ flex: 1, padding: 16 }}>
                <AddTodo text={text} setText={setText} addTodo={addTodo} />
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskContainer}>
                            <Pressable onPress={() => toggleTaskStatus(item.id)}>
                                <Text
                                    style={[styles.taskText, styles.mt, item.isCompleted && styles.completed]}
                                >{item.description}</Text>
                            </Pressable>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <FontAwesome name="trash" size={24} color={"tomato"} />
                            </TouchableOpacity>
                        </View>
                    )}
                />

            </View>
        </LinearGradient>
    )

}
export default TodoList;

export const styles = StyleSheet.create({
    fullHeigth: {
        flex: 1
    },
    // container: {
    //     flex: 1,
    //     width: '100%',
    //     padding: 16,
    //     backgroundColor: "whitesmoke"
    // },

    input: {
        height: 40,
        borderColor: "#6b76b8",
        borderWidth: 1,
        paddingHorizontal: 8,
        fontSize: 18,
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
    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
    }

})