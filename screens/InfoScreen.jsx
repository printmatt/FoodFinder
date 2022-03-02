import React from 'react'
import { Text } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native';
import { Layout, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const InfoScreen = () => {

    const navigation = useNavigation();

    return (
        <Layout style={styles.container}>
            
        </Layout>
    )
}

export default InfoScreen

const styles = StyleSheet.create({
    header: {
        paddingTop: 75,
    },
    container: {
        flex: 1,
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