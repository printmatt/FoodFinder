import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, } from 'react-native'
import { Layout, Text, Icon, Avatar, Divider, Input, Button, TopNavigationAction, TopNavigation, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { auth } from '../firebase'
import { getDatabase, ref, set } from "firebase/database";

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);


const data = [
    'vegetarian',
    'vegan',
    'paleo',
    'pescetarian',
    'primal',
    'ketogenic',
    'glutenfree',
    'none',
];

const indices = {
    "vegetarian": 0,
    "vegan": 1,
    "paleo": 2,
    'pescetarian': 3,
    'primal': 4,
    'ketogenic': 5,
    'glutenfree': 6,
    'none': 7,
}

const dataDanger = [
    'dairy',
    'egg',
    'gluten',
    'grain',
    'peanut',
    'seafood',
    'sesame',
    'shellfish',
    'soy',
    'sulfite',
    'treenut',
    'wheat',
]

const indicesDanger = {
    'dairy': 0,
    'egg': 1,
    'gluten': 2,
    'grain': 3,
    'peanut': 4,
    'seafood': 5,
    'sesame': 6,
    'shellfish': 7,
    'soy': 8,
    'sulfite': 9,
    'treenut': 10,
    'wheat': 11,
}

const defaultIngredients = [
    {
        "title": "chicken",
        "selected": false
    },
    {
        "title": "broccoli",
        "selected": false
    },
    {
        "title": "garlic",
        "selected": false
    }
]

const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [intolIndex, setIntolIndex] = useState([new IndexPath(0)]);

    const dietValue = data[selectedIndex.row];

    const groupIntoleranceValues = intolIndex.map(index => {
        const groupTitle = dataDanger[index.row];
        return groupTitle;
    });

    const renderOption = (title) => (
        <SelectItem title={title} />
    );
    const navigation = useNavigation()

    useEffect(() => {
        //diet index
        setSelectedIndex(new IndexPath(7))
        //intolerances index
        setIntolIndex([])


        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("MainApp", {userId: user.uid})
            }
        })

        return unsubscribe
    }, [])

    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' />
    );

    const navigateBack = () => {
        navigation.replace("Login");
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
                return user.uid;
            })
            .then((userId) => {
                writeUserData(userId, name, email, "", "", dietValue, groupIntoleranceValues, defaultIngredients)
            })
            .catch(error => alert(error.message))
    }

    const writeUserData = (userId, name, email, restrictions, cuisine, diet, intolerances) => {
        const db = getDatabase();
        set(ref(db, '/users/' + userId), {
            name: name,
            email: email,
            restrictions: restrictions,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerances,
            ingredients: [],
            recipes: [],
        });
    }
    return (
        <Layout style={{flex:1}}>
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
                    <Layout style={styles.row}>
                        {/* // Diet Selection */}
                        <Text style={styles.title} category={'h6'}>DIET:</Text>
                        <Select
                            style={styles.selectbox}
                            placeholder='Default'
                            value={dietValue}
                            selectedIndex={selectedIndex}
                            onSelect={index => {
                                setSelectedIndex(index)
                                console.log(index)
                            }}>
                            {data.map(renderOption)}
                        </Select>
                    </Layout>

                    <Layout style={styles.row}>
                        {/* // Intolerance selections */}
                        <Text style={styles.title} category={'h6'}>INTOLERANCES:</Text>
                        <Select
                            style={styles.selectbox}
                            multiSelect={true}
                            value={groupIntoleranceValues.join(', ')}
                            selectedIndex={intolIndex}
                            onSelect={index => setIntolIndex(index)}>
                            {dataDanger.map(renderOption)}
                        </Select>
                    </Layout>
                </Layout>

                    <Button
                        onPress={handleSignUp}
                        style={[styles.button]}
                    >
                        Register Account
                    </Button>
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
        marginTop: "40%",
        alignItems: 'center',
        alignContent:'center'
    },
    inputContainer: {
        width: '80%',
        marginTop: "10%",
        marginHorizontal: "5%",
        alignContent:'center'
    },
    input: {
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    button: {
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: "10%",

    },

    title: {
        marginRight: 20,
        marginTop: 5,
    },
    selectbox: {
        width: 175
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
    row: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 15,
    },

})