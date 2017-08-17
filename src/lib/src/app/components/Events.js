import PushNotification from '../utils/PushNotification';
import CalendarEvents from '../utils/CalendarEvents';
import EventMapView from './EventsMapView';
import EventDetail from './EventDetail';
import Setting from './Setting';
import { firebaseDb } from '../proxies/FirebaseProxy';
import moment from 'moment';
import {
  Container,
  Header,
  Segment,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Title,
  Thumbnail,
  Button,
  Text,
  Icon,
} from 'native-base';
import {
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Events extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    events: [],
    showListView: true,
  };

  componentDidMount() {
    PushNotification.requestPermission();
    PushNotification.subscribeToTopic();

    AsyncStorage.setItem('@SystemSetting:shouldSkipWalkthrough', 'TRUE')
      .catch((err) => {
        // Error saving data
        console.log(err);
      });

    this.dataRef.on('value', (eventsSnapshot) => {
      const events = [];

      eventsSnapshot.forEach((eventSnapshot) => {
        const event = eventSnapshot.val();
        const today = moment();

        if (today.isBefore(event.when && event.when.endTimestamp)) {
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

  _renderEvent = (event) => (
    <ListItem style={ { borderBottomWidth: 0 } } >
      <Card>
        <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Left>
            <Thumbnail square source={ require('../../../static/assets/images/sample-event_1.jpg') } />
            <Body>
              <Text>{ event.name }</Text>
              <Text note>{ event.where.address }</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Image style={ { height: 200, width: null, flex: 1 } } source={ require('../../../static/assets/images/sample-event_2.jpeg') } />
        </CardItem>
        <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Left>
            <Button iconLeft transparent onPress={ this._saveToCalenderApp.bind(this, event) }>
              <Icon name="bookmark" />
              <Text>Save</Text>
            </Button>
            <Button iconLeft transparent onPress={ () => Alert.alert('Success', 'Shared on Facebook!') }>
              <Icon name="share" />
              <Text>Share</Text>
            </Button>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      </Card>
    </ListItem>
  )

  _saveToCalenderApp = async function (event) {
    try {
      const savedEvent = await CalendarEvents.saveToCalendarEvents(event.name, {
        location: event.where && event.where.address,
        startDate: (event.when && event.when.startTimestamp) ? new Date(event.when.startTimestamp) : null,
        endDate: (event.when && event.when.endTimestamp) ? new Date(event.when.endTimestamp) : null,
        alarms: [{ date: -60 * 24 }], // 24 hours.
        description: event.description,
        notes: event.description,
      });

      if (savedEvent) {
        CalendarEvents.showSavedEventWithCalendarApp(event.when && event.when.startTimestamp);
      }
    } catch (err) {
      console.log(err);
    }
  }

  _checkoutEventDetail(event) {
    this.props.navigator.push({
      component: EventDetail,
      passProps: { event },
    });
  }

  _gotoMapView = () => {
    this.setState({ showListView: false });

    this.props.navigator.replace({
      component: EventMapView,
    });
  }

  _gotoSetting = () => {
    this.props.navigator.push({
      component: Setting,
    });
  }

  render() {
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
            dataArray={ this.state.events }
            renderRow={ this._renderEvent }
          />
        </Content>
      </Container>
    );
  }

}

export { Events as default };
