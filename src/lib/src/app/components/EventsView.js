import Login from './Login';
import Separator from './common/Separator';
import BaseComponent from './common/BaseComponent';
import { firebaseAuth, firebaseDb } from '../proxies/FirebaseProxy';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';


// TODO
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
  itemTitle: {
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

class EventView extends BaseComponent {

  constructor(props) {
    super(props);

    this.listViewDataSource = new ListView.DataSource({
      rowHasChanged: (originalRow, newRow) => newRow._id !== originalRow._id,
    });
    this.dataRef = firebaseDb.ref('/nyc').child('events');

    this.state = {
      eventListViewDataSource: this.listViewDataSource.cloneWithRows([]),
      newEvent: '',
    };
    this._bind('_handleLogout', '_handleClick', '_handleChange');
  }

  static propTypes = {
    userInfo: PropTypes.object.isRequired,
  }

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

  render() {
    const userInfo = this.props.userInfo;

    return (
      <View style={ styles.container }>
        <ListView
          style={ styles.main }
          dataSource={ this.state.eventListViewDataSource }
          renderRow={ EventView._renderEvent }
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
      </View>
    );
  }

  async _handleLogout() {
    this.setState({
      isLoading: true,
    });

    try {
      await firebaseAuth.signOut();

      this.props.navigator.push({
        title: 'Log In',
        component: Login,
      });

      this.setState({
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error.message;

      alert(errorMessage);

      this.setState({
        isLoading: false,
      });
    }
  }

  _handleClick() {
    this.dataRef
      .push({
        title: this.state.newEvent,
        address: '123 42nd street, New York, NY',
        startDate: Date.now(),
        endDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
        type: 'Sports',
        description: 'Here is some detail...',
        cost: 0,
      })
      .then(() => {
        this.setState({
          newEvent: '',
        });
      })
      .catch((err) => {
        alert(JSON.stringify(err, null, 2));
      });
  }

  _handleChange(event) {
    this.setState({
      newEvent: event.nativeEvent.text,
    });
  }

  static _renderEvent(event) {
    return (
      <View>
        <View style={ styles.rowContainer }>
          <TouchableHighlight
            onPress={ () => {} }
            underlayColor="transparent"
          >
            <Text style={ styles.itemTitle }>{ event.title }</Text>
          </TouchableHighlight>
          <Text style={ styles.itemText }>{ event.address }</Text>
          <Text style={ styles.itemText }>{ new Date(event.startDate).toDateString() } - { new Date(event.endDate).toDateString() }</Text>
        </View>
        <Separator />
      </View>
    );
  }

}

export default EventView;
