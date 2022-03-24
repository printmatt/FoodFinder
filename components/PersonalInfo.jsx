import React, { useEffect, useState } from 'react';
import { Layout, Text, List, ListItem, Divider, Card, Avatar, withStyles } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditIcon = (props) => (
    <Icon {...props} name='edit-2' style={styles.icon} fill='white' />
);

const PersonalInfo = ({ info, onEdit }) => {
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
                    <Layout style={{ flexDirection: 'row', backgroundColor: "#192734", justifyContent: 'space-between'}}>
                        <Avatar source={require('../assets/cute.jpg')} size='large' shape='rounded' />
                        <Layout style={{ marginLeft: 12, backgroundColor: "#192734" }}>
                            <Text style={styles.title}>{name}</Text>
                            <Text style={styles.caption}>{email}</Text>
                        </Layout>
                            <Button
                                size={'tiny'}
                                style={styles.button}
                                accessoryLeft={EditIcon}
                                onPress={onEdit}>
                                EDIT
                            </Button>
                    </Layout>
                    <Layout style={styles.row}>
                            <Text category='label' style={styles.label}>MAIN DIET:</Text>
                            <Text style={styles.text}>{diet != "" ? diet : "No Preference"}</Text>
                        </Layout>
                        <Layout style={styles.row}>
                            <Text category='label' style={styles.label}>INTOLERANCES:</Text>
                            <Text style={styles.text}>{intolerances?intolerances.join(', '):''}</Text>

                        </Layout>

                </Layout>
            </Layout>

        </Layout>

    );

};

export default PersonalInfo;

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
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        //marginLeft: 20,
    },
    text: {
        marginLeft: 10,
        maxWidth: 150,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: "#192734"
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
    icon: {
        width: 20,
        height: 20,
        marginLeft:5
    },
    button: {
        width: 60,
        height: 10,
    },
});
