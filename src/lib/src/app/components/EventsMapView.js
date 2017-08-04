import Events from './Events';
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
  Segment,
  Content,
  Left,
  Body,
  Right,
  Title,
  Grid,
  Row,
  Button,
  Text,
  Icon,
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
    mapRegion: {
      latitude: 40.7554778,
      longitude: -73.981885,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * (Dimensions.get('window').width / Dimensions.get('window').height),
    },
    showMapView: true,
  };

  componentDidMount() {
    this.dataRef.on('value', (eventsSnapshot) => {
      const events = [];

      eventsSnapshot.forEach((eventSnapshot) => {
        const event = eventSnapshot.val();
        const today = moment();

        if (today.isBefore(event.when.endTimestamp)) {
          events.push(event);
        }
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
        onCalloutPress={ this._checkoutEventDetail.bind(this, event) }
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
        if (today.isAfter(event.when.endTimestamp)) {
          return false;
        }

        if (targetFilter.name === 'Today') {
          return today.isBetween(moment(event.when.startTimestamp), moment(event.when.endTimestamp), null, '[]');
        } else if (targetFilter.name === 'This Week') {
          // Filters out the start date of the event after end of the week.
          return !moment(event.when.startTimestamp).isAfter(today, 'isoweek');
        } else if (targetFilter.name === 'This Weekend') {
          // Filters out the start date of the event after end of the weekend.

          // eslint-disable-next-line newline-per-chained-call
          const thisSaturday = moment().week(today.isoWeek()).day('Saturday').hour(0).minute(0).second(0);

          return !thisSaturday.isAfter(event.when.endTimestamp) &&
            !moment(event.when.startTimestamp).isAfter(today, 'isoweek');
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
      component: EventDetail,
      passProps: { event },
    });
  }

  _onMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  }

  _gotoListView = () => {
    this.setState({ showMapView: false });

    this.props.navigator.push({
      component: Events,
    });
  }

  render() {
    const events = this.state.useFilter ? this.state.filteredEvents : this.state.events;
    const { width, height } = Dimensions.get('window');

    return (
      <Container>
        <Header hasSegment>
          <Left />
          <Body>
            <Title>Local Detour</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="settings" />
            </Button>
          </Right>
        </Header>
        <Segment>
          <Button first active={ !this.state.showMapView } onPress={ this._gotoListView }>
            <Text>List View</Text>
          </Button>
          <Button last active={ this.state.showMapView }>
            <Text>Map View</Text>
          </Button>
        </Segment>
        <Content scrollEnabled={ false }>
          <Grid>
            <Row style={ { } }>
              <Left>
                <Button
                  full
                  bordered
                  small
                  style={ { borderColor: '#A9A9A9', backgroundColor: this.state.filters[0].selected ? '#00CED1' : 'white' } }
                  onPress={ this._onSelectFilter.bind(this, this.state.filters[0]) }
                >
                  <Text style={ { color: '#A9A9A9' } }>{ this.state.filters[0].name }</Text>
                </Button>
              </Left>
              <Body>
                <Button
                  full
                  bordered
                  small
                  style={ { borderColor: '#A9A9A9', backgroundColor: this.state.filters[1].selected ? '#00CED1' : 'white' } }
                  onPress={ this._onSelectFilter.bind(this, this.state.filters[1]) }
                >
                  <Text style={ { color: '#A9A9A9' } }>{ this.state.filters[1].name }</Text>
                </Button>
              </Body>
              <Right>
                <Button
                  full
                  bordered
                  small
                  style={ { borderColor: '#A9A9A9', backgroundColor: this.state.filters[2].selected ? '#00CED1' : 'white' } }
                  onPress={ this._onSelectFilter.bind(this, this.state.filters[2]) }
                >
                  <Text style={ { color: '#A9A9A9', fontSize: 13 } }>{ this.state.filters[2].name }</Text>
                </Button>
              </Right>
            </Row>
            <Row>
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
                  loadingBackgroundColor={ '#f96332' }
                  showsUserLocation={ true }
                  region={ this.state.mapRegion }
                  onRegionChange={ this._onMapRegionChange }
                >
                  { events.map((event, index) => this._renderEvent(event, index)) }
                </MapView>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }

}


export { EventsMapView as default };
