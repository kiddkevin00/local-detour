import WebViewWrapper from './common/WebViewWrapper';
import BaseComponent from './common/BaseComponent';
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
  Grid,
  Col,
  Thumbnail,
  Button,
  Text,
  Icon,
} from 'native-base';
import {
  Image,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';


class EventDetail extends BaseComponent {

  constructor(props) {
    super(props);

    this._bind('_openPage');
  }

  static propTypes = {
    event: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const event = this.props.event || {
      name: 'Test Event',
      venue: 'Time Square',
      address: '123 42nd street, New York, NY',
      startDate: 'April 28',
      endDate: 'April 30',
      startTime: '6 PM',
      endTime: '9 PM',
      type: 'Public',
      description: 'Arts Brookfield’s annual summer music festival, the Lowdown Hudson Music Fest, returns to the heart of downtown New York for its seventh summer. Bringing fun, lively, world-class musical talent to the picturesque Waterfront Plaza at Brookfield Place, this year’s festival will be headlined by quirky veteran rockers OK GO. The show is free to attend and open to the public.Free to attend, no tickets required.PLEASE NOTE: In keeping with the summer concert vibe, this year’s festival will be standing room only on a first come, first served basis.Event is rain or shine, except for extreme weather conditions.',
      cost: 0,
      externalLink: 'https://www.timeout.com/newyork/things-to-do/sunset-sail-happy-hour',
      photoUrls: [],
      tags: {},
    };

    return (
      <Container>
        <Header style={ { height: 64, backgroundColor: '#f4f7f9' } } />
        <Content padder>
          <Card>
            <CardItem cardBody>
              <Image style={ { height: 200, width: null, flex: 1 } } source={ require('../../../static/assets/images/v3_background.png') } />
            </CardItem>
            <CardItem bordered>
              <Left>
                <Thumbnail square source={ require('../../../static/assets/images/calendar-date.png') } />
                <Body>
                  <Text>{ event.name }</Text>
                  <Text note>{ event.type }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Button iconLeft transparent>
                  <Icon name="navigate" />
                  <Text>54 going</Text>
                </Button>
                <Button iconLeft transparent>
                  <Icon name="thumbs-up" />
                  <Text>76 liked</Text>
                </Button>
                <Button iconLeft transparent>
                  <Icon name="share" />
                  <Text>37 Shared</Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{ event.startDate } - { event.endDate }</Text>
                <Text note>from { event.startTime } to { event.endTime }</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{ event.venue }</Text>
                <Text note>{ event.address }</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>More Info</Text>
                <Text note onPress={ this._openPage.bind(this, event.externalLink) }>
                  { event.externalLink }
                </Text>
              </Body>
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
                    <Thumbnail style={ { width: '100%', height: 100 } } square source={ require('../../../static/assets/images/v4_background.png') } />
                  </Col>
                  <Col>
                    <Thumbnail style={ { width: '100%', height: 100 } } square source={ require('../../../static/assets/images/v3_background.png') } />
                  </Col>
                </Grid>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={ () => global.alert('Saved!') }>
              <Text>Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  _openPage(url) {
    this.props.navigator.push({
      title: 'Web Page',
      component: WebViewWrapper,
      passProps: { url },
    });
  }

}

export { EventDetail as default };
