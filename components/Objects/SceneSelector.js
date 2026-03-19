import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

import DropDown from './DropDown';
import ChagePageButton from './ChangePageButton';

export default function ScreenSelector() {
  var buttons = [
    ChagePageButton('Home', 'Home'),
    ChagePageButton('Calander', 'Calander'),
    ChagePageButton('Book List', 'Books'),
    ChagePageButton('Log In Page', "LogIn"),
    ChagePageButton('Record Time', 'RecordTime'),
    ChagePageButton('User Info', 'UserInfo')
  ];

  return DropDown(buttons, 'Pages');
}
