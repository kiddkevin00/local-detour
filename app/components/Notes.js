import Badge from './common/Badge';
import Separator from './common/Separator';
import BaseComponent from './common/BaseComponent';
import { firebaseDb } from '../proxies/FirebaseProxy';
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  noteInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
});

class Notes extends BaseComponent {

  constructor(props) {
    super(props);

    this.listViewDataSource = new ListView.DataSource({ rowHasChanged: (originalRow, newRow) => newRow !== originalRow });
    this.dataRef = firebaseDb.ref(this.props.userInfo.login).child('notes');

    this.state = {
      noteListViewDataSource: this.listViewDataSource.cloneWithRows([]),
      newNote: '',
      error: '',
    };
    this._bind('_handleSubmit', '_handleChange');
  }

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

  render() {
    const userInfo = this.props.userInfo;

    return (
      <View style={ styles.container }>
        <ListView
          dataSource={ this.state.noteListViewDataSource }
          renderRow={ this._renderNote }
          enableEmptySections={ true }
          renderHeader={ () => (
            <Badge
              avatarUrl={ userInfo.avatar_url }
              name={ userInfo.name }
              login={ userInfo.login }
            />
          ) }
        />
        <View style={ styles.footerContainer }>
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

  _handleClick() {
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

  _handleChange(event) {
    this.setState({
      newNote: event.nativeEvent.text,
    });
  }

  _renderNote(note) {
    return (
      <View>
        <View style={ styles.rowContainer }>
          <Text>{ note }</Text>
        </View>
        <Separator />
      </View>
    );
  }

}
Notes.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default Notes;
