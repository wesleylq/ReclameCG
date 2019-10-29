import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class ComplaintPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return (
            <View style={styles.categoryPanel}>
                <Text style={styles.hello}>Aqui vai o endereço!!</Text>
                <Text style={styles.hello}>SELECIONE UMA CATEGORIA</Text>
                <View style={styles.row}>
                    <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity style={[styles.ctgButtom, {backgroundColor:  'green'}]}>
                            <View>
                                <Text style={styles.buttomTxt}>Infra</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.buttomLabel}>Infraestrutura</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity style={[styles.ctgButtom, {backgroundColor:  'blue'}]}>
                            <View>
                                <Text style={styles.buttomTxt}>Água</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.buttomLabel}>Água e Esgoto</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity style={[styles.ctgButtom, {backgroundColor:  'red'}]}>
                            <View>
                                <Text style={styles.buttomTxt}>Patr</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.buttomLabel}>Patrimônio Público</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity style={[styles.ctgButtom, {backgroundColor:  'yellow'}]}>
                            <View>
                                <Text style={styles.buttomTxt}>Eletr</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.buttomLabel}>Energia</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    hello: {
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10
    },
    categoryPanel: {
        backgroundColor: 'white',
        marginHorizontal: 25,
        paddingTop: 50,
        paddingBottom: 30,
        borderRadius: 25,
        width: 330,
        paddingHorizontal: 30,
        position: 'absolute',
        bottom: 0
    },
    ctgButtom: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginVertical: 20,
        marginHorizontal: 30,
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
    },
    buttomLabel: {
        alignSelf: 'center',
        fontSize: 12
    }
});