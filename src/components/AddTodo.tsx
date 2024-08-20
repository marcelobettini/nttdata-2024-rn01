import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
interface props {
    text: string,
    setText: (text: string) => void,
    addTodo: () => void
}
const AddTodo = ({ text, setText, addTodo }: props) => {
    return (
        <View style={styles.container}>

            <TextInput
                mode='flat'
                value={text}
                label={'Add new task'}
                onChangeText={setText}
                multiline
            />
            <Button mode="contained" onPress={addTodo}>Add Task</Button>
        </View>
    )
}

export default AddTodo

const styles = StyleSheet.create({
    container: {
        rowGap: 10,
        justifyContent: 'space-between',
        marginBottom: 10
    }
})