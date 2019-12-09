import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';

import styles from './MapStyle';

import MapView, {Marker, ProviderPropType, Callout} from 'react-native-maps';
// import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('window');

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
        {bairro: 'Alto Branco', latitude: -7.204477,longitude :-35.880006},
        {bairro: 'Nações', latitude: -7.191754, longitude : -35.878152},
        {bairro: 'Jardim Continental', latitude: -7.195604, longitude : -35.892032},
        {bairro: 'Jeremias', latitude: -7.203331, longitude : -35.899392},
        {bairro: 'Palmeira', latitude: -7.209079, longitude : -35.893598},
        {bairro: 'Monte Santo', latitude: -7.211506, longitude : -35.900250},
        {bairro: 'Conceição', latitude: -7.211889, longitude : -35.886260},
        {bairro: 'Lauritzen', latitude: -7.212059, longitude : -35.880037},
        {bairro: 'Castelo Branco', latitude: -7.213848, longitude : -35.865746},
        {bairro: 'Nova Brasilia', latitude: -7.216274, longitude : -35.858451},
        {bairro: 'Monte Castelo', latitude: -7.220574, longitude : -35.864631},
        {bairro: 'José Pinheiro', latitude: -7.225215, longitude : -35.871283},
        {bairro: 'Catolé', latitude: -7.232382, longitude : -35.880867},
        {bairro: 'Liberdade', latitude: -7.236682, longitude : -35.893613},
        {bairro: 'Jardin Quarenta', latitude: -7.231066, longitude : -35.897777},
        {bairro: 'Santa Rosa', latitude: -7.233961, longitude : -35.906618},
        {bairro: 'Centenario', latitude: -7.228171, longitude : -35.906188},
        {bairro: 'Pedregal', latitude: -7.223678, longitude : -35.907585},
        {bairro: 'Bodocongó', latitude: -7.218824, longitude : -35.916898},
        {bairro: 'Ramadinha', latitude: -7.219293, longitude : -35.927541},
        {bairro: 'Santa Cruz', latitude: -7.242155, longitude : -35.908272},
      ],
    };
    this.onMapPress = this.onMapPress.bind(this);
    this.markerPress = this.markerPress.bind(this);
  }

  handleSearch = text => {
    this.setState({search: text});
  };

  onRegionChange(region) {
    this.setState({region});
  }
  handleSearchFull = (text, latitude, longitude) => {
    this.setState({search: text});
    var regiao = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0222,
    };

    this.setState({region: regiao});
  };

  filteredBairros = () => {
    var encontrou = false;
    var bairro = this.state.bairros.filter(i => {
      var str = i.bairro;
      var substr = this.state.search;
      if (str === substr) {
        encontrou = true;
      }
      if (
        str.indexOf(substr) > -1 &&
        str.length >= substr.length &&
        this.state.search !== ''
      ) {
        return i;
      }
    });
    if (bairro.length <= 1 && encontrou === true) return [];
    return bairro;
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => alert('pressed!')} key={item.bairro}>
        <Text
          style={{
            width: '100%',
            height: 40,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          {item.bairro}
        </Text>
      </TouchableOpacity>
    );
  };

  _onMarkerPress = e => {
    const coordinate = e.nativeEvent.coordinate;
    const marker = this.state.markers.find(
      m =>
        m.coordinate.latitude === coordinate.latitude &&
        m.coordinate.longitude === coordinate.longitude,
    );
    if (marker) {
      //this.props.onMarkerPress(marker);
      //console.log(marker)
      this.setState({markerSelected: true});
      this.setState({marker: marker});
    }
  };

  handleComplain() {
    this.setState({complain: !this.state.complain});
    this.setState({locationSelected: false});
    Alert.alert(
      'Quer reclamar?',
      'Selecione no mapa o local da reclamação. Logo o mais, preencha os detalhes...',
      [{text: 'Entendi', onPress: () => console.log('OK Pressed')}],
    );
  }

  handleCategory(ctg) {
    this.setState({category: ctg});
    if (ctg == 'Água/Esgoto') {
      this.setState({color: 'blue'});
    } else if (ctg == 'Energia') {
      this.setState({color: 'yellow'});
    } else if (ctg == 'Patrimônio público') {
      this.setState({color: 'red'});
    } else if (ctg == 'Infraestrutura') {
      this.setState({color: 'green'});
    }
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
        key: `id: ${id++}`,
        color: this.state.color,
        category: this.state.category,
        description: this.state.text,
      };
      result.push(newMarker);
    }
    return result;
  }

  onMapPress(e) {
    if (this.state.complain && !this.state.locationSelected) {
      this.setState({marker: e.nativeEvent.coordinate});
      this.setState({locationSelected: true});
    }

    if (this.state.markerSelected == true) {
      this.handleCancel();
    }
  }
  markerPress(e) {
    console.log(e);
  }

  handleConfirm() {
    this.setState({
      markers: [
        ...this.state.markers,
        ...this.generateMarkers(this.state.marker),
      ],
    });
    this.setState({locationSelected: false});
    this.setState({complain: false});
    Alert.alert(
      'Sucesso!',
      'Reclamação registrada! Um chamado foi aberto e estaremos analisando o problema. Continue colaborando!',
      [{text: 'Voltar ao mapa', onPress: () => console.log('OK Pressed')}],
    );
  }

  handleCancel() {
    this.setState({locationSelected: false});
    this.setState({markerSelected: false});
    this.setState({complain: false});
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
          region={this.state.region}
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

        <View style={styles.topBar}>
          <Callout style={styles.callout}>
            <View style={styles.calloutView}>
              <TextInput
                style={styles.calloutSearch}
                placeholder={'Pesquise aqui...'}
                onChangeText={this.handleSearch}
                value={this.state.search}
              />
            </View>
            <View>
              <SafeAreaView>
                {this.filteredBairros().map(i => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.handleSearchFull(i.bairro, i.latitude, i.latitude)
                      }
                      key={i.bairro}>
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
                  );
                })}
              </SafeAreaView>
            </View>
          </Callout>
        </View>

        <View style={styles.floatButtonContainer}>
          <TouchableOpacity
            onPress={() => this.handleComplain()}
            style={styles.floatButton}>
            <Text style={styles.floatButtonText}>!</Text>
          </TouchableOpacity>
        </View>
        {this.state.locationSelected && (
          <View style={styles.categoryPanel}>
            <Text style={styles.modalTitle}>Endereço selecionado...</Text>
            <Text style={styles.modalDescription}>SELECIONE UMA CATEGORIA</Text>
            <View style={styles.categoryContainer}>
              <View style={styles.row}>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => this.handleCategory('Infraestrutura')}>
                    <Image
                      source={require('../assets/images/roller.png')}
                      style={styles.images}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonLabel}>Infraestrutura</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => this.handleCategory('Água/Esgoto')}>
                    <Image
                      source={require('../assets/images/drop.png')}
                      style={styles.images}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonLabel}>Água e Esgoto</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => this.handleCategory('Patrimônio público')}>
                    <Image
                      source={require('../assets/images/city-hall.png')}
                      style={styles.images}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonLabel}>Patrimônio Público</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => this.handleCategory('Energia')}>
                    <Image
                      source={require('../assets/images/light-bulb.png')}
                      style={styles.images}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonLabel}>Energia</Text>
                </View>
              </View>
            </View>
            <View style={styles.boxDescription}>
              <TextInput
                style={styles.description}
                multiline={true}
                numberOfLines={3}
                placeholder="Descreva melhor o problema..."
                onChangeText={text => this.setState({text})}
                value={this.state.text}
              />
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.handleConfirm()}>
              <Text style={styles.buttonText}>CONFIRMAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.handleCancel()}>
              <Text style={styles.buttonText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.markerSelected && (
          <View style={styles.complaintPanel}>
            <View>
              <Text style={styles.complaintDataLabel}>ID da reclamação </Text>
              <Text style={styles.complaintData}>
                {this.state.marker.key.substring(
                  4,
                  this.state.marker.key.length,
                )}
              </Text>
            </View>

            <View>
              <Text style={styles.complaintDataLabel}>Categoria </Text>
              <Text style={styles.complaintData}>{this.state.category}</Text>
            </View>

            <View>
              <Text style={styles.complaintDataLabel}>Descrição </Text>
              <Text style={styles.complaintData}>
                {this.state.marker.description}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};

export default Map;
