import React, { useEffect, useState } from 'react';
import { Layout, Text, List, ListItem, Divider, Card, Avatar, withStyles } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipesGenerator = ({ info }) => {
    const navigation = useNavigation();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [diet, setDiet] = useState("")
    const [intolerances, setIntolerances] = useState([])

    useEffect(() => {
        setName(info.name);
        setEmail(info.email);
        setDiet(info.diet);
        setIntolerances(info.intolerances)
    }, [info]);




    return (
        <Layout >
            <Layout style={styles.userHeader}>
                <Layout style={styles.userTag}>
                    <Avatar source={require('../assets/cute.jpg')} size='large' shape='rounded' />
                    <Layout style={{ marginLeft: 20,backgroundColor: "#192734"}}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.caption}>{email}</Text>
                    </Layout>
                </Layout>
            </Layout>
            <Layout style={styles.userInfoSection}>
                <Layout style={styles.row}>
                    <Text category='label' style={styles.label}>MAIN DIET:</Text>
                    <Text style={styles.text}>{diet!="" ? diet : "No Preference"}</Text>
                </Layout>
                <Layout style={styles.row}>
                    <Text category='label' style={styles.label}>INTOLERANCES:</Text>
                    <Text style={styles.text}>{intolerances.join(', ')}</Text>

                </Layout>
                {/* <Layout style={styles.row}>
                    <Text category='label' style={styles.label}>DESIRED NUTRIENTS:</Text>
                </Layout> */}
            </Layout>
        </Layout>

    );

};

export default RecipesGenerator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userHeader: {
        paddingHorizontal: 30,
        marginTop: 50,
        marginBottom: 25,
        
    },

    userTag: { 
        flexDirection: 'row', 
        marginTop: 15, 
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        padding: 15,
        backgroundColor: "#192734"
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom:10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        //marginLeft: 20,
    },
    text: {
        marginLeft: 10
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
