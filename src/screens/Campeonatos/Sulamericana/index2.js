import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, ScrollView, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{flex: 1}}>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
        <Text style={styles.txt}>Hello</Text>
    </ View>
);

const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}/>
);

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export function Sulamericana() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
    ]);

    return (
        <View style={styles.container}>
            {/* START FIX: contentContainerStyle with flexGrow: 1 lets the children expand */}
            <ScrollView style={styles.scene} contentContainerStyle={{ flexGrow: 1 }}>
            {/* END FIX */}
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Hello</Text>
                <Text style={styles.txt}>Help</Text>
                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    style={styles.tabs}
                />
                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    style={styles.tabs}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1
    },
    tabs: {
        flex: 1
    },
    scene: {
        flex: 1,
    },
    txt: {
        color: '#fff',
    },
});
