import React from 'react';
import { ScrollView } from 'react-native';

export function Lista({
    data,
    renderItem,
    style = null,
    contentContainerStyle = null,
    refreshControl = null,
    scroll = false,
    ids = '',
}) {
    if (!data) {
        return null;
    }
    if (!renderItem) {
        console.error(`Erro no 'renderItem'`);
        return null;
    }
    
    const keys = Object.keys(data);

    if (scroll) {
        return (
            <ScrollView
                style={style}
                contentContainerStyle={contentContainerStyle}
                refreshControl={refreshControl}
            >
                {data && (() => {
                    const items = [];
                    keys.forEach((key, index) => items.push(renderItem(data[key], `${ids}${index}`)));
                    return items;
                })()}
            </ScrollView>
        );
    } else {
        return (<>
            {data && (() => {
                const items = [];
                keys.forEach((key, index) => items.push(renderItem(data[key], `${ids}${index}`)));
                return items;
            })()}
        </>);
    }
}
