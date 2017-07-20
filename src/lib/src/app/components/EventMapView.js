import Map from 'react-native-maps';
import BaseComponent from './common/BaseComponent';
import {
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeef0',
  },
  filterbar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
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

class EventMapView extends BaseComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container } >
        <Map
          style={ styles.container }
          showsUserLocation={ true }
          initialRegion={ {
            latitude: 40.7554778,
            longitude: -73.981885,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          } }
        />
      </View>
    )
  }

}


export default EventMapView
