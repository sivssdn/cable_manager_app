import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Profile extends React.Component {

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.header}>WELCOME</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00bfff',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },

});