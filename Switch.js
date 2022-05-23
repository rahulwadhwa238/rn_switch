import React, { useRef } from "react";
import { Pressable, Animated } from "react-native";
import style from './Switch.style'

export default function Switch({ value, onValueChanged }) {


    const animatedDotColor = useRef(new Animated.Value(0)).current;
    const animatedBackgroundColor = useRef(new Animated.Value(0)).current;
    const animatedPosition = useRef(new Animated.Value(0)).current;

    const dotColorInterpolation = animatedDotColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#000', '#FFF']
    })

    const backgroundColorInterpolation = animatedBackgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#C2C2C2', '#C2C2C2']
    })

    const handleAnimation = async () => {
        const enabled = value
        onValueChanged(!value)
        console.log(enabled)
        Animated.timing(animatedDotColor, {
            useNativeDriver: false,
            toValue: enabled ? 0 : 1,
            duration: 250
        }).start()
        Animated.timing(animatedBackgroundColor, {
            useNativeDriver: false,
            toValue: enabled ? 0 : 1,
            duration: 250
        }).start()
        Animated.timing(animatedPosition, {
            useNativeDriver: false,
            toValue: enabled ? 0 : 20,
            duration: 250
        }).start()
    }

    return (
        <Pressable
            onPress={handleAnimation}
        >
            <Animated.View
                style={{
                    ...style.switchContainer,
                    backgroundColor: backgroundColorInterpolation,
                }}
            >

                <Animated.View
                    style={{
                        ...style.switchIcon,
                        left: animatedPosition,
                        backgroundColor: dotColorInterpolation,
                    }}
                />
            </Animated.View>
        </Pressable>
    )
}