import { StyleSheet, Pressable, Animated, View } from 'react-native'
import { Text, Dialog, Portal, Button } from 'react-native-paper'
import React, { useState } from 'react'
import { ITodo } from '@/types/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'

interface Props extends ITodo {
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

//definir el umbral de desplazamiento para decidir cuando activar las acciones asignadas al swipe (swipe to delete, swipte to toggle...)
const TODO_SWIPE_THRESHOLD = 100

const Todo = ({ id, description, isCompleted, onToggle, onDelete }: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const hideDialog = () => setIsVisible(!isVisible)
    const showDialog = () => setIsVisible(true)

    /*Vamos a declarar un valor animado (Animated.Value). -> Controla la posicion horizontal del elemento (cada Todo) durante el swipe. Lo vamos a inicializar en 0 (posicion original)
    se actualiza ese valor de forma autonoma durante el gesto */
    const translateX = new Animated.Value(0)

    /**el evento que maneja el movimiento del swipe en tiempo real se llama 'onGestureEvent'-> va a ir actualizando el valor de translateX durante el gesto.
     */

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    )

    /**
     * 'onHandlerStateChange' va a ser crucial para definir que sucede cuando se completa el gesto de swipe. El evento se dispara cuando el usuario suelta la instancia del Todo que esta arrastrando.
     */
    const onHandlerStateChange = (event: any) => {
        //Solamente se actuara cuando el swipe haya finalizado
        if (event.nativeEvent.state === State.END) {
            const { translationX } = event.nativeEvent
            // si el desplazamiento hacia la izquierda supera el umbral que definamos para este movimiento concreto, se considera una accion de eliminacion
            if (translationX < -TODO_SWIPE_THRESHOLD * 2.5) {
                onDelete(id)
            }
            // si el desplazamiento hacia la derecha supera el umbral que definamos para este movimiento concreto, se considera una accion de toggleCompleted
            else if (translationX > TODO_SWIPE_THRESHOLD) {
                onToggle(id)
            }
            Animated.spring(translateX, {
                toValue: 0, //Volver a la posicion inicial
                friction: 5,
                useNativeDriver: true
            }).start()

        }

    }

    const animatedStyle = {
        transform: [{ translateX }]
    }

    const redLayerOpacity = translateX.interpolate({
        inputRange: [-TODO_SWIPE_THRESHOLD * 2.8, 0],
        outputRange: [1, 0]
    })
    const purpleLayerOpacity = translateX.interpolate({
        inputRange: [0, TODO_SWIPE_THRESHOLD],
        outputRange: [0, 1]
    })
    return (
        <GestureHandlerRootView>
            <View style={{ position: 'relative' }} >

                {/*Una capa de presentacion que aparece detras del Todo en color rojo */}
                <Animated.View style={[styles.redLayer, { opacity: redLayerOpacity }]}>
                    <Animated.View style={styles.deleteIconContainer}>
                        <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />

                    </Animated.View>

                </Animated.View>
                {/*Una capa de presentacion que aparece detran del Todo en color purpura */}
                <Animated.View style={[styles.purpleLayer, { opacity: purpleLayerOpacity }]}>
                    <Animated.View style={styles.checkIconContainer}>
                        <MaterialCommunityIcons name="check-circle-outline" size={24} color="white" />

                    </Animated.View>

                </Animated.View>

                {/* Este contenedor maneja el swipe y aplica las transformaciones animadas definidas en animatedStyle */}
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}//vincula el movimiento del gesto a la actualizacion de la variable translateX
                    onHandlerStateChange={onHandlerStateChange} //maneja el estado final del gesto para determinar si borramos, marcamos o no hacemos nada

                >
                    <Animated.View style={[styles.todoContainer, animatedStyle]}>
                        <Pressable onLongPress={() => onToggle(id)}
                            onPress={showDialog}
                        >
                            <Text
                                variant='bodyLarge'
                                style={isCompleted && styles.completed}
                            >{description.slice(0, 30)}...</Text>
                        </Pressable >
                        <Pressable onPress={() => onDelete(id)}>

                            <MaterialCommunityIcons name="trash-can-outline" size={24} color="tomato" />
                        </Pressable>
                    </Animated.View>
                </PanGestureHandler>


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
        paddingBottom: 5,
        justifyContent: "space-between",
        backgroundColor: 'rgb(237, 221, 245)',
        borderRadius: 12,
        paddingHorizontal: 20,
        marginTop: 20,
    },


    completed: {
        color: "tomato",
        textDecorationLine: "line-through",
    },
    redLayer: {
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 12,
        top: 20,
        height: 30,
        right: 0,
        left: 0,
    },
    purpleLayer: {
        position: 'absolute', // Posición absoluta similar a la capa roja.
        backgroundColor: '#512da8', // Color de fondo púrpura para indicar una acción constructiva (completar).
        top: 20,
        height: 30,
        right: 0,
        left: 0,
        borderRadius: 12,
    },

    deleteIconContainer: {
        position: 'absolute',
        right: 20
    },
    checkIconContainer: {
        position: 'absolute',
        left: 20
    }
})