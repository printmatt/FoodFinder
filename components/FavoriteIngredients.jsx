import { Layout, Button, Icon, List, ListItem } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native';


const FavoriteIngredients = ({ favorites, onDelete, onSelect, onGenerate }) => {
    useEffect(() => {
        
    }, [favorites])
    
    const TrashIcon = (props) => (
        <Icon {...props} name='trash-2' />
    );
    const StarIcon = (props) => (
        <Icon {...props} name='star' />
    );

    const renderItemAccessory = (props) => (
        <Button style={styles.button} onPress={()=>{onDelete(props.item.title,props.index)}}
         appearance='ghost' status='warning' accessoryLeft={TrashIcon} />
    );

    const renderItemIcon = (props) => (
        <Icon {...props} fill={props.item.selected?'#fb3958':"white"} name='heart' />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            onPress={() => {onSelect(index)}}
            title={`${item.title.toUpperCase()}`}
            accessoryLeft={renderItemIcon({item})}
            accessoryRight={renderItemAccessory({item,index})}
        />
    );

    return (
        <Layout>
            <Button 
                onPress={() => {onGenerate("beef,garlic")}}
                style={styles.generate} status='success' accessoryRight={StarIcon}>
                GENERATE RECIPES
            </Button>            
            <List
                style={styles.container}
                data={favorites}
                renderItem={renderItem}
            />
        </Layout>

    );

}

export default FavoriteIngredients

const styles = StyleSheet.create({
    container: {
        maxHeight: 300,

    },
    generate:{
        backgroundColor: "#22303C"
    },
    button: {
        margin: 2,
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        fontSize: 15
    }
});