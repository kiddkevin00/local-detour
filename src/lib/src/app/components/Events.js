import PushNotification from '../utils/PushNotification';
import CalendarEvents from '../utils/CalendarEvents';
import EventMapView from './EventsMapView';
import EventDetail from './EventDetail';
import Setting from './Setting';
import {
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
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
  Share,
  AsyncStorage,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Events extends Component {

  static propTypes = {
    events: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    auth: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    firebase: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    PushNotification.requestPermission();
    PushNotification.subscribeToTopic();

    AsyncStorage.setItem('@SystemSetting:shouldSkipWalkthrough', 'TRUE')
      .catch((err) => {
        // Error saving data
        console.log(err);
      });
  }

  _renderEvent = (event) => (
    <ListItem style={ { borderBottomWidth: 0 } } >
      <Card>
        <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Left>
            <Body style={ { flexGrow: 2, justifyContent: 'center' } }>
              <Text style={ { fontSize: 10.5, color: 'red' } }>&nbsp;{ moment(event.when.startTimestamp).format('MMM').toUpperCase() }</Text>
              <Text style={ { fontSize: 22.5 } }>{ moment(event.when.startTimestamp).format('DD') }</Text>
            </Body>
            <Body style={ { flexGrow: 15 } }>
              <Text style={ { fontSize: 16 } }>{ event.name }</Text>
              <Text style={ { fontSize: 13 } } note>{ event.where.address }</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Image style={ { flexGrow: 1, height: 200, width: null } } source={ { uri: event.heroPhoto } } />
        </CardItem>
        <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Left>
            <Button iconLeft transparent onPress={ this._saveToCalenderApp.bind(this, event) }>
              <Icon name="bookmark" />
              <Text>Save</Text>
            </Button>
            <Button
              iconLeft
              transparent
              onPress={ () => Share.share({
                title: event.name,
                message: `Check out this hand picked event - ${event.name}\n${event.externalLink}\n\nFind out more by downloading our app for free:\nhttps://mysugarpost.herokuapp.com/`,
                //url: 'https://mysugarpost.herokuapp.com/',
              }) }
            >
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
        startDate: (event.when && event.when.startTimestamp) ? new Date(event.when.startTimestamp) : new Date(),
        endDate: (event.when && event.when.endTimestamp) ? new Date(event.when.endTimestamp) : new Date(),
        alarms: [{ date: -60 * 24 }], // 24 hours.
        description: event.detail,
        notes: event.detail,
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
            dataArray={ this.props.events }
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
