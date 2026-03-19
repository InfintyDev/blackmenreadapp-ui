import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  Modal,
  Pressable,
  SafeAreaProvider,
} from 'react-native';
import styles from '../Objects/Styles';
import TypeBox, { DisplayBox } from '../Objects/TypeBox';
import User, { StudentUser } from './User';
import SafeAreaView from 'react-native-safe-area-context';

export default class BookLog extends Component {
  constructor(
    student = '',
    loggedUnder = '',
    bookName = '',
    time = '',
    notes = '',
    fristPage = 0,
    lastPage = 0,
    summery = ''
  ) {
    super();
    this.state = {
      student: student,
      loggedUnder: loggedUnder,
      bookName: bookName,
      time: time,
      notes: notes,
      fristPage: fristPage,
      lastPage: lastPage,
      summery: summery,
      dateMade: new Date(),
    };

    this.displayDate =
      this.state.dateMade.getMonth() +
      1 +
      '/' +
      this.state.dateMade.getDate() +
      '/' +
      this.state.dateMade.getFullYear();
  }

  displayTime = (time) => {
    const sec = parseInt(time, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };
  DisplayDay() {
    return (
      this.state.dateMade.getMonth() +
      '/' +
      this.state.dateMade.getDate() +
      '/' +
      this.state.dateMade.getFullYear()
    );
  }

  GetTheLogLook() {
    const notesLogBox = DisplayBox(this.state.notes);
    const summeryLogBox = DisplayBox(this.state.summery);
    const bookLogBox = DisplayBox(this.state.bookName, styles.paragraphRowFlexable);
    const pageFirstLogBox = DisplayBox(
      this.state.fristPage,
      styles.paragraphRowFlexable
    );
    const pageLastLogBox = DisplayBox(
      this.state.lastPage,
      styles.paragraphRowFlexable
    );
    const timeBox = DisplayBox(
      this.displayTime(this.state.time),
      styles.paragraphRowFlexable
    );
    return (
      <SafeAreaView style={styles.logView}>
        <Text>log</Text>
        <View style={styles.containerSmallText}>
          {bookLogBox}
          {pageFirstLogBox}
          {pageLastLogBox}
        </View>
        {notesLogBox}
        {summeryLogBox}
        {timeBox}
      </SafeAreaView>
    );
  }
}
