import CalendarEvents from '../utils/CalendarEvents';
import WebViewWrapper from './common/WebViewWrapper';
import moment from 'moment';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Title,
  Grid,
  Col,
  Thumbnail,
  Button,
  Text,
  Icon,
} from 'native-base';
import {
  Alert,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class EventDetail extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

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

  _openWebPage(url) {
    this.props.navigator.push({
      component: WebViewWrapper,
      passProps: { url },
    });
  }

  _backToEventsList = () => {
    this.props.navigator.pop();
  }

  render() {
    const event = this.props.event || {
      name: 'Test Event',
      type: 'Public',
      description: 'Arts Brookfield’s annual summer music festival, the Lowdown Hudson Music Fest, returns to the heart of downtown New York for its seventh summer. Bringing fun, lively, world-class musical talent to the picturesque Waterfront Plaza at Brookfield Place, this year’s festival will be headlined by quirky veteran rockers OK GO. The show is free to attend and open to the public.Free to attend, no tickets required.PLEASE NOTE: In keeping with the summer concert vibe, this year’s festival will be standing room only on a first come, first served basis.Event is rain or shine, except for extreme weather conditions.',
      cost: 0,
      where: {
        venue: 'Time Square',
        address: '123 42nd street, New York, NY',
        coordinate: {
          latitude: 40.7582904,
          longitude: -73.9668905,
        },
      },
      when: {
        startTimestamp: moment('2017-07-02 18:00', 'YYYY-MM-DD HH:mm').valueOf(),
        endTimestamp: moment('2017-08-28 21:00', 'YYYY-MM-DD HH:mm').valueOf(),
      },
      externalLink: 'https://www.timeout.com/newyork/things-to-do/sunset-sail-happy-hour',
      photoUrls: [],
      tags: [],
    };

    return (
      <Container>
        <Header style={ { backgroundColor: '#f96332' } }>
          <Left>
            <Button transparent onPress={ this._backToEventsList }>
              <Icon style={ { color: 'white', fontSize: 27 } } name="arrow-back" />
            </Button>
          </Left>
          <Body style={ { flexGrow: 3 } }>
            <Title style={ { color: 'white', fontFamily: 'Lily Script One', fontSize: 27 } }>Local Detour</Title>
          </Body>
          <Right>
            <Button transparent onPress={ () => Alert.alert('Success', 'Shared on Facebook!') }>
              <Icon style={ { color: 'white' } } name="share" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem cardBody>
              <Image style={ { height: 200, width: null, flex: 1 } } source={ require('../../../static/assets/images/sample-event_1.jpg') } />
            </CardItem>
            <CardItem style={ { height: 70 } } bordered>
              <Body style={ { justifyContent: 'center' } }>
                <Text style={ { fontSize: 11, color: 'red' } }>&nbsp;{ moment(event.when.startTimestamp).format('MMM').toUpperCase() }</Text>
                <Text style={ { fontSize: 25 } }>{ moment(event.when.startTimestamp).format('DD') }</Text>
              </Body>
              <Body style={ { flexGrow: 6, justifyContent: 'center' } }>
                <Text>{ event.name }</Text>
                <Text note>{ event.type }</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="time" />
                <Text>&nbsp;</Text>
                <Text style={ { fontSize: 15 } }>{ moment(event.when.startTimestamp).format('MMM Do  hh:mm A') } - { moment(event.when.endTimestamp).format('MMM Do  hh:mm A') }</Text>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="navigate" />
                <Text>&nbsp;</Text>
                <Body>
                  <Text>{ event.where.venue }</Text>
                  <Text note>{ event.where.address }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="link" />
                <Text>&nbsp;</Text>
                <Body>
                  <Text>Event Site</Text>
                  <Text style={ { fontSize: 12 } } note onPress={ this._openWebPage.bind(this, event.externalLink) }>
                    { event.externalLink }
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Details</Text>
                <Text note>
                  { event.description }
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Photos</Text>
                <Grid>
                  <Col>
                    <Thumbnail style={ { width: '100%', height: 100 } } square source={ require('../../../static/assets/images/sample-event_1.jpg') } />
                  </Col>
                  <Col>
                    <Thumbnail style={ { width: '100%', height: 100 } } square source={ require('../../../static/assets/images/sample-event_2.jpeg') } />
                  </Col>
                </Grid>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={ this._saveToCalenderApp.bind(this, event) }>
              <Text>Save to Calendar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}

export { EventDetail as default };
