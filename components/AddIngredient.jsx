import React, { useState } from 'react'
import { Input, Layout, Button, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const AddIngredient = ({ onAdd }) => {
    
    const [value, setValue] = useState('')
    const AddIcon = (props) => (
        <Icon {...props} name='plus-circle' />
    );
    
    const onSubmit= (e) => {
        e.preventDefault();

        if(!value){
            alert("Please enter an ingredient!")
            return
        }

        onAdd(value.toLowerCase())
        setValue('')
    }
    
    return (
        <Layout style={styles.row}>
            <Input
                style={{marginRight:10, flex:3}}
                placeholder='New Favorite Ingredient'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
            />
            <Button 
                style={{marginRight:10, flex:1}}
                accessoryRight={AddIcon} onPress={onSubmit}>
                ADD
            </Button>        
        </Layout>

    );

}

export default AddIngredient

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15,
        alignItems: 'center',
    },
})