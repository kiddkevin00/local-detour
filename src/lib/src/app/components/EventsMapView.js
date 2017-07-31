import EventDetail from './EventDetail';
import { firebaseDb } from '../proxies/FirebaseProxy';
import MapView from 'react-native-maps';
import moment from 'moment';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Button,
  Text,
} from 'native-base';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  /// Uncomments the lines below when using custom callout.
  //eventMapCallout: {
  //  width: 140,
  //  height: 100,
  //},
});

class EventsMapView extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    events: [],
    filteredEvents: [],
    useFilter: false,
    filters: [
      {
        name: 'This Week',
        selected: false,
      },
      {
        name: 'Today',
        selected: false,
      },
      {
        name: 'This Weekend',
        selected: false,
      },
    ],
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

  _renderEvent(event, index) {
    return (
      <MapView.Marker
        key={ index }
        coordinate={ event.where.coordinate }
        onPress={ this._onMarkerPress.bind(this, event) }
        pinColor={ event.color || 'red' }
        title={ event.name }
        description={ event.description }
        onCalloutPress={ this._checkoutEventDetail }
      />
    );
  }

  _onSelectFilter(targetFilter) {
    let useFilter = this.state.useFilter;
    const filters = this.state.filters.map((filter) => {
      if (filter === targetFilter) {
        if (filter.selected === true) {
          useFilter = false;
        } else {
          useFilter = true;
        }

        return Object.assign({}, filter, { selected: !filter.selected });
      }
      return Object.assign({}, filter, { selected: false });
    });
    let filteredEvents = [];

    if (useFilter) {
      filteredEvents = this.state.events.filter((event) => {
        const today = moment();

        // Filters out past events.
        if (today.isAfter(event.endTimestamp)) {
          return false;
        }

        if (targetFilter.name === 'Today') {
          return today.isBetween(moment(event.when.startTimestamp), moment(event.when.endTimestamp), null, '[]');
        } else if (targetFilter.name === 'This Week') {
          // Filters out the start date of the event after end of the week.
          return !moment(event.when.startTimestamp).isAfter(today, 'week');
        } else if (targetFilter.name === 'This Weekend') {
          // Filters out the start date of the event after end of the weekend.

          // eslint-disable-next-line newline-per-chained-call
          return !moment().week(today.isoWeek()).day('Saturday').hour(0).minute(0).second(0).isAfter(event.when.endTimestamp) &&
            !moment(event.when.startTimestamp).isAfter(today, 'week');
        }
        return false;
      });
    }

    this.setState({
      useFilter,
      filters,
      filteredEvents,
    });
  }

  _onMarkerPress(targetEvent) {
    const events = this.state.events.map((event) => {
      if (event === targetEvent) {
        return Object.assign({}, event, { color: 'orange' });
      }
      return Object.assign({}, event, { color: 'red' });
    });

    this.setState({
      events,
    });
  }

  _checkoutEventDetail = (event) => {
    this.props.navigator.push({
      title: 'Event Detail',
      component: EventDetail,
      passProps: { event },
    });
  }

  render() {
    const events = this.state.useFilter ? this.state.filteredEvents : this.state.events;
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    return (
      <Container>
        <Header style={ { marginTop: 64, paddingTop: -15, backgroundColor: '#f4f7f9' } }>
          <Left>
            <Button
              bordered
              info
              small
              style={ { borderColor: '#A9A9A9', backgroundColor: this.state.filters[0].selected ? '#00CED1' : 'white', marginRight: 5 } }
              onPress={ this._onSelectFilter.bind(this, this.state.filters[0]) }
            >
              <Text style={ { color: '#A9A9A9' } }>{ this.state.filters[0].name }</Text>
            </Button>
          </Left>
          <Body>
            <Button
              bordered
              info
              small
              style={ { borderColor: '#A9A9A9', backgroundColor: this.state.filters[1].selected ? '#00CED1' : 'white', marginRight: 5 } }
              onPress={ this._onSelectFilter.bind(this, this.state.filters[1]) }
            >
              <Text style={ { color: '#A9A9A9' } }>{ this.state.filters[1].name }</Text>
            </Button>
          </Body>
          <Right>
            <Button
              bordered
              info
              small
              style={ { borderColor: '#A9A9A9', backgroundColor: this.state.filters[2].selected ? '#00CED1' : 'white', marginRight: 5 } }
              onPress={ this._onSelectFilter.bind(this, this.state.filters[2]) }
            >
              <Text style={ { color: '#A9A9A9' } }>{ this.state.filters[2].name }</Text>
            </Button>
          </Right>
        </Header>
        <Content scrollEnabled={ false }>
          <View style={ { width, height } }>
            <MapView
              style={ styles.map }
              provider={ null }
              followsUserLocation={ false }
              showsScale={ true }
              showsCompass={ true }
              zoomEnabled={ true }
              rotateEnabled={ true }
              scrollEnabled={ true }
              loadingEnabled={ true }
              loadingBackgroundColor={ 'orange' }
              showsUserLocation={ true }
              region={ {
                latitude: 40.7554778,
                longitude: -73.981885,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922 * ratio,
              } }
            >
              { events.map((event, index) => this._renderEvent(event, index)) }
            </MapView>
          </View>
        </Content>
      </Container>
    );
  }

}


export { EventsMapView as default };
