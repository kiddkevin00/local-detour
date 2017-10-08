import EventDetail from './EventDetail';
import Login from './Login';
import Separator from './common/Separator';
import { firebaseAuth, firebaseDb } from '../proxies/FirebaseProxy';
import constants from '../constants/';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  ListView,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //flexDirection: 'column',
  },
  main: {
    flexGrow: 70,
  },
  footer: {
    flexGrow: 3,
    flexDirection: 'row',
    backgroundColor: '#E3E3E3',
    //alignItems: 'center',
  },
  rowContainer: {
    //flexGrow: 1,
    padding: 10,
  },
  itemName: {
    paddingBottom: 5,
    fontSize: 18,
    color: '#1558c4',
  },
  itemText: {
    paddingBottom: 5,
    fontSize: 14,
    color: '#48BBEC',
  },
  eventInput: {
    flexGrow: 20,
    //height: 60,
    padding: 8,
    fontSize: 18,
    color: '#111',
  },
  submitEventButton: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //height: 60,
    backgroundColor: '#48BBEC',
  },
  logoutButton: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //height: 60,
    backgroundColor: 'orange',
  },
  submitEventButtonText: {
    fontSize: 18,
    color: 'white',
  },
  logoutButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

class Events extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  // eslint-disable-next-line react/sort-comp
  listViewDataSource = new ListView.DataSource({
    rowHasChanged: (originalRow, newRow) => newRow._id !== originalRow._id,
  });

  state = {
    eventListViewDataSource: this.listViewDataSource.cloneWithRows([]),
    newEvent: '',
  };

  componentDidMount() {
    this.dataRef.on('value', (eventsSnapshot) => {
      const events = [];

      eventsSnapshot.forEach((eventSnapshot) => {
        events.push(eventSnapshot.val());
      });

      this.setState({
        eventListViewDataSource: this.listViewDataSource.cloneWithRows(events),
      });
    });
  }

  componentWillUnmount() {
    this.dataRef.off();
  }

  dataRef = firebaseDb.ref('/nyc').child('events');

  _renderEvent = (event) => (
    <View>
      <View style={ styles.rowContainer }>
        <TouchableHighlight
          onPress={ this._checkoutEventDetail.bind(this, event) }
          underlayColor="transparent"
        >
          <Text style={ styles.itemName }>{ event.name }</Text>
        </TouchableHighlight>
        <Text style={ styles.itemText }>{ event.where.address }</Text>
        <Text style={ styles.itemText }>{ moment(event.when.startTimestamp).format('MMM Do h A') } - { moment(event.when.endTimestamp).format('MMM Do h A') }</Text>
      </View>
      <Separator />
    </View>
  )

  _checkoutEventDetail = (event) => {
    this.props.navigator.push({
      title: 'Event Detail',
      component: EventDetail,
      passProps: { event },
    });
  }

  _handleClick = () => {
    this.dataRef
      .child(this.state.newEvent)
      .set({
        ...constants.APP.SAMPLE_EVENT,
        name: this.state.newEvent,
      })
      .then(() => {
        this.setState({
          newEvent: '',
        });
      })
      .catch((err) => {
        global.alert(JSON.stringify(err, null, 2));
      });
  }

  _handleChange = (event) => {
    this.setState({
      newEvent: event.nativeEvent.text,
    });
  }

  _handleLogout = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      await firebaseAuth.signOut();

      this.props.navigator.replace({
        title: 'Log In',
        component: Login,
      });

      this.setState({
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error.message || 'Something went wrong.';

      global.alert(errorMessage);

      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <ScrollView style={ styles.container }>
        <ListView
          style={ styles.main }
          dataSource={ this.state.eventListViewDataSource }
          renderRow={ this._renderEvent }
          enableEmptySections={ true }
          renderHeader={ () => null }
        />
        <View style={ styles.footer }>
          <TextInput
            style={ styles.eventInput }
            value={ this.state.newEvent }
            onChange={ this._handleChange }
            placeholder="Submit an event here..."
            placeholderTextColor="white"
          />
          <TouchableHighlight
            style={ styles.submitEventButton }
            onPress={ this._handleClick }
            underlayColor="#88D4F5"
          >
            <Text style={ styles.submitEventButtonText }>Submit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.logoutButton }
            onPress={ this._handleLogout }
            underlayColor="#ffcc00"
          >
            <Text style={ styles.logoutButtonText }>Logout</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }

}

export { Events as default };
