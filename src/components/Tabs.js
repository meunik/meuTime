import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import { theme } from "@/src/global/styles/theme";

export function Tabs({
    data,
    render,
    ids = '',
    indexInicial = 0,
}) {
    const scrollViewRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const { width } = Dimensions.get('window');
        const activeTabIndex = Math.floor(offsetX / width);
        setActiveTab(activeTabIndex);
    };

    const scrollToTab = (index) => {
        const { width } = Dimensions.get('window');
        scrollViewRef.current.scrollTo({ x: index * width, y: 0, animated: true });
    };

    useEffect(() => {
      scrollToTab(indexInicial)
    }, [indexInicial]);
    
    const keys = Object.keys(data);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {data && (() => {
                    const items = [];
                    keys.forEach((key, index) => items.push(
                        <View key={`${ids}${index}`} style={{ width: Dimensions.get('window').width }}>
                            <View style={styles.info}>
                                {(index > 0) && 
                                <TouchableOpacity
                                    style={styles.setasEsquerda}
                                    onPress={() => scrollToTab(data[key].index - 1)}
                                >
                                    <Icon name="chevron-left" size={30} color="#969696"/>
                                </TouchableOpacity>}

                                <Text style={styles.txtInfo}>{data[key].title}</Text>

                                {(index != data.length - 1) && 
                                <TouchableOpacity
                                    style={styles.setasDoreita}
                                    onPress={() => scrollToTab(data[key].index + 1)}
                                >
                                    <Icon name="chevron-right" size={30} color="#969696"/>
                                </TouchableOpacity>}
                            </View>
                            
                            {render(data[key].content, data[key].title, data[key].index, data[key])}
                        </View>
                    ));
                    return items;
                })()}
            </ScrollView>
        </View>
    );
};

const TabTitles = () => (
    <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', paddingVertical: 10, backgroundColor: activeTab === 0 ? 'gray' : 'white' }}
            onPress={() => scrollToTab(0)}
        >
            <Text>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', paddingVertical: 10, backgroundColor: activeTab === 1 ? 'gray' : 'white' }}
            onPress={() => scrollToTab(1)}
        >
            <Text>Tab 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', paddingVertical: 10, backgroundColor: activeTab === 2 ? 'gray' : 'white' }}
            onPress={() => scrollToTab(2)}
        >
            <Text>Tab 3</Text>
        </TouchableOpacity>
    </View>
);


export const styles = StyleSheet.create({
    txtInfo: {
        color: theme.colors.texto[300],
        fontSize: theme.font.size[4],
    },
    setasEsquerda: {
        position: 'absolute',
        left: 30,
    },
    setasDoreita: {
        position: 'absolute',
        right: 30,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 10,
    },
})
