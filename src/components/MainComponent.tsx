import { StyleSheet, SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React from 'react'
import TodoList from './TodoList'

const MainComponent = () => {
    const insets = useSafeAreaInsets()
    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <TodoList />
        </SafeAreaView>
    )
}

export default MainComponent

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})