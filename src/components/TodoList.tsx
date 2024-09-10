import { useDb } from "@/database/useDb";
import { ITodo } from "@/types/types";
import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Keyboard } from
    "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "./AppHeader";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import { ActivityIndicator } from "react-native-paper";


function TodoList() {


    const db = useDb()
    const [todos, setTodos] = useState<ITodo[]>([])
    const [text, setText] = useState("")
    const addTodo = async () => {
        if (text.trim()) {
            await db.createOne(text)
            setText("")
            Keyboard.dismiss()
            revalidate()
        }
    }

    const revalidate = async () => {
        try {
            const results: ITodo[] = await db.findAll() as ITodo[]
            setTodos(results)
        } catch (error) {
            console.error(error)
        }
    }
    const toggleTaskStatus = async (id: number, state: boolean) => {
        try {
            await db.toggleIsCompleted(id, state)
            revalidate()
        } catch (error) {
            console.error(error)

        }

    }
    const deleteTask = async (id: number) => {
        try {
            await db.deleteOne(id)
            revalidate()
        } catch (error) {

        }

    }


    useEffect(() => {
        revalidate()
    }, [])
    return (

        <LinearGradient
            colors={['#dadde4', '#c0d3fd', '#76a9d5', '#512da8']}
            style={styles.fullHeigth}

        ><AppHeader />
            <View style={{ flex: 1, padding: 16 }}>
                <AddTodo text={text} setText={setText} addTodo={addTodo} />
                {!todos.length && <ActivityIndicator />}
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Todo {...item} onToggle={toggleTaskStatus} onDelete={deleteTask} />
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


    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
    }

})