import EventMapView from './EventsMapView';
import EventDetail from './EventDetail';
import { firebaseDb } from '../proxies/FirebaseProxy';
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
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Events extends Component {

  static propTypes = {
    //userInfo: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    events: [],
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

  _renderEvent = (event) => (
    <ListItem style={ { borderBottomWidth: 0 } } >
      <Card>
        <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Left>
            <Thumbnail square source={ require('../../../static/assets/images/calendar-date.png') } />
            <Body>
              <Text>{ event.name }</Text>
              <Text note>{ event.address }</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Image style={ { height: 200, width: null, flex: 1 } } source={ require('../../../static/assets/images/v3_background.png') } />
        </CardItem>
        <CardItem button onPress={ this._checkoutEventDetail.bind(this, event) }>
          <Left>
            <Button iconLeft transparent onPress={ () => Alert.alert('Success', 'Posted on your Facebook and added to your calender!') }>
              <Icon name="navigate" />
              <Text>Going</Text>
            </Button>
            <Button iconLeft transparent onPress={ () => Alert.alert('Success', 'Added to your calender!') }>
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
      title: 'Map View',
      component: EventMapView,
    });
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
