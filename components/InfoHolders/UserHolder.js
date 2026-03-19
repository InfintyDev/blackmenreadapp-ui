import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState, Component } from 'react';
//import RNFS from 'react-native-fs';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';
import ScreenSelector from '../Objects/SceneSelector';
import TypeBox from '../Objects/TypeBox';
import User, { StudentUser, ParentUser, TuterUser } from './User';

const getTheUserData = () => {
  /*
  fetch('https://snack.expo.dev/@david_al/bmr_mvp/assets/Log.json', {
    method: 'POST', // Or 'PUT', 'DELETE', etc.
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue',
    }),
  })
    .then((response) => response.json()) // Parse the JSON response from the server
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  */
  console.log(
    fetch('https://snack.expo.dev/@david_al/bmr_mvp/assets/Log.json') +
    ' : fetched data'
  );
};

const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch(
      'https://reactnative.dev/movies.json',
    );
    const json = await response.json();

    console.log(json)
    return json
  } catch (error) {
    console.error(error);
  }
};

export default class UserList {
  constructor(list) {
    //console.log('instanced');

    this.state = {
      userList: [
        new User('Blankman', ''),
        new User('John', 'word'),
        new User('Tim', 'Tim'),
        new User('User Name', 'Password'),
        new StudentUser('Student', 'Password'),
        new TuterUser('Tutor', 'Password'),
        new ParentUser('Parent', 'Password'),
      ],
    };
  }

  IsAUser(theName = '') {
    this.state.userList;

    for (let userObject of this.state.userList) {
      if (userObject.state.userName == theName) {
        return true;
      }
    }

    return false;
  }
  GetUser(theName = '', password = '') {
    console.log(getMoviesFromApiAsync())
    this.state.userList;

    for (let userObject of this.state.userList) {
      if (
        (userObject.state.userName == theName) &
        (userObject.state.password == password)
      ) {
        var modifiedUser = userObject;

        //console.log(modifiedUser.state)
        modifiedUser.state.password = null;
        return modifiedUser;
      }
    }

    return null;
  }
  AllUsers() {
    for (let userObject of this.state.userList) {
      console.log(userObject.name);
    }
  }
}
