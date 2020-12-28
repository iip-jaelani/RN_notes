/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ButtonForm} from '../components/ButtonForm';
import {auth, firebase} from '../config/DbConfig';

const {width} = Dimensions.get('window');
const HEADING = width * 0.04;
const PADDING = width * 0.05;
export class AddNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      notesList: [],
      user_data: null,
      isLoading: false,
      index: null,
    };
  }

  componentDidMount() {
    this._getParams();
    auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  _getParams() {
    if (this.props.route.params) {
      const {index, notes} = this.props.route.params;
      this.setState({
        index: index,
        text: notes.notes,
      });
    }
  }
  onAuthStateChanged = (users) => {
    this.setState(
      {
        user_data: users,
        isLoading: false,
      },
      () => {
        this._getNotesData();
      },
    );
  };

  _getNotesData() {
    const {user_data} = this.state;
    firebase
      .database()
      .ref('notes')
      .child(user_data.uid)
      .once('value', (value) => {
        console.log();
        this.setState(
          {
            notesList: [...value.val(), ...this.state.notesList],
          },
          () => {
            console.log(this.state.notesList);
          },
        );
      });
  }
  _savedNotes = () => {
    this.props.navigation.goBack();
    const {text, user_data, index} = this.state;
    if (index !== null) {
      let update = {
        notes: text,
        time: firebase.database.ServerValue.TIMESTAMP,
        name: user_data.displayName,
      };

      firebase.database().ref(`notes/${user_data.uid}/${index}`).set(update);
      return;
    }
    if (text.length > 0) {
      let notesData = [
        ...this.state.notesList,
        {
          notes: text,
          time: firebase.database.ServerValue.TIMESTAMP,
          name: user_data.displayName,
        },
      ];
      firebase
        .database()
        .ref(`notes/${user_data.uid}`)
        .set(notesData)
        .then(() => {});
    }
  };
  render() {
    const {isLoading, user_data, text, index} = this.state;
    console.log(index);
    if (isLoading) {
      return <View />;
    }
    if (!user_data) {
      return <View />;
    }
    return (
      <>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerLabel}>{user_data.displayName}</Text>
          </View>
          <TextInput
            value={text}
            onChangeText={(txt) => {
              this.setState({
                text: txt,
              });
            }}
            multiline
            placeholder="Notes"
            focusable
            autoFocus
          />
        </ScrollView>
        <ButtonForm onPress={this._savedNotes} label="Save" />
      </>
    );
  }
}

export default AddNotes;

const styles = StyleSheet.create({
  container: {
    padding: PADDING,
  },
  headerContainer: {
    padding: 0,
    marginBottom: PADDING,
  },
  headerLabel: {
    fontSize: HEADING,
    fontWeight: 'bold',
  },
});
