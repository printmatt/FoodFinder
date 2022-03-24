import React from 'react'
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const LoadingScreen = () => {

    return (
        <Layout style={styles.container}>
            <Text style={styles.header} category={"h3"}>Loading...</Text>
        </Layout>
    );
}

export default LoadingScreen


const styles = StyleSheet.create({
    header: {
        marginTop: 75,
    },
    container: {
        flex: 1,
        alignContent:"center",
        alignItems: 'center'
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
    },
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
});