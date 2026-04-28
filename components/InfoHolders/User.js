import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  LogBox,

  TextInput,
  Modal,
  Pressable,
  SafeAreaProvider,
} from 'react-native';
import styles from '../Objects/Styles';

import { useState, Component } from 'react';
import BookLog from './BookLog';


const fetchUserData = (email = '', password = '') => {

  credentials = {
    email: email,
    password: password
  }



}


export default class User extends Component {
  constructor(userName = '', password = '', email = '') {
    super();
    this.userType = 'standard';

    this.state = {
      email: email,
      userName: userName,
      password: password,
    };
    this.studentStates = {
      badges: 1,

      logs: [new BookLog()],
    };
    this.parentStates = {
      kids: [],
    };
    this.tutorStates = {
      students: [],
    };
  }

  AddLog(log = '') {
    console.log('Log Added ' + this.studentStates.logs.length);

    this.studentStates.logs = [...this.studentStates.logs, log];
    console.log(this.studentStates.logs);
  }
}

export class StudentUser extends User {
  constructor(userName = '', password = '', email = '') {
    super(userName, password, email);
    this.userType = 'student';
    this.studentStates = {
      badges: 1,

      logs: [],
    };
  }

  AddLog(log = BookLog) {
    console.log('Log Added ' + this.studentStates.logs.length);

    this.studentStates.logs = [...this.studentStates.logs, log];
    console.log(this.studentStates.logs);
  }
}

export class ParentUser extends User {
  constructor(userName = '', password = '', email = '') {
    super(userName, password, email);
    this.userType = 'parent';
    this.parentStates = {
      kids: [],
    };
  }
}

export class TuterUser extends User {
  constructor(userName = '', password = '', email = '') {
    super(userName, password, email);
    this.userType = 'tutor';
    this.tutorStates = {
      students: [],
    };
  }
}
