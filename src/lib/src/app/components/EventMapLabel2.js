import EventDetail from './EventDetail';
import React, { Component } from 'react';
import {
  Container,
  Text
} from 'native-base';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#f4f7f9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#f4f7f9',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
})


class EventMapLabel2 extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const event = this.props.event;

    return (
      <Container>
        <View style={ styles.bubble }>
          <View style={ styles.amount }>
            <Text style={ { color: '#23cfb9' } }>{event.name}</Text>
          </View>
        </View>
        <View style={ styles.arrowBorder } />
        <View style={ styles.arrow } />
      </Container>
    );
  }

  _checkoutEventDetail = (event) => {
    this.props.navigator.push({
      title: 'Event Detail',
      component: EventDetail,
      passProps: { event },
    });
  }

}

export { EventMapLabel2 as default };
