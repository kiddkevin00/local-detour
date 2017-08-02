import EventMapView from './EventsMapView';
import EventDetail from './EventDetail';
import { firebaseDb } from '../proxies/FirebaseProxy';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
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
  Grid,
  Row,
  Thumbnail,
  Button,
  Text,
  Icon,
} from 'native-base';
import {
  Image,
  Alert,
  Linking
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Events extends Component {

  static propTypes = {
    //userInfo: PropTypes.object.isRequired,
    updateNavbarVisibility: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    events: [],
  };

  componentDidMount() {
    this.props.updateNavbarVisibility(false);

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
            <Button iconLeft transparent onPress={ () => Alert.alert('Success', 'Posted on your Facebook and added to your calender!') }>
              <Icon name="navigate" />
              <Text>Going</Text>
            </Button>
            <Button iconLeft transparent onPress={ this._addToCalender.bind(this, event) }>
              <Icon name="bookmark" />
              <Text>Save</Text>
            </Button>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      </Card>
    </ListItem>
  )

  _checkoutEventDetail = (event) => {
    this.props.navigator.push({
      title: 'Event Detail',
      component: EventDetail,
      passProps: { event },
    });
  }

  _gotoMapView = () => {
    this.props.navigator.push({
      title: 'Events Map',
      component: EventMapView,
    });
  }

  _addToCalender = async (event) => {
    const authorize = await RNCalendarEvents.authorizeEventStore();

    if (authorize === 'authorized') {
      const calendars = await RNCalendarEvents.findCalendars();
      // use default calendar

      RNCalendarEvents.saveEvent('test123', {
           location:'New York, NY',
           startDate: '2017-08-19T19:26:00.000Z', //use ISO date
           description: event.name,
           endDate: '2017-08-20T19:26:00.000Z',
           calendarId: calendars[0].id
      }).then(savedEvent => {
          Linking.openURL(`calshow:${new Date().getTime()}`);
      }).catch(e => {
        console.log('errr', e)
      })
    }
}


  render() {
    return (
      <Container>
        <Header style={ { height: 64, backgroundColor: '#f4f7f9' } } />
        <Content>
          <Grid>
            <Row>
              <Body>
                <Button info small full onPress={ this._gotoMapView }>
                  <Text>Map View</Text>
                </Button>
              </Body>
            </Row>
            <Row>
              <List
                dataArray={ this.state.events }
                renderRow={ this._renderEvent }
              />
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }

}

export { Events as default };
