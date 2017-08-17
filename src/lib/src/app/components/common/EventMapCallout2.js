import EventDetail from './EventDetail';
import {
  Container,
  Text,
} from 'native-base';
import {
  View,
  StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: '#007a87',
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: 140,
    backgroundColor: '#f4f7f9',
  },
  amount: {
    flex: 1,
  },
  arrowBorder: {
    alignSelf: 'center',
    marginTop: -0.5,
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    backgroundColor: 'transparent',
  },
  arrow: {
    alignSelf: 'center',
    marginTop: -32,
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#f4f7f9',
    backgroundColor: 'transparent',
  },
});


class EventMapLabel2 extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _checkoutEventDetail = (event) => {
    this.props.navigator.push({
      component: EventDetail,
      passProps: { event },
    });
  }

  render() {
    const event = this.props.event;

    return (
      <Container>
        <View style={ styles.bubble }>
          <View style={ styles.amount }>
            <Text style={ { color: '#23cfb9' } }>{ event.name }</Text>
          </View>
        </View>
        <View style={ styles.arrowBorder } />
        <View style={ styles.arrow } />
      </Container>
    );
  }

}

export { EventMapLabel2 as default };
