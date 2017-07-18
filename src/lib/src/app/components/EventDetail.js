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
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
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
    event: PropTypes.object//.isRequired,
  };

  render() {
    const event = this.props.event;

    return (
      <Container>
        <Header style={ { height: 64, backgroundColor: '#f4f7f9', } } />
        <Content padder>
          <Card>
            <CardItem cardBody>
              <Image source={ require('../../../static/assets/images/v3_background.png') } style={ { height: 200, width: null, flex: 1 } } />
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail square source={ require('../../../static/assets/images/calendar-date.png') } />
                <Body>
                  <Text>Happy Hour</Text>
                  <Text note>Public</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon name="navigate" />
                  <Text>201 going</Text>
                </Button>
                <Button iconLeft transparent>
                  <Icon name="thumbs-up" />
                  <Text>302 interested</Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>April 28 - April 30</Text>
                <Text note>from 6 PM to 9 PM</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Time Square</Text>
                <Text note>123 W 42th st</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>More Info</Text>
                <Text note onPress={ this._openPage.bind(this, 'https://www.timeout.com/newyork/things-to-do/sunset-sail-happy-hour') }>https://www.timeout.com/newyork/things-to-do/sunset-sail-happy-hour</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Details</Text>
                <Text note>
                  Arts Brookfield’s annual summer music festival, the Lowdown Hudson Music Fest, returns to the heart of downtown New York for its seventh summer. Bringing fun, lively, world-class musical talent to the picturesque Waterfront Plaza at Brookfield Place, this year’s festival will be headlined by quirky veteran rockers OK GO. The show is free to attend and open to the public.Free to attend, no tickets required.PLEASE NOTE: In keeping with the summer concert vibe, this year’s festival will be standing room only on a first come, first served basis.Event is rain or shine, except for extreme weather conditions.
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
            <Button full onPress={ () => alert('Saved!') }>
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
