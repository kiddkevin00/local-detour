import EventMapView from './EventsMapView';
import EventDetail from './EventDetail';
import PushNotificationPermReq from './PushNotificationPermReq';
import Setting from './Setting';
import CalendarEvents from '../utils/CalendarEvents';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Title,
  Button,
  Text,
  Icon,
} from 'native-base';
import {
  Alert,
  Share,
  AsyncStorage,
  Image,
  Dimensions,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


class Events extends Component {

  static propTypes = {
    events: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    auth: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    firebase: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    AsyncStorage.getItem('@SystemSetting:shouldRequestPushNotificationPerm')
      .then((shouldRequestPushNotificationPerm) => {
        if (shouldRequestPushNotificationPerm !== 'TRUE') {
          global.setTimeout(() => {
            this.props.navigator.push({
              component: PushNotificationPermReq,
            });
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(`Something went wrong when retrieving data - ${err}`);
      });

    AsyncStorage.setItem('@SystemSetting:shouldSkipWalkthrough', 'TRUE')
      .catch((err) => {
        console.log(`Something went wrong when saving data - ${err}`);
      });
  }

  _renderEvent = (event) => {
    const startDate = moment(event.when.startTimestamp);
    const today = moment();
    const displayMonth = today.isAfter(startDate) ? today.format('MMM').toUpperCase() : startDate.format('MMM').toUpperCase();
    const displayDate = today.isAfter(startDate) ? today.format('DD') : startDate.format('DD');

    return (
      <ListItem style={ { borderBottomWidth: 0 } }>
        <Card>
          <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
            <Left>
              <Body style={ { flexGrow: 2, justifyContent: 'center', marginLeft: 0 } }>
                <Text style={ { fontSize: 10.5, color: 'red' } }>&nbsp;{ displayMonth }</Text>
                <Text style={ { fontSize: 22.5 } }>{ displayDate }</Text>
              </Body>
              <Body style={ { flexGrow: 15 } }>
                <Text style={ { fontSize: 18, fontWeight: '500' } }>{ event.name }</Text>
                <Text style={ { fontSize: 13, color: '#333' } } note>{ event.where.address }</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody button onPress={ this._checkoutEventDetail.bind(this, event) }>
            <Image
              style={ { height: Dimensions.get('window').width - 35, width: '100%' } }
              source={ { uri: event.heroPhoto } }
            />
          </CardItem>
          <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
            <Left>
              <Button iconLeft transparent onPress={ this._saveToCalenderApp.bind(this, event) }>
                <Icon style={ { fontSize: 22, color: '#f96332' } } name="bookmark" />
                <Text style={ { fontSize: 15, fontWeight: '700', color: '#f96332' } }>Save</Text>
              </Button>
              <Text>&nbsp;</Text>
              <Button
                iconLeft
                transparent
                onPress={ () => Share.share({
                  title: event.name,
                  message: `Check out this hand picked event - ${event.name}:\nLocalDetourNYC2017://?event=${JSON.stringify(event)}\n\nIf you haven't download our app yet, please download now before clicking the above event detail link:\nhttps://itunes.apple.com/us/app/localdetour/id1262262548?mt=8`,
                  //url: 'https://localdetour.herokuapp.com/',
                }) }
              >
                <Icon style={ { fontSize: 22, color: '#f96332' } } name="share" />
                <Text style={ { fontSize: 15, fontWeight: '700', color: '#f96332' } }>Share</Text>
              </Button>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem style={ { paddingTop: 0.1, paddingBottom: 0.1 } } />
        </Card>
      </ListItem>
    );
  }

  _saveToCalenderApp = async function (event) {
    try {
      const savedEventId = await CalendarEvents.saveToCalendarEvents(event.name, {
        location: event.where && event.where.address,
        startDate: (event.when && event.when.startTimestamp) ? new Date(event.when.startTimestamp) : new Date(),
        endDate: (event.when && event.when.endTimestamp) ? new Date(event.when.endTimestamp) : new Date(),
        alarms: [{ date: -60 * 24 }], // 24 hours.
        description: event.detail,
        notes: event.detail,
      });

      if (savedEventId) {
        Alert.alert('Success', 'The event has been saved to your calendar and will remind you one day before it starts');
        //CalendarEvents.showSavedEventInCalendarApp(event.when && event.when.startTimestamp);
      }
    } catch (err) {
      console.log(`Something went wrong when saving event to calendar app - ${err}`);
    }
  }

  _checkoutEventDetail(event) {
    this.props.navigator.push({
      component: EventDetail,
      passProps: { event },
    });
  }

  _gotoMapView = () => {
    this.props.navigator.replace({
      component: EventMapView,
    });
  }

  _gotoSetting = () => {
    this.props.navigator.push({
      component: Setting,
    });
  }

  static _filterEvents(events) {
    return events.filter((event) => {
      const today = moment();

      // Filters out past events.
      if (today.isAfter(event.when.endTimestamp)) {
        return false;
      }
      return true;
    });

  }

  render() {
    const events = this.props.events
      .filter((event) => !moment().isAfter(event.when.endTimestamp))
      .sort((event1, event2) => event1.when.startTimestamp - event2.when.startTimestamp);

    return (
      <Container>
        <Header style={ { backgroundColor: '#f96332' } }>
          <Left />
          <Body style={ { flexGrow: 3 } }>
            <Title style={ { color: 'white', fontFamily: 'Lily Script One', fontSize: 27 } }>Local Detour</Title>
          </Body>
          <Right>
            <Button transparent onPress={ this._gotoMapView }>
              <Icon style={ { color: 'white' } } name="map" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List
            dataArray={ events }
            renderRow={ this._renderEvent }
          />
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
)(Events);
