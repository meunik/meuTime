import React from 'react';
import { ScrollView } from 'react-native';

export function Lista({
    data,
    renderItem,
    style = null,
    contentContainerStyle = null,
    listHeaderComponent = null,
    listFooterComponent = null,
    refreshControl = null,
    scroll = false,
    ids = '',
    infoAdd = null,
}) {
    if (!data) return null;
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
                {listHeaderComponent && listHeaderComponent}
                {data && (() => {
                    const items = [];
                    keys.forEach((key, index) => items.push(renderItem(data[key], `${ids}${index}`, infoAdd)));
                    return items;
                })()}
                {listFooterComponent && listFooterComponent}
            </ScrollView>
        );
    } else {
        return (<>
            {data && (() => {
                const items = [];
                keys.forEach((key, index) => items.push(renderItem(data[key], `${ids}${index}`, infoAdd)));
                return items;
            })()}
        </>);
    }
}
