import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", senha: "" }
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.hello}>Olá, amigo!</Text>
                <View style={styles.loginPanel}>
                    <TextInput style={styles.input} placeholder="Email" />
                    <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
                    <TouchableOpacity style={styles.loginButtom}>
                        <View>
                            <Text style={styles.buttomTxt}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.forgotPsswd}>
                        <Text style={{color: 'gray'}}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center'
    },
    hello: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 30
    },
    input: {
        height: 45,
        fontSize: 14,
        backgroundColor: 'transparent',
        width: 310,
        marginVertical: 10,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black'    
    },
    loginPanel: {
        backgroundColor: 'white',
        marginHorizontal: 25,
        marginVertical: 20,
        paddingTop: 50,
        paddingBottom: 30,
        borderRadius: 25   
    },
    loginButtom: {
        width: 230,
        backgroundColor: 'gray',
        height: 50,
        borderRadius: 30,
        marginVertical: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttomTxt: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        letterSpacing: 1
    },
    forgotPsswd: {
        color: 'gray',
        alignSelf: 'center'
    }
});