import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
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
      locationSelected: false
    };

    this.onMapPress = this.onMapPress.bind(this);
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
    if (this.state.complain && !this.state.markers.length) {
      this.setState({
        markers: [
          ...this.state.markers,
          ...this.generateMarkers(e.nativeEvent.coordinate),
        ],
      });
      this.setState({locationSelected: true})
    }
    else {
      this.setState({locationSelected: false})
      this.setState({markers: []})
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
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

        <View style={{backgroundColor:"grey", height:"20%", width:"100%"}}>
        <Callout>
            <View style={styles.calloutView}>
              <TextInput style={styles.calloutSearch}
                placeholder={"Search"}
              />
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
        {
          this.state.locationSelected && <ComplaintPanel></ComplaintPanel>
        } 
      </View>
    );
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
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
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
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