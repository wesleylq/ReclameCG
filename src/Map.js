import React from 'react';
import {
 
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  
} from 'react-native';

import styles from "./MapStyle"

import MapView, { Marker, ProviderPropType, Callout } from 'react-native-maps';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -7.2420273;
const LONGITUDE = -35.8889979;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      complain: false,
      locationSelected: false,
      markerSelected: false,
      marker: null,      
      search: '',
      bairros: [
        {bairro: 'Alto Branco', latitude: -15.765152,longitude :-48.076059},
        {bairro: 'Nações', latitude: -7.191754, longitude : -35.878152},
      ],
    };
    this.onMapPress = this.onMapPress.bind(this);
    this.markerPress = this.markerPress.bind(this);
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

renderItem = ({ item }) => {
return (
  <TouchableOpacity onPress={() => alert("pressed!")} key={item.bairro}>
    <Text style={{ width: "100%", height: 40, backgroundColor: "white", alignItems: 'center' }}>
      {item.bairro}
    </Text>
  </TouchableOpacity>
);
};

  _onMarkerPress = e => {
    const coordinate = e.nativeEvent.coordinate;
    const marker = this.state.markers.find(
      m => m.coordinate.latitude === coordinate.latitude && m.coordinate.longitude === coordinate.longitude
    );
    if (marker) {
      //this.props.onMarkerPress(marker);
      //console.log(marker)
      this.setState({ markerSelected: true });
      this.setState({ marker: marker });
    }
  };

  handleComplain() {
    this.setState({ complain: !this.state.complain });
    this.setState({ locationSelected: false });
    alert("reclamar!")
  }

  handleCategory(ctg) {
    this.setState({ category: ctg });
    if (ctg == "Água/Esgoto") {
      this.setState({ color: "blue" });
    } else if (ctg == "Energia") {
      this.setState({ color: "yellow" });
    } else if (ctg == "Patrimônio público") {
      this.setState({ color: "red" });
    } else if (ctg == "Infraestrutura") {
      this.setState({ color: "green" });
    }

  }

  generateMarkers(fromCoordinate) {
    const result = [];
    const { latitude, longitude } = fromCoordinate;
    for (let i = 0; i < 1; i++) {
      const newMarker = {
        coordinate: {
          latitude: latitude,
          longitude: longitude,
        },
        key: `id: ${id++}`,
        color: this.state.color,
        category: this.state.category,
        description: this.state.text
      };
      result.push(newMarker);
    }
    return result;
  }

  onMapPress(e) {
    if (this.state.complain && !this.state.locationSelected) {
      this.setState({ marker: e.nativeEvent.coordinate });
      this.setState({ locationSelected: true })
    }

    if(this.state.markerSelected == true){
      this.handleCancel()
    }


  }
  markerPress(e) {

    console.log(e)


  }

  handleConfirm() {
    this.setState({
      markers: [
        ...this.state.markers,
        ...this.generateMarkers(this.state.marker),
      ],
    });
    this.setState({ locationSelected: false })
    this.setState({ complain: false });
    alert("Reclamção registrada!")
  }

  handleCancel() {
    this.setState({ locationSelected: false })
    this.setState({ markerSelected: false })
    this.setState({ complain: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
          onMarkerPress={this._onMarkerPress}
          region={this.state.region }
          //onRegionChange={ region => this.setState({region}) }
          //onRegionChangeComplete={ region => this.setState({region}) }
        >
          {this.state.markers.map(marker => (
            <Marker
              //onPress={this.markerPress(marker.key)}
              title={marker.key}
              //image={flagPinkImg}
              key={marker.key}
              //description={marker.description}
              pinColor={marker.color}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>

        <View style={{ backgroundColor: "grey", height: "20%", width: "100%", position: "absolute" }}>
          <Callout>
            <View style={styles.calloutView}>
            <TextInput
                style={styles.calloutSearch}
                onChangeText={this.handleSearch}
                placeholder={'Pesquisar...'}
                value={this.state.search}
              />            
            </View>
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
                </SafeAreaView></View>
          </Callout>
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.handleComplain()}
            style={styles.bubble}
          >
            <Text>Reclamar</Text>
          </TouchableOpacity>


        </View>
        {
          this.state.locationSelected && <View style={styles.categoryPanel}>
            <Text style={styles.hello}>Aqui vai o endereço!!</Text>
            <Text style={styles.hello}>SELECIONE UMA CATEGORIA</Text>
            <View style={styles.row}>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'green' }]} onPress={() => this.handleCategory("Infraestrutura")}>
                  <View>
                    <Text style={styles.buttomTxt}>Infra</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Infraestrutura</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'blue' }]} onPress={() => this.handleCategory("Água/Esgoto")}>
                  <View>
                    <Text style={styles.buttomTxt}>Água</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Água e Esgoto</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'red' }]} onPress={() => this.handleCategory("Patrimônio público")}>
                  <View>
                    <Text style={styles.buttomTxt}>Patr</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Patrimônio Público</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'yellow' }]} onPress={() => this.handleCategory("Energia")}>
                  <View>
                    <Text style={styles.buttomTxt}>Eletr</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Energia</Text>
              </View>
            </View>
            <TextInput style={styles.description} multiline={true} numberOfLines={3} placeholder="Descrição"
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text} />
            <TouchableOpacity style={styles.confirmButtom} onPress={() => this.handleConfirm()}>
              <Text style={styles.cancelTxt}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButtom} onPress={() => this.handleCancel()}>
              <Text style={styles.cancelTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        }

        {
          this.state.markerSelected &&
          <View style={styles.complaintPanel}>
            <View>
              <Text style={styles.complaintDataLabel}>ID:  </Text>
              <Text style={styles.complaintData}>{this.state.marker.key.substring(4, this.state.marker.key.length)}</Text>
            </View>

            <View>
              <Text style={styles.complaintDataLabel}>Categoria:  </Text>
              <Text style={styles.complaintData}>{this.state.category}</Text>
            </View>

            <View>
              <Text style={styles.complaintDataLabel}>Descrição:  </Text>
              <Text style={styles.complaintData}>{this.state.marker.description}</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};


export default Map;
