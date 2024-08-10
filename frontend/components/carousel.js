import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarouselCardItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.confession}>{item.Confession_Statement || "No Confession"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        height: 300, // Adjust height to a more reasonable value
        width: '100%',
    },
    confession: {
        fontWeight: '800',
        fontSize: 20,
        marginBottom: 40,
        color: "#493d8a",
        textAlign: 'center',
    },
});

export default CarouselCardItem;
