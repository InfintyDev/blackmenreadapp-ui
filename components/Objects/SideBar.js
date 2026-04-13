import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

import DropDown from './DropDown';
import ChagePageButton, { ChagePageButtonImage } from './ChangePageButton';
import styles from './Styles';
import App, { PhoneView } from '../../App';




export default function SideBar() {
  var imageWidth = 60;
  var imageHeight = 60;
  var viewStyle = styles.container;
  var pressableStyle = styles.container;
  var buttons = [
    ChagePageButton('Home', 'Home'),
    ChagePageButton('Calander', 'Calander'),
    ChagePageButton('Book List', 'Books'),
    ChagePageButton('Record Time', 'RecordTime'),
    ChagePageButton('User Info', 'UserInfo'),
    ChagePageButton('Past Logs', 'PastLogs'),
  ];
  if (PhoneView()) {
    buttons = [
      ChagePageButtonImage("Home", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("Calander", viewStyle, require('../../assets/CalanderIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("Books", viewStyle, require('../../assets/BookIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("RecordTime", viewStyle, require('../../assets/RecordTimeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("UserInfo", viewStyle, require('../../assets/UserInfoIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("PastLogs", viewStyle, require('../../assets/PastLogsIcon.png'), imageWidth, imageHeight, pressableStyle)
    ]
  }

  return (
    <View style={{ ...styles.containerColoumSide, maxWidth: imageWidth }}>{buttons[0]}{
      buttons[1]}{
        buttons[2]}{

        buttons[3]}{
        buttons[4]}{
        buttons[5]}</View>
  );
}

export function SideBarExclued() {
  var imageWidth = 60;
  var imageHeight = 60;
  var viewStyle = styles.container;
  var pressableStyle = styles.container;
  var buttons = [

    ChagePageButton('Calander', 'Calander'),
    ChagePageButton('Book List', 'Books'),
    ChagePageButton('Record Time', 'RecordTime'),
    ChagePageButton('User Info', 'UserInfo'),
    ChagePageButton('Past Logs', 'PastLogs'),
  ];
  if (PhoneView()) {
    buttons = [

      ChagePageButtonImage("Calander", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("Books", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("RecordTime", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("UserInfo", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("PastLogs", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle)
    ]
  }

  return (
    <View style={styles.containerColoumSide}>{
      buttons[0]}{
        buttons[1]}{

        buttons[2]}{
        buttons[3]}{
        buttons[4]}</View>
  );
}
