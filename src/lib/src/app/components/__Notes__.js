import Badge from './common/__Badge__';
import Separator from './common/Separator';
import { firebaseDb } from '../proxies/FirebaseProxy';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  rowContainer: {
    padding: 10,
  },
  footer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row',
  },
  noteInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flexGrow: 10,
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flexGrow: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

class Notes extends Component {

  static propTypes = {
    userInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static _renderNote(note) {
    return (
      <View>
        <View style={ styles.rowContainer }>
          <Text>{ note }</Text>
        </View>
        <Separator />
      </View>
    );
  }

  state = {
    noteListViewDataSource: this.listViewDataSource.cloneWithRows([]),
    newNote: '',
    error: '',
  };

  componentDidMount() {
    this.dataRef.on('value', (notesSnapshot) => {
      const notes = [];

      notesSnapshot.forEach((noteSnapshot) => {
        notes.push(noteSnapshot.val());
      });

      this.setState({
        noteListViewDataSource: this.listViewDataSource.cloneWithRows(notes),
      });
    });
  }

  listViewDataSource = new ListView.DataSource({
    rowHasChanged: (originalRow, newRow) => newRow !== originalRow,
  });

  dataRef = firebaseDb.ref(this.props.userInfo.login).child('notes');

  _handleClick = () => {
    this.dataRef.push(this.state.newNote)
      .then(() => {
        this.setState({
          newNote: '',
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: JSON.stringify(err, null, 2) });
      });
  }

  _handleChange = (event) => {
    this.setState({
      newNote: event.nativeEvent.text,
    });
  }

  render() {
    const userInfo = this.props.userInfo;

    return (
      <View style={ styles.container }>
        <ListView
          dataSource={ this.state.noteListViewDataSource }
          renderRow={ Notes._renderNote }
          enableEmptySections={ true }
          renderHeader={ () => (
            <Badge
              avatarUrl={ userInfo.avatar_url }
              name={ userInfo.name }
              login={ userInfo.login }
            />
          ) }
        />
        <View style={ styles.footer }>
          <TextInput
            style={ styles.noteInput }
            value={ this.state.newNote }
            onChange={ this._handleChange }
            placeHolder="Add a note here.."
          />
          <TouchableHighlight
            style={ styles.button }
            onPress={ this._handleClick }
            underlayColor="#88D4F5"
          >
            <Text style={ styles.buttonText }>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

export { Notes as default };
