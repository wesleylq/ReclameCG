import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
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
      marker: null
    };
    this.onMapPress = this.onMapPress.bind(this);
    this.markerPress = this.markerPress.bind(this);
  }

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
    if (ctg == "agua") {
      this.setState({ color: "blue" });
    } else if (ctg == "eletr") {
      this.setState({ color: "yellow" });
    } else if (ctg == "patr") {
      this.setState({ color: "red" });
    } else if (ctg == "infra") {
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
        >
          {this.state.markers.map(marker => (
            <Marker
              //onPress={this.markerPress(marker.key)}
              title={marker.key}
              //image={flagPinkImg}
              key={marker.key}
              description={marker.description}
              pinColor={marker.color}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>

        <View style={{ backgroundColor: "grey", height: "20%", width: "100%" }}>
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


        </View>
        {
          this.state.locationSelected && <View style={styles.categoryPanel}>
            <Text style={styles.hello}>Aqui vai o endereço!!</Text>
            <Text style={styles.hello}>SELECIONE UMA CATEGORIA</Text>
            <View style={styles.row}>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'green' }]} onPress={() => this.handleCategory("infra")}>
                  <View>
                    <Text style={styles.buttomTxt}>Infra</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Infraestrutura</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'blue' }]} onPress={() => this.handleCategory("agua")}>
                  <View>
                    <Text style={styles.buttomTxt}>Água</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Água e Esgoto</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'red' }]} onPress={() => this.handleCategory("patr")}>
                  <View>
                    <Text style={styles.buttomTxt}>Patr</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.buttomLabel}>Patrimônio Público</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={[styles.ctgButtom, { backgroundColor: 'yellow' }]} onPress={() => this.handleCategory("eletr")}>
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
          <View style={styles.categoryPanel}>
            <Text style={styles.hello}>{this.state.marker.key}</Text>
            <Text style={styles.hello}>{this.state.marker.description}</Text>
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