import EventDetail from './EventDetail';
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Text,
} from 'native-base';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class EventMapLabel extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _checkoutEventDetail = (event) => {
    this.props.navigator.push({
      title: 'Event Detail',
      component: EventDetail,
      passProps: { event },
    });
  }

  render() {
    const event = this.props.event;
    const titleStyle = {
      marginTop: -0.5,
      marginBottom: 2,
      padding: -0.5,
      fontSize: 15,
      color: '#23cfb9',
    };

    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text style={ titleStyle }>
                    { event.name }
                  </Text>
                  <Text note>{ event.type }</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

}

export { EventMapLabel as default };
