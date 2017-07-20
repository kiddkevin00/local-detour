import EventMapView from './EventMapView'
import EventDetail from './EventDetail';
import BaseComponent from './common/BaseComponent';
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
  StyleSheet,
  //Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
  Image,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';


class Events extends BaseComponent {

  constructor(props) {
    super(props);

    this.listViewDataSource = new ListView.DataSource({
      rowHasChanged: (originalRow, newRow) => newRow._id !== originalRow._id,
    });
    this.dataRef = firebaseDb.ref('/nyc').child('events');

    this.state = {
      events: [],
      eventListViewDataSource: this.listViewDataSource.cloneWithRows([]),
      newEvent: '',
    };
    this._bind('_renderEvent', '_checkoutEventDetail', '_gotoMapView');
  }

  static propTypes = {
    userInfo: PropTypes.object//.isRequired,
  };

  componentDidMount() {
    this.dataRef.on('value', (eventsSnapshot) => {
      const events = [];

      eventsSnapshot.forEach((eventSnapshot) => {
        events.push(eventSnapshot.val());
      });

      this.setState({
        events,
        eventListViewDataSource: this.listViewDataSource.cloneWithRows(events),
      });
    });
  }

  componentWillUnmount() {
    this.dataRef.off();
  }

  render() {
    //const userInfo = this.props.userInfo;

    return (
      <Container>
        <Header style={ { height: 64, backgroundColor: '#f4f7f9', } } />
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

  _renderEvent(event) {
    return (
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
              <Button iconLeft transparent onPress={ () => alert('Added to your calender!') }>
                <Icon name="navigate" />
                <Text>Going</Text>
              </Button>
              <Button iconLeft transparent onPress={ () => alert('Saved!') }>
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
    );
  }

  _checkoutEventDetail(event) {
    this.props.navigator.push({
      title: 'Event Detail',
      component: EventDetail,
      passProps: { event },
    });
  }

  _gotoMapView() {
    this.props.navigator.push({
      title: 'Map View',
      component: EventMapView
    })
  }

}

export { Events as default };
