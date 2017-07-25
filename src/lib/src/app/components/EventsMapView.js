import EventMapLabel from './EventMapLabel';
import EventMapLabel2 from './EventMapLabel2';
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
  mapContainer: {
    flex: 1,
    backgroundColor: '#ebeef0',
    paddingTop: 50,
  },
  filterbar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 20
  },
  labelView: {
    width: 140,
    height: 100,
  },
});

class EventsMapView extends Component {

  state = {
    events: [],
    filterEvents: [],
    useFilter: false,
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

  _renderFilter = (filter, index) => (
    <Button bordered info small key={ index } onPress={ () => this.onSelectFilter(filter, index) } style={ { borderColor: '#A9A9A9', backgroundColor: filter.selected ? '#00CED1' : 'white', marginRight: 5, padding: -8 } }>
      <Text style={ { color: '#A9A9A9' } }>{filter.name}</Text>
    </Button>
  )
  /* TODO: Weekend, RESET events when click again */
  onSelectFilter = (filter, index) => {
    let useFilter = this.state.useFilter;
    const filters = this.state.filters.map((f, i) => {
      if (i === index) {
        if (f.selected === true) useFilter = false;
        else useFilter = true;
        f.selected = !f.selected;
      }
      else f.selected = false;
      return f;
    });
    let filterEvents = [];

    if (useFilter) {
      filterEvents = this.state.events.filter((e) => {
        if (!e.endDate) return true;

        if (filter.name === 'Today') {
          const today = moment();

          return today.isSame(e.endDate, 'year') && today.isSame(e.endDate, 'month') && today.isSame(e.endDate, 'day');
        } else if (filter.name === 'This Week') {
          const currentDay = moment().day();
          const weekStart = moment().subtract(currentDay || 7, 'day');
          const weekEnd = moment().add(7 - (currentDay || 7), 'day');

          return moment(e.endDate).isBetween(weekStart, weekEnd);
        } else if (filter.name === 'This Weekend') {
          const currentDay = moment().day() || 7;
          const weekendStart = (currentDay >= 5) ? moment().subtract(currentDay - 5, 'day') : moment().add(5 - currentDay, 'day');
          const weekendEnd = (currentDay >= 7) ? moment().subtract(currentDay - 7, 'day') : moment().add(7 - currentDay, 'day');

          return moment(e.endDate).isBetween(weekendStart, weekendEnd);
        } else return true;
      })
    }
    this.setState({
      filters,
      filterEvents,
      useFilter
    })
  }

  render() {

    const events = this.state.useFilter ? this.state.filterEvents : this.state.events

    return (
      <Container>
        <View
          style={ styles.filterbar }
        >
          { this.state.filters.map((filter, index) => this._renderFilter(filter, index))}
        </View>
        <MapView
          style={ styles.mapContainer }
          showsUserLocation={ true }
          initialRegion={ {
            latitude: 40.7554778,
            longitude: -73.981885,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          } }
        >
          { events.map((event, index) => this._renderEvent(event, index)) }
        </MapView>
      </Container>
    );
  }

}


export { EventsMapView as default };
