import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Button
  
} from 'react-native';

import MapView, { Marker, ProviderPropType, Callout } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import flagPinkImg from './assets/flag-pink.png';
import ComplaintPanel from './ComplaintPanel';

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
      complain:false,
      locationSelected: false,
      search: '-',
      search2: '',
      count: 0,
      bairros: [{bairro : 'A', id: 1},  {bairro: 'Aaa', id : 2}]
    };
    this.onMapPress = this.onMapPress.bind(this);
  }


  handleSearch = (text) => {
    this.setState({ search: text })
 }

  handleComplain(){
    this.setState({ complain: !this.state.complain});
    this.setState({ locationSelected: false});
    alert("reclamar!")
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
      this.setState({locationSelected: true})
      this.setState({complain: false})
    }   
  }

  filteredBairros = () => {
    var bairro = this.state.bairros.filter( i => {
      var str = i.bairro
      var substr = this.state.search
      if((str.indexOf(substr) > -1) && str.length >= substr.length ){
        return i
      }
    })
    
    return bairro
  }

renderItem = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => alert("pressed!")} key={item.bairro}>
      <Text style={{ width: "100%", height: 40, backgroundColor: "white", alignItems: 'center' }}>
        {item.bairro}
      </Text>
    </TouchableOpacity>
  );
};
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:"grey", height:"20%", width:"100%", position: "absolute"}}>
        <Callout>
            <View style={styles.calloutView}>
              <TextInput style={styles.calloutSearch} onChangeText = {this.handleSearch}
                placeholder={"Search"}
              />
              <View>
                <SafeAreaView >
               
                  <FlatList
                    data={this.filteredBairros()}
                    renderItem={this.renderItem}
                   // renderItem={({ item }) => <Item item={item.bairro}/>}
                    keyExtractor={item => item.bairro}
                  />
                </SafeAreaView>
              </View>
              {console.log(this.state.count)}
            </View>
          </Callout>
        </View>
        
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.handleComplain()}
            style={styles.bubble}
          >
            <Text>Reclamar</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
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