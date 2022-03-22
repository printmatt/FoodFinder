import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, } from 'react-native'
import { Layout, Text, Icon, Avatar, Divider, Input, Button, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { auth } from '../firebase'

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);



const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("MainApp")
            }
        })

        return unsubscribe
    }, [])

    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' />
    );

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction style={styles.header} icon={BackIcon} onPress={navigateBack} />
    );

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableOpacity onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableOpacity>
    );

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <Layout style={{ flex: 1 }}>
            <TopNavigation alignment='center' accessoryLeft={BackAction} />

            <Layout
                style={styles.container}
                behavior="padding">

                <Layout style={styles.inputContainer}>
                <Input
                        placeholder="Matt Vang"
                        label='Name'
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.input}
                    />
                    <Input
                        placeholder="username@email.com"
                        label='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <Input
                        value={password}
                        label='Password'
                        //caption={renderCaption}
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                        style={styles.input}

                    />
                </Layout>

                <Layout style={styles.buttonContainer}>
                    <Button
                        onPress={handleSignUp}
                        style={[styles.button]}
                    >
                        Register Account
                    </Button>
                </Layout>
            </Layout>
        </Layout>

    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    header: {
        marginTop: 75,
    },
    container: {
        flex: 1,
        marginTop:"30%",
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,

    },
    buttonSignup: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,


    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})