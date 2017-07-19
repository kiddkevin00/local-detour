import React from 'react';
import BaseComponent from './common/BaseComponent';
import Map from 'react-native-maps';
import {
  StyleSheet,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeef0',
  },
  filterbar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#4169E1',
  },
  map: {
    width: 100,
    height: 200,
  },
  labelView: {
    width: 140,
    height: 100,
  },
})

class MapView extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container } >
        <Map
          style={ styles.container }
          showsUserLocation
          initialRegion={{
            latitude: 40.7554778,
            longitude: -73.981885,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        </Map>
      </View>
    )
  }
}


export default MapView
