
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  
} from 'react-native';

import MapView, { Marker, ProviderPropType, Callout } from 'react-native-maps';

let id = 0;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region :{
        latitude: -7.224309,
        longitude: -35.878152,
        latitudeDelta: 0.0225,
        longitudeDelta: 0.0365,
      },
        
      markers: [],
      complain: false,
      locationSelected: false,
      search: '',
      bairros: [
        {bairro: 'Alto Branco', latitude: -15.765152,longitude :-48.076059},
        {bairro: 'Nações', latitude: -7.191754, longitude : -35.878152},
      ],
    };
    
  }

  handleSearch = text => {
    this.setState({search: text});
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  handleSearchFull = (text, latitude, longitude) => {
    this.setState({search: text});
    var regiao  = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0222
    }
    
    this.setState({region: regiao});
  };

  handleComplain() {
    this.setState({complain: !this.state.complain});
    this.setState({locationSelected: false});
    alert('reclamar!');
  }

  generateMarkers(fromCoordinate) {
    const result = [];
    const {latitude, longitude} = fromCoordinate;
    for (let i = 0; i < 1; i++) {
      const newMarker = {
        coordinate: {
          latitude: latitude,
          longitude: longitude,
        },
        key: `Marcação ${id++}`,
      };
      result.push(newMarker);
    }
    return result;
  }

  onMapPress(e) {
    if (this.state.complain) {
      this.setState({
        markers: [
          ...this.state.markers,
          ...this.generateMarkers(e.nativeEvent.coordinate),
        ],
      });
      this.setState({locationSelected: true});
      this.setState({complain: false});
    }
  }

  filteredBairros = () => {
    var encontrou = false
    var bairro = this.state.bairros.filter(i => {
      var str = i.bairro;
      var substr = this.state.search;
      if(str === substr) {
        encontrou = true
      }
        if (str.indexOf(substr) > -1 && str.length >= substr.length && this.state.search !== '') {
          return i;
        }
    });
    if(bairro.length <= 1 &&  encontrou === true) return []
    return bairro;
  };
  

  render() {
    return (
      <View style={styles.container}>
         <MapView
          provider={this.props.provider}
          style={styles.map}
        //  initialRegion={this.state.region}
          onPress={this.onMapPress}
          region={this.state.region }
          onRegionChange={ region => this.setState({region}) }
          onRegionChangeComplete={ region => this.setState({region}) }
        >
          { this.state.markers.map(marker => (
            <Marker
              title={marker.key}
              //image={flagPinkImg}
              key={marker.key}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>
          <Callout >
            <View style={styles.calloutView}>
              <TextInput
                style={styles.calloutSearch}
                onChangeText={this.handleSearch}
                placeholder={'Search'}
                value={this.state.search}
              />
              <View>
                <SafeAreaView>
                {this.filteredBairros().map(i => {
                  return (
                    <TouchableOpacity onPress={() => this.handleSearchFull(i.bairro, i.latitude, i.latitude)} key={i.bairro}>
                      <Text
                        style={{
                          width: '100%',
                          height: 40,
                          backgroundColor: 'white',
                          alignItems: 'center',
                        }}>
                        {i.bairro}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
                </SafeAreaView>
              </View>
            </View>
          </Callout>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.handleComplain()}
            style={styles.bubble}>
            <Text>Reclamar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({markers: []})}
            style={styles.bubble}>
            <Text>Limpar marcadores</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  buttonTouchable: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    position: "absolute", bottom: 0, right: 0
  },
  calloutView: {
    flexDirection: "column",
    
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginTop: 20,
    width: 150,
    marginRight: '30%',
    marginLeft: '30%',
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0  
  }
});

export default Map;