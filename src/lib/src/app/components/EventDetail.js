import CalendarEvents from '../utils/CalendarEvents';
import WebViewWrapper from './common/WebViewWrapper';
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
  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    flex: 1,
  },
});

const renderPagination = (index, total, context) => (
  <View
    style={ {
      //justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 25,
      left: 0,
      right: 0,
    } }
  >
    <View
      style={ {
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7,
      } }
    >
      <Text
        style={ {
          color: '#fff',
          fontSize: 14,
        } }
      >
        { index + 1 } / {total}
      </Text>
    </View>
  </View>
);

const Viewer = (props) => {
  const photoViewInlineStyle = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };

  return (
    <Swiper
      style={ styles.wrapper }
      index={ props.imageIndex }
      renderPagination={ renderPagination }
    >
      {
        props.imgList.map((item) => (
          <View style={ styles.slide } key={ item }>
            <PhotoView
              style={ [styles.photo, photoViewInlineStyle] }
              resizeMode="contain"
              minimumZoomScale={ 1 }
              maximumZoomScale={ 3 }
              source={ { uri: item } }
              onViewTap={ props.onImageOutsideTap.bind(this) }
            />
          </View>
        ))
      }
    </Swiper>
  );
};

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
        CalendarEvents.showSavedEventWithCalendarApp(event.when && event.when.startTimestamp);
      }
    } catch (err) {
      console.log(err);
    }
  }

  _onPhotoSelect(indexShown) {
    console.log(indexShown)
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

  _backToEventsList = () => {
    this.props.navigator.pop();
  }

  render() {
    const event = this.props.event || {
      name: 'Test Event',
      type: 'Public',
      description: 'Arts Brookfield’s annual summer music festival, the Lowdown Hudson Music Fest, returns to the heart of downtown New York for its seventh summer. Bringing fun, lively, world-class musical talent to the picturesque Waterfront Plaza at Brookfield Place, this year’s festival will be headlined by quirky veteran rockers OK GO. The show is free to attend and open to the public.Free to attend, no tickets required.\n\nPLEASE NOTE: In keeping with the summer concert vibe, this year’s festival will be standing room only on a first come, first served basis.\n\nEvent is rain or shine, except for extreme weather conditions.',
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
      heroPhoto: 'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fnyc-KqL2ok5NjDZekgIhYPl_sample-1.jpeg?alt=media&token=d0bc39b7-bdcd-4820-a423-077e3180febd',
      photos: [
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fnyc-KqL2ok5NjDZekgIhYPl_fireworks-photo.jpg?alt=media&token=0ef5d862-4079-4d19-a3a3-39d42d2934ca',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fnyc-KqL2ok5NjDZekgIhYPl_fireworks.jpg?alt=media&token=2de88024-6692-47f9-a378-4d496f0490f9',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fnyc-KqL2mGX3v9pJ2R_47ge_sample-3.jpeg?alt=media&token=f7a218c3-d048-426c-8a4c-088f1daf4830',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fnyc-KqL2ok5NjDZekgIhYPl_fireworks-display-from-seafair-yacht.jpg?alt=media&token=393bd179-49c7-4b7e-8b3e-c5d0a005f593',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fnyc-KqL2ok5NjDZekgIhYPl_fireworks.jpg?alt=media&token=2de88024-6692-47f9-a378-4d496f0490f9',
      ],
      tags: [],
    };
    const photosView = (
      Array.isArray(event.photos) ? (
        event.photos
          .reduce((rowViews, photo, index, photos) => {
            if (index === photos.length - 1) {
              if (index % 2 === 0) {
                if (index > 0) {
                  rowViews.push((
                    <Row key={ photos[index - 2] }>
                      <Col style={ { borderWidth: 1, borderColor: 'white' } }>
                        <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 2) }>
                          <Thumbnail
                            style={ { width: '100%', height: 100 } }
                            square
                            source={ { uri: photos[index - 2] } }
                          />
                        </TouchableHighlight>
                      </Col>
                      <Col style={ { borderWidth: 1, borderColor: 'white' } }>
                        <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 1) }>
                          <Thumbnail
                            style={ { width: '100%', height: 100 } }
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
                          style={ { width: '100%', height: 200 } }
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
                          style={ { width: '100%', height: 100 } }
                          square
                          source={ { uri: photos[index - 1] } }
                        />
                      </TouchableHighlight>
                    </Col>
                    <Col style={ { borderWidth: 1, borderColor: 'white' } }>
                      <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index) }>
                        <Thumbnail
                          style={ { width: '100%', height: 100 } }
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
                        style={ { width: '100%', height: 100 } }
                        square
                        source={ { uri: photos[index - 2] } }
                      />
                    </TouchableHighlight>
                  </Col>
                  <Col style={ { borderWidth: 1, borderColor: 'white' } }>
                    <TouchableHighlight onPress={ this._onPhotoSelect.bind(this, index - 1) }>
                      <Thumbnail
                        style={ { width: '100%', height: 100 } }
                        square
                        source={ { uri: photos[index - 1] } }
                      />
                    </TouchableHighlight>
                  </Col>
                </Row>
              ));
            }
            return rowViews;
          }, [])
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
              <Icon style={ { color: 'white', fontSize: 27 } } name="arrow-back" />
            </Button>
          </Left>
          <Body style={ { flexGrow: 3 } }>
            <Title style={ { color: 'white', fontFamily: 'Lily Script One', fontSize: 27 } }>Local Detour</Title>
          </Body>
          <Right>
            <Button transparent onPress={ () => Share.share({ title: event.name, message: event.detail, url: event.externalLink }) }>
              <Icon style={ { color: 'white' } } name="share" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem cardBody>
              <Image style={ { height: 200, width: null, flex: 1 } } source={ { uri: event.heroPhoto } } />
            </CardItem>
            <CardItem style={ { height: 70 } } bordered>
              <Body style={ { flexGrow: 2, justifyContent: 'center' } }>
                <Text style={ { fontSize: 11, color: 'red' } }>&nbsp;{ moment(event.when.startTimestamp).format('MMM').toUpperCase() }</Text>
                <Text style={ { fontSize: 25 } }>{ moment(event.when.startTimestamp).format('DD') }</Text>
              </Body>
              <Text>&nbsp;</Text>
              <Body style={ { flexGrow: 13, justifyContent: 'center' } }>
                <Text>{ event.name }</Text>
                <Text note>{ event.type }</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon style={ { fontSize: 25, color: 'red' } } name="time" />
                <Text>&nbsp;</Text>
                <Text style={ { fontSize: 14 } }>{ moment(event.when.startTimestamp).format('MMM DD  hh:mmA') } - { moment(event.when.endTimestamp).format('MMM DD  hh:mmA') }</Text>
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
                  { event.detail }
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Grid>
                <Row>
                  <Text>Photos</Text>
                </Row>
                { photosView }
              </Grid>
            </CardItem>
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
