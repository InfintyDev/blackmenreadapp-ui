import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

import DropDown from './DropDown';
import ChagePageButton from './ChangePageButton';
import styles from './Styles';

export default function SideBar() {
  var buttons = [
    ChagePageButton('Home', 'Home'),
    ChagePageButton('Calander', 'Calander'),
    ChagePageButton('Book List', 'Books'),

    ChagePageButton('Record Time', 'RecordTime'),
    ChagePageButton('User Info', 'UserInfo'),
    ChagePageButton('Past Logs', 'PastLogs'),
  ];

  return (
    <View style={styles.containerColoumSide}>{ChagePageButton('Home', 'Home')}{
      ChagePageButton('Calander', 'Calander')}{
        ChagePageButton('Book List', 'Books')}{

        ChagePageButton('Record Time', 'RecordTime')}{
        ChagePageButton('User Info', 'UserInfo')}{
        ChagePageButton('Past Logs', 'PastLogs')}</View>
  );
}

export function SideBarExclued() {
  var buttons = [

    ChagePageButton('Calander', 'Calander'),
    ChagePageButton('Book List', 'Books'),

    ChagePageButton('Record Time', 'RecordTime'),
    ChagePageButton('User Info', 'UserInfo'),
    ChagePageButton('Past Logs', 'PastLogs'),
  ];

  return (
    <View style={styles.containerColoumSide}>{
      ChagePageButton('Calander', 'Calander')}{
        ChagePageButton('Book List', 'Books')}{

        ChagePageButton('Record Time', 'RecordTime')}{
        ChagePageButton('User Info', 'UserInfo')}{
        ChagePageButton('Past Logs', 'PastLogs')}</View>
  );
}
