import EventsMapLabel from './EventsMapLabel';
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
});

class EventMapView extends Component {

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

  onMapPress = (index) => {
    let events = this.state.events;

    events = this.state.events.map((e, i) => {
      if (i === index) e.color = 'orange'
      else e.color = 'red'
      return e
    })
    this.setState({
      events,
    })
  }

  dataRef = firebaseDb.ref('/nyc').child('events');

  _renderEvent = (event, index) => (
    <MapView.Marker
      coordinate={ { latitude: event.lat, longitude: event.lng } }
      key={ index }
      onPress={ () => this.onMapPress(index) }
      pinColor={ event.color || 'red' }
    >
      <MapView.Callout tooltip={ true } style={ styles.labelView }>
        <EventsMapLabel event={ event } />
      </MapView.Callout>
    </MapView.Marker>
    )

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
          {this.state.events.map((event, i) => this._renderEvent(event, i))}
        </MapView>
      </Container>
    );
  }

}


export { EventMapView as default };
