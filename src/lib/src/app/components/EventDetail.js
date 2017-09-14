import CalendarEvents from '../utils/CalendarEvents';
import WebViewWrapper from './common/WebViewWrapper';
import constants from '../constants/';
import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';
import { firebaseConnect } from 'react-redux-firebase';
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
  Row,
  Col,
  Thumbnail,
  Button,
  Text,
  Icon,
} from 'native-base';
import {
  Alert,
  Linking,
  Share,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
  },
  wrapper: {
    borderRadius: 7,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: 'rgba(255,255,255,.15)',
  },
});

function Viewer(props) {
  const photoViewInlineStyle = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  };

  return (
    <Swiper
      index={ props.imageIndex }
      renderPagination={ Viewer._renderPagination }
    >
      {
        props.imgList.map((item) => (
          <PhotoView
            style={ [photoViewInlineStyle] }
            key={ item }
            resizeMode="contain"
            minimumZoomScale={ 1 }
            maximumZoomScale={ 3 }
            source={ { uri: item } }
            onViewTap={ props.onImageOutsideTap }
            onTap={ props.onImageOutsideTap }
          />
        ))
      }
    </Swiper>
  );
}
Viewer.propTypes = {
  imgList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  imageIndex: PropTypes.number.isRequired,
  onImageOutsideTap: PropTypes.func.isRequired,
};
Viewer._renderPagination = (index, total/*, context*/) => (
  <View style={ styles.container }>
    <View style={ styles.wrapper }>
      <Text style={ { fontSize: 14, color: '#fff' } }>
        { index + 1 } / {total}
      </Text>
    </View>
  </View>
);

class EventDetail extends Component {

  static propTypes = {
    eventName: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types

    events: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    auth: PropTypes.object, // eslint-disable-line react/forbid-prop-types

    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    isViewerShown: false,
    indexShown: 0,
  };

  _saveToCalenderApp = async function (event) {
    try {
      const savedEventId = await CalendarEvents.saveToCalendarEvents(event.name, {
        location: event.where && event.where.address,
        startDate: (event.when && event.when.startTimestamp) ? new Date(event.when.startTimestamp) : null,
        endDate: (event.when && event.when.endTimestamp) ? new Date(event.when.endTimestamp) : null,
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

  _onPhotoSelect(indexShown) {
    this.setState({
      indexShown,
      isViewerShown: true,
    });
  }

  _backToEventDetailView = () => {
    this.setState({
      isViewerShown: false,
    });
  }

  _openWebPage(url) {
    this.props.navigator.push({
      component: WebViewWrapper,
      passProps: { url },
    });
  }

  _showDirectionInMapApp = async (coordinate) => {
    const url = `http://maps.apple.com/?daddr=${coordinate.latitude},${coordinate.longitude}`;

    try {
      const isSupported = await Linking.canOpenURL(url);

      if (isSupported) {
        await Linking.openURL(url);
      }
    } catch (err) {
      console.log(`Something went wrong when showing direction in map app - ${err}`);
    }
  }

  _backToEventsList = () => {
    this.props.navigator.pop();
  }

  _reducePhotosView = (rowViews, photo, index, photos) => {
    if (index === photos.length - 1) {
      if (index % 2 === 0) {
        if (index > 0) {
          rowViews.push((
            <Row key={ photos[index - 2] }>
              <Col style={ { borderWidth: 1, borderColor: 'white' } }>
                <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 2) }>
                  <Thumbnail
                    style={ { height: (Dimensions.get('window').width - 59) / 2, width: '100%' } }
                    square
                    source={ { uri: photos[index - 2] } }
                  />
                </TouchableHighlight>
              </Col>
              <Col style={ { borderWidth: 1, borderColor: 'white' } }>
                <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 1) }>
                  <Thumbnail
                    style={ { height: (Dimensions.get('window').width - 59) / 2, width: '100%' } }
                    square
                    source={ { uri: photos[index - 1] } }
                  />
                </TouchableHighlight>
              </Col>
            </Row>
          ));
        }
        rowViews.push((
          <Row key={ photos[index] }>
            <Col style={ { borderWidth: 1, borderColor: 'white' } }>
              <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index) }>
                <Thumbnail
                  style={ { height: (Dimensions.get('window').width - 57), width: '100%' } }
                  square
                  source={ { uri: photos[index] } }
                />
              </TouchableHighlight>
            </Col>
          </Row>
        ));
      } else {
        rowViews.push((
          <Row key={ photos[index - 1] }>
            <Col style={ { borderWidth: 1, borderColor: 'white' } }>
              <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 1) }>
                <Thumbnail
                  style={ { height: (Dimensions.get('window').width - 59) / 2, width: '100%' } }
                  square
                  source={ { uri: photos[index - 1] } }
                />
              </TouchableHighlight>
            </Col>
            <Col style={ { borderWidth: 1, borderColor: 'white' } }>
              <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index) }>
                <Thumbnail
                  style={ { height: (Dimensions.get('window').width - 59) / 2, width: '100%' } }
                  square
                  source={ { uri: photos[index] } }
                />
              </TouchableHighlight>
            </Col>
          </Row>
        ));
      }
    } else if (index > 0 && index % 2 === 0) {
      rowViews.push((
        <Row key={ photos[index - 2] }>
          <Col style={ { borderWidth: 1, borderColor: 'white' } }>
            <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 2) }>
              <Thumbnail
                style={ { height: (Dimensions.get('window').width - 59) / 2, width: '100%' } }
                square
                source={ { uri: photos[index - 2] } }
              />
            </TouchableHighlight>
          </Col>
          <Col style={ { borderWidth: 1, borderColor: 'white' } }>
            <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 1) }>
              <Thumbnail
                style={ { height: (Dimensions.get('window').width - 59) / 2, width: '100%' } }
                square
                source={ { uri: photos[index - 1] } }
              />
            </TouchableHighlight>
          </Col>
        </Row>
      ));
    }
    return rowViews;
  }

  render() {
    const event = this.props.events.find((e) => e.name === this.props.eventName) || constants.APP.SAMPLE_EVENT;
    const photosView = (
      Array.isArray(event.photos) ? (
        event.photos
          .reduce(this._reducePhotosView, [])
      ) : (
        <Row>
          <Text note>coming soon...</Text>
        </Row>
      )
    );
    const startDate = moment(event.when.startTimestamp);
    const today = moment();
    const displayMonth = today.isAfter(startDate) ? today.format('MMM').toUpperCase() : startDate.format('MMM').toUpperCase();
    const displayDate = today.isAfter(startDate) ? today.format('DD') : startDate.format('DD');
    const diaplyDateInterval = moment(event.when.startTimestamp).format('MMM DD') !== moment(event.when.endTimestamp).format('MMM DD') ?
      `${moment(event.when.startTimestamp).format('MMM DD')} - ${moment(event.when.endTimestamp).format('MMM DD')}` :
      moment(event.when.startTimestamp).format('MMM DD');
    const displayTimeInterval = event.when.display || `${moment(event.when.startTimestamp).format('hh:mm A')} - ${moment(event.when.endTimestamp).format('hh:mm A')}`;

    return (
      <Container>
        {
          this.state.isViewerShown && (
            <Viewer
              onImageOutsideTap={ this._backToEventDetailView }
              imgList={ event.photos }
              imageIndex={ this.state.indexShown }
            />
          )
        }

        <Header style={ { backgroundColor: '#f96332' } }>
          <Left>
            <Button transparent onPress={ this._backToEventsList }>
              <Icon style={ { color: 'white', fontSize: 32 } } name="arrow-back" />
            </Button>
          </Left>
          <Body style={ { flexGrow: 3 } }>
            <Title style={ { color: 'white', fontFamily: 'Lily Script One', fontSize: 27 } }>Local Detour</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={ () => Share.share({
                title: event.name,
                message: `Check out this event - ${event.name}:\n` +
                  `LocalDetourNYC2017://?event=${global.encodeURIComponent(JSON.stringify(event.name))}\n\n` +
                  'Click the link below to download LocalDetour:\n' +
                  'https://itunes.apple.com/us/app/localdetour/id1262262548?mt=8',
                //url: 'https://localdetour.herokuapp.com/',
              }) }
            >
              <Icon style={ { color: 'white' } } name="share" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem cardBody>
              <Image style={ { height: Dimensions.get('window').width - 25, width: '100%' } } source={ { uri: event.heroPhoto } } />
            </CardItem>
            <CardItem style={ { height: 70 } } bordered>
              <Body style={ { flexGrow: 2, justifyContent: 'center' } }>
                <Text style={ { fontSize: 11, color: 'red' } }>&nbsp;{ displayMonth }</Text>
                <Text style={ { fontSize: 25 } }>{ displayDate }</Text>
              </Body>
              <Text>&nbsp;</Text>
              <Body style={ { flexGrow: 13, justifyContent: 'center' } }>
                <Text style={ { fontSize: 20, fontWeight: '500' } }>{ event.name }</Text>
                <Text style={ { fontSize: 14, fontWeight: '400', color: '#333' } } note>{ event.type }</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="time" />
                <Text>&nbsp;</Text>
                <Body>
                  <Text style={ { fontSize: 16, fontWeight: '500' } }>{ diaplyDateInterval }</Text>
                  <Text style={ { fontSize: 14, fontWeight: '400', color: '#333' } } note>{ displayTimeInterval }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered button onPress={ this._showDirectionInMapApp.bind(this, event.where.coordinate) }>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="navigate" />
                <Text>&nbsp;</Text>
                <Body>
                  <Text style={ { fontSize: 16, fontWeight: '500' } }>{ event.where.venue }</Text>
                  <Text style={ { fontSize: 14, fontWeight: '400', color: '#333' } } note>{ event.where.address }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="pricetag" />
                <Text>&nbsp;</Text>
                <Text style={ { fontSize: 16, fontWeight: '500' } }>{ event.cost === '$0' ? 'FREE' : event.cost }</Text>
              </Left>
            </CardItem>
            <CardItem bordered button onPress={ this._openWebPage.bind(this, event.externalLink) }>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="link" />
                <Text>&nbsp;</Text>
                <Body>
                  <Text style={ { fontSize: 16, fontWeight: '500' } }>Event Site</Text>
                  <Text style={ { fontSize: 14, fontWeight: '400', color: '#333' } } note>
                    { event.externalLink }
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={ { fontSize: 16, fontWeight: '500' } }>Editor&#39;s Comment</Text>
                <Text style={ { fontSize: 14, fontWeight: '400', color: '#333' } } note>
                  { event.editorComment || 'Stay tuned! Coming soon...' }
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={ { fontSize: 16, fontWeight: '500' } }>Details</Text>
                <Text style={ { fontSize: 14, fontWeight: '400', color: '#333' } } note>
                  { event.detail }
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Grid>
                <Row>
                  <Text style={ { fontSize: 16, fontWeight: '500' } }>Photos</Text>
                </Row>
                { photosView }
              </Grid>
            </CardItem>
            <CardItem style={ { paddingTop: 0.1, paddingBottom: 0.1 } } />
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button style={ { backgroundColor: '#f96332' } } full onPress={ this._saveToCalenderApp.bind(this, event) }>
              <Text style={ { fontSize: 17, color: 'white', fontWeight: 'bold' } }>Save to Calendar</Text>
            </Button>
          </FooterTab>
        </Footer>
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
        events: (state.firebase.ordered && state.firebase.ordered.nyc &&
          Array.isArray(state.firebase.ordered.nyc.events)) ?
            state.firebase.ordered.nyc.events.map((event) => event.value) : [],
        auth: state.firebase.auth,
      };
    }
  )
)(EventDetail);
