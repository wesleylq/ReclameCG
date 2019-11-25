import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Switch, ScrollView} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class ComplaintPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      anoymous: false,
      description : ''
    };
    coordinates = this.props.navigation.state.params.local;
    
  }


  handleSearch = text => {
    this.setState({description: text});
  };

  submmitComplaint = () => {
    if(this.state.category === ''){
      if(this.state.description === ''){
        complain = {
          coordinate : this.coordinates,
          description : "this.state.description,",
          category : "Agua e esgoto"
        }
     
        complains = this.props.navigation.state.params.complains;
        this.props.navigation.navigate('Home', {
          complains : complain
        });
   
        
      }
    }
  }




  
  render() {
    return (
      <ScrollView>
      <View style={styles.main}>
        <View style={styles.categoryPanel}>
          <Text style={styles.hello}>Aqui vai o endereço: {this.props.navigation.state.params.local.latitude}</Text>
          <Text style={styles.hello}>SELECIONE UMA CATEGORIA</Text>

          <TextInput style={styles.description} multiline={true} numberOfLines={3}  onChangeText={this.handleSearch}
                placeholder={'Descrição'}
                value={this.state.description}/>

          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity 
                style={[styles.ctgButtom, {backgroundColor:  'green'}]}
                onPress={() => this.setState({category: 'Infraestrutura'})}    
              >
                <View>
                  <Text style={styles.buttomTxt}>Infra</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.buttomLabel}>Infraestrutura</Text> 
            </View>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity 
                style={[styles.ctgButtom, {backgroundColor:  'blue'}]}
                onPress={() => this.setState({category: 'Água e Esgoto'})}
              >
                <View>
                  <Text style={styles.buttomTxt}>Água</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.buttomLabel}>Água e Esgoto</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity
                style={[styles.ctgButtom, {backgroundColor:  'red'}]}
                onPress={() => this.setState({category: 'Patrimônio Público'})}
              >
                <View>
                  <Text style={styles.buttomTxt}>Patr</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.buttomLabel}>Patrimônio Público</Text>
            </View>
              <View style={{flexDirection: 'column'}}>
                <TouchableOpacity
                  style={[styles.ctgButtom, {backgroundColor:  'yellow'}]}
                  onPress={() => this.setState({category: 'Energia'})}    
                >
                  <View>
                    <Text style={styles.buttomTxt, styles.energ}>Energ</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Energia</Text>
              </View>
          </View>
          <Text style={styles.selectedCategory}>Você selecionou a categoria: {'\n'} {this.state.category}</Text>
          <View style={styles.anoymous}>
            <Text>Não se identificar</Text>
            <Switch value={this.state.anoymous} onValueChange={() => this.setState({anoymous: !this.state.anoymous})}/>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButtom} onPress={() => this.submmitComplaint()}>
          <Text style={styles.cancelTxt}>Confirmar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButtom} onPress={() => this.props.navigation.navigate('Home', {
          local: this.state.local
        })}>
          <Text style={styles.cancelTxt}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }

  printRegion() {
    alert(this.props.navigation.state.params.local.latitude);
  }

}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1
    },
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
        paddingHorizontal: 30
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
    energ: {
        color: 'black',
        fontWeight: 'bold'
    },
    forgotPsswd: {
        color: 'gray',
        alignSelf: 'center'
    },
    buttomLabel: {
        alignSelf: 'center',
        fontSize: 12
    },
    description: {
        borderWidth: 1,
        borderColor: 'black',
        textAlignVertical: 'top',
        marginTop: 40,
        marginBottom: 40         
    },
    selectedCategory: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: "center"
    },
    anoymous: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cancelButtom: {
        backgroundColor: 'red',
        width: 230,
        paddingVertical: 10,
        alignSelf: 'center',
        borderRadius: 5
    },
    confirmButtom: {
        backgroundColor: 'green',
        width: 230,
        paddingVertical: 10,
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 15
    },
    cancelTxt: {
        textAlign: 'center',
        color: 'white'
    }
});