import EventsMapLabel from './EventsMapLabel';
import { firebaseDb } from '../proxies/FirebaseProxy';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  Container,
  Button
} from 'native-base';
import React, { Component } from 'react';
import moment from 'moment';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeef0',
  },
  filterbar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 20
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
    filters: [{
      name: 'Today',
      selected: false
    },
    {
      name: 'This Week',
      selected: false
    },
    {
      name: 'This Weekend',
      selected: false
    }]
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

  _renderFilter = (filter, i) => (
    <Button bordered info small key={ i } onPress={ () => this.onSelectFilter(filter, i) } style={ { borderColor: '#A9A9A9', backgroundColor: filter.selected ? '#00CED1' : 'white', marginRight: 5, padding: -8 } }>
      <Text style={ { color: '#A9A9A9' } }>{filter.name}</Text>
    </Button>
  )
  /* TODO: RESET events when click again */
  onSelectFilter = (filter, index) => {
    let { filters, events } = this.state;

    filters = this.state.filters.map((f, i) => {
      if (i === index) f.selected = !f.selected;
      else f.selected = false;
      return f
    })
    events = this.state.events.filter((e) => {
      if (!e.endDate) return true;
      const today = moment();

      if (filter.name === 'Today') {
        return today.isSame(e.endDate, 'year') && today.isSame(e.endDate, 'month') && today.isSame(e.endDate, 'day');
      } else if (filter.name === 'This Week') {
        const currentDay = moment().day();
        const weekStart = today.subtract(currentDay || 6, 'day');
        const weekEnd = today.add(1, 'day');
        return moment(e.endDate).isBetween(weekStart, weekEnd);
      } else if (filter.name === 'This Weekend') {

      } else return true;
    })
    this.setState({
      filters,
      events
    })
  }

  render() {
    const { filters } = this.state;

    return (
      <Container>
        <View
          style={ styles.filterbar }
        >
          {filters.map((filter, i) => this._renderFilter(filter, i))}
        </View>
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
