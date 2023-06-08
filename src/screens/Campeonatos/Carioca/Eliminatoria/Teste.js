import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const Teste = () => {
    const view1Ref = useRef(null);
    const view2Ref = useRef(null);
    const vectorRef = useRef(new Animated.ValueXY());

    useEffect(() => {
        const calculateVectorCoordinates = () => {
            const view1 = view1Ref.current.measure((_, __, width, height, pageX, pageY) => {
                const view2 = view2Ref.current.measure((_, __, ___, ____, pageX2, pageY2) => {
                    const x1 = pageX + width / 2;
                    const y1 = pageY + height / 2;
                    const x2 = pageX2 + width / 2;
                    const y2 = pageY2 + height / 2;

                    vectorRef.current.setValue({ x: 0, y: 0 });
                    vectorRef.current.setOffset({ x: x1, y: y1 });

                    Animated.spring(vectorRef.current, {
                        toValue: { x: x2, y: y2 },
                        useNativeDriver: true,
                    }).start();
                });
            });
        };

        calculateVectorCoordinates();
    }, []);

    return (
        <View style={styles.container}>
            <View ref={view1Ref} style={styles.view1} />
            <View ref={view2Ref} style={styles.view2} />
            <Animated.View
                style={[
                    styles.vector,
                    {
                        transform: vectorRef.current.getTranslateTransform(),
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view1: {
        position: 'absolute',
        top: 100,
        left: 100,
        width: 50,
        height: 50,
        backgroundColor: 'red',
    },
    view2: {
        position: 'absolute',
        top: 300,
        left: 300,
        width: 50,
        height: 50,
        backgroundColor: 'blue',
    },
    vector: {
        position: 'absolute',
        height: 2,
        backgroundColor: 'green',
    },
});