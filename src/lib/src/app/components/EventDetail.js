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
              <Image style={ { height: 200, width: null, flex: 1 } } source={ require('../../../static/assets/images/v3_background.png') } />
            </CardItem>
            <CardItem bordered>{/* [TBD] */}
              <Left>
                <Thumbnail square source={ require('../../../static/assets/images/calendar-date.png') } />
                <Body>
                  <Text>{ event.name }</Text>
                  <Text note>{ event.type }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>{/* [TBD] */}
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
            <CardItem bordered>{/* [TBD] */}
              <Body>
                <Text>More Info</Text>
                <Text note onPress={ this._openPage.bind(this, event.externalLink) }>{ event.externalLink }</Text>
              </Body>
            </CardItem>
            <CardItem bordered>{/* [TBD] */}
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
