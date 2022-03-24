import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Layout, Text, Icon, Avatar, Divider, Input, Button } from '@ui-kitten/components';
import { auth } from '../firebase'

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("MainApp", {userId: user.uid})
            }
        })

        return unsubscribe
    }, [])

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableOpacity onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableOpacity>
    );

    const handleSignUp = () => {
        navigation.replace("SignUp");
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }
    const renderCaption = () => {
        return (
          <View style={styles.captionContainer}>
            {AlertIcon(styles.captionIcon)}
            <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
          </View>
        )
      }

    return (
        <Layout
            style={styles.container}
            behavior="padding">
            <Layout style={styles.inputContainer}>
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
                    onPress={handleLogin}
                    style={styles.button}
                >
                    Login
                </Button>
                <Button
                    onPress={handleSignUp}
                    style={[styles.button]}
                    appearance={"ghost"}
                >
                    Register
                </Button>
            </Layout>
        </Layout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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