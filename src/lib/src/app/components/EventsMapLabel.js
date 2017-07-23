import EventDetail from './EventDetail';
import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';


class EventsMapLabel extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _checkoutEventDetail = (event) => {
    this.props.navigator.push({
      title: 'Event Detail',
      component: EventDetail,
      passProps: { event },
    });
  }

  render() {
    const { event } = this.props;

    return (
      <Container>
        <Content>
          <Card >
            <CardItem>
              <Left>
                <Body>
                  <Text style={ {
                    marginTop: -0.5,
                    padding: -0.5,
                    marginBottom: 2,
                    fontSize: 15,
                    color: '#23cfb9'
                  } }
                  >{ event.name }
                  </Text>
                  <Text note={ true }>{event.type}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


export { EventsMapLabel as default };
