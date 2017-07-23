import EventMapLabel from './EventMapLabel';
import { firebaseDb } from '../proxies/FirebaseProxy';
import MapView from 'react-native-maps';
import {
  StyleSheet,
} from 'react-native';
import {
  Container,
} from 'native-base';
import React, { Component } from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeef0',
  },
  labelView: {
    width: 140,
    height: 100,
  },
});

class EventsMapView extends Component {

  state = {
    events: [],
  };

  componentDidMount() {
    this.dataRef.on('value', (eventsSnapshot) => {
      const events = [];

      eventsSnapshot.forEach((eventSnapshot) => {
        events.push(eventSnapshot.val());
      });

      this.setState({
        events,
      });
    });
  }

  componentWillUnmount() {
    this.dataRef.off();
  }

  dataRef = firebaseDb.ref('/nyc').child('events');

  _onMapPress = (index) => {
    const events = this.state.events.map((event, i) => {
      if (i === index) {
        return Object.assign({}, event, { color: 'orange' });
      }
      return Object.assign({}, event, { color: 'red' });
    });

    this.setState({
      events,
    });
  }

  _renderEvent = (event, index) => (
    <MapView.Marker
      coordinate={ { latitude: event.lat, longitude: event.lng } }
      key={ index }
      onPress={ () => this._onMapPress(index) }
      pinColor={ event.color || 'red' }
    >
      <MapView.Callout style={ styles.labelView } tooltip={ true }>
        <EventMapLabel event={ event } />
      </MapView.Callout>
    </MapView.Marker>
  );

  render() {
    return (
      <Container>
        <MapView
          style={ styles.container }
          showsUserLocation={ true }
          initialRegion={ {
            latitude: 40.7554778,
            longitude: -73.981885,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          } }
        >
          { this.state.events.map((event, index) => this._renderEvent(event, index)) }
        </MapView>
      </Container>
    );
  }

}


export { EventsMapView as default };
