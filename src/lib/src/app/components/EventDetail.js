import CalendarEvents from '../utils/CalendarEvents';
import WebViewWrapper from './common/WebViewWrapper';
import constants from '../constants/';
import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
    event: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    isViewerShown: false,
    indexShown: 0,
  };

  _saveToCalenderApp = async function (event) {
    try {
      const savedEvent = await CalendarEvents.saveToCalendarEvents(event.name, {
        location: event.where && event.where.address,
        startDate: (event.when && event.when.startTimestamp) ? new Date(event.when.startTimestamp) : null,
        endDate: (event.when && event.when.endTimestamp) ? new Date(event.when.endTimestamp) : null,
        alarms: [{ date: -60 * 24 }], // 24 hours.
        description: event.detail,
        notes: event.detail,
      });

      if (savedEvent) {
        Alert.alert('Success', 'The event has been saved to your calendar and will remind you one day before it starts');
        //CalendarEvents.showSavedEventInCalendarApp(event.when && event.when.startTimestamp);
      }
    } catch (err) {
      console.log(err);
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

  _showDirectionInMapApp(coordinate) {
    Linking.openURL(`http://maps.apple.com/?daddr=${coordinate.latitude},${coordinate.longitude}`);
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
    const event = this.props.event || constants.APP.SAMPLE_EVENT;
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
                message: `Check out this hand picked event - ${event.name}\n${event.externalLink}\n\nFind out more by downloading our app for free`,
                url: 'https://localdetour.herokuapp.com/',
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
                <Text style={ { fontSize: 11, color: 'red' } }>&nbsp;{ moment(event.when.startTimestamp).format('MMM').toUpperCase() }</Text>
                <Text style={ { fontSize: 25 } }>{ moment(event.when.startTimestamp).format('DD') }</Text>
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
                <Text style={ { fontSize: 16, fontWeight: '500' } }>{ moment(event.when.startTimestamp).format('MM/DD hh:mma') } - { moment(event.when.endTimestamp).format('MM/DD hh:mma') }</Text>
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

export { EventDetail as default };
