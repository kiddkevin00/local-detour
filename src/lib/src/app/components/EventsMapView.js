import Events from './Events';
import EventDetail from './EventDetail';
import Setting from './Setting';
import MapView from 'react-native-maps';
import {
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import {
  Container,
  Header,
  Segment,
  Content,
  Left,
  Body,
  Right,
  Button,
  Text,
  Icon,
} from 'native-base';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
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
    events: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    auth: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    firebase: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    filteredEvents: [],
    useFilter: false,
    filters: [
      {
        name: 'Today',
        selected: false,
      },
      {
        name: 'Weekend',
        selected: false,
      },
      {
        name: 'This week',
        selected: false,
      },
    ],
    mapRegion: {
      latitude: 40.7554778,
      longitude: -73.981885,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * (Dimensions.get('window').width / Dimensions.get('window').height),
    },
  };

  _renderEvent(event) {
    return (
      <MapView.Marker
        key={ `${event.name}-${event.when.startTimestamp}` }
        coordinate={ event.where.coordinate }
        onPress={ this._onMarkerPress.bind(this, event) }
        pinColor={ event.color || 'red' }
        title={ event.name }
        description={ event.detail }
        onCalloutPress={ this._checkoutEventDetail.bind(this, event) }
      />
    );
  }

  _onFilterSelect(targetFilter) {
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
      filteredEvents = this.props.events.filter((event) => {
        const today = moment();

        // Filters out past events.
        if (today.isAfter(event.when.endTimestamp)) {
          return false;
        }

        if (targetFilter.name === 'Today') {
          return today.isBetween(moment(event.when.startTimestamp), moment(event.when.endTimestamp), null, '[]');
        } else if (targetFilter.name === 'This week') {
          // Filters out the start date of the event after end of the week.
          return !moment(event.when.startTimestamp).isAfter(today, 'isoweek');
        } else if (targetFilter.name === 'Weekend') {
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
    const events = this.props.events.map((event) => {
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
    this.props.navigator.replace({
      component: Events,
    });
  }

  _gotoSetting = () => {
    this.props.navigator.push({
      component: Setting,
    });
  }

  render() {
    const events = this.state.useFilter ? this.state.filteredEvents : this.props.events;
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Header style={ { backgroundColor: '#f96332' } }>
          <Left />
          <Body style={ { flexGrow: 5 } }>
            <Segment style={ { backgroundColor: '#f96332', alignSelf: 'center' } }>
              <Button
                first
                onPress={ this._onFilterSelect.bind(this, this.state.filters[0]) }
                style={ {
                  backgroundColor: this.state.filters[0].selected ? 'white' : '#f96332',
                  borderColor: 'white',
                  paddingLeft: 9,
                  paddingRight: 9,
                } }
              >
                <Text
                  style={ {
                    color: this.state.filters[0].selected ? '#f96332' : 'white',
                    fontSize: 12,
                  } }
                >
                  &nbsp;&nbsp;&nbsp;{ this.state.filters[0].name }&nbsp;&nbsp;&nbsp;
                </Text>
              </Button>
              <Button
                onPress={ this._onFilterSelect.bind(this, this.state.filters[1]) }
                style={ {
                  backgroundColor: this.state.filters[1].selected ? 'white' : '#f96332',
                  borderColor: 'white',
                  paddingLeft: 9,
                  paddingRight: 9,
                } }
              >
                <Text
                  style={ {
                    color: this.state.filters[1].selected ? '#f96332' : 'white',
                    fontSize: 12,
                  } }
                >
                  { this.state.filters[1].name }&nbsp;
                </Text>
              </Button>
              <Button
                last
                onPress={ this._onFilterSelect.bind(this, this.state.filters[2]) }
                style={ {
                  backgroundColor: this.state.filters[2].selected ? 'white' : '#f96332',
                  borderColor: 'white',
                  paddingLeft: 9,
                  paddingRight: 9,
                } }
              >
                <Text
                  style={ {
                    color: this.state.filters[2].selected ? '#f96332' : 'white',
                    fontSize: 12,
                  } }
                >
                  { this.state.filters[2].name }
                </Text>
              </Button>
            </Segment>
          </Body>
          <Right style={ { flexGrow: 2 } }>
            <Button transparent onPress={ this._gotoListView }>
              <Icon style={ { color: 'white' } } name="list" />
            </Button>
          </Right>
        </Header>
        <Content scrollEnabled={ false }>
          <View style={ { height, width } }>
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
              initialRegion={ this.state.mapRegion }
              //onRegionChange={ this._onMapRegionChange }
            >
              { events.map((event, index) => this._renderEvent(event, index)) }
            </MapView>
          </View>
        </Content>
      </Container>
    );
  }

}

export default compose(
  firebaseConnect([
    { path: '/nyc/events' },
  ]),
  connect(
    function mapStateToProps(state) {
      return {
        events: state.firebase.ordered && state.firebase.ordered.nyc &&
          Array.isArray(state.firebase.ordered.nyc.events) ?
          (state.firebase.ordered.nyc.events.map((event) => event.value)) : [],
        auth: state.firebase.auth,
      };
    }
  )
)(EventsMapView);
