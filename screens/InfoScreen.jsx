import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipeInfo from '../components/RecipeInfo';
import { Layout, Text, Divider, TopNavigationAction, TopNavigation, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
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
    'wheat'
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
    'wheat': 11
}
const InfoScreen = ({ route }) => {
    const navigation = useNavigation();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
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

    useEffect(() => {
        setName(route.params.info.name)
        setEmail(route.params.info.email)

        let i = indices[route.params.info.diet == "" ? "none" : route.params.info.diet]
        setSelectedIndex(new IndexPath(i))

        let j = route.params.info.intolerances.map(cantEat => {
            return new IndexPath(indicesDanger[cantEat])
        })
        setIntolIndex(j)
    }, [route])


    const navigateBack = () => {
        navigation.goBack();
    };

    const update = () => {
        let temp = { ...route.params.info }
        temp.name = name
        temp.email = email
        temp.diet = dietValue == 'none' ? "" : dietValue
        temp.intolerances = groupIntoleranceValues

        route.params.editInfo(temp);
        navigation.navigate('Home');
    };

    const BackAction = () => (
        <TopNavigationAction style={styles.header} icon={BackIcon} onPress={navigateBack} />
    );

    return (
        <Layout style={styles.container}>

            <TopNavigation alignment='center' accessoryLeft={BackAction} />

            <Layout style={styles.row}>
                {/* // Name selection */}
                <Text style ={styles.title} category={'h6'}>NAME:</Text>
                <Input
                style={styles.selectbox}
                    value={name}
                    onChangeText={newName => setName(newName)}
                />
            </Layout>

            <Layout style={styles.row}>
                {/* // Email selection */}
                <Text style ={styles.title} category={'h6'}>EMAIL:</Text>
                <Input
                style={styles.selectbox}
                    value={email}
                    onChangeText={newEmail => setEmail(newEmail)}
                />
            </Layout>

            <Layout style={styles.row}>
                {/* // Diet Selection */}
                <Text style ={styles.title} category={'h6'}>DIET:</Text>
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
                <Text style ={styles.title} category={'h6'}>INTOLERANCES:</Text>
                <Select
                    style={styles.selectbox}
                    multiSelect={true}
                    value={groupIntoleranceValues.join(', ')}
                    selectedIndex={intolIndex}
                    onSelect={index => setIntolIndex(index)}>
                    {dataDanger.map(renderOption)}
                </Select>
            </Layout>


            <Button style={{marginTop:25}} onPress={update}>Save</Button>
        </Layout>
    );
}

export default InfoScreen


const styles = StyleSheet.create({
    header: {
        marginTop: 75,
    },
    title:{
        marginRight:20,
        marginTop: 5,
    },
    selectbox:{
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
});