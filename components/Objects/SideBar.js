import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

import DropDown from './DropDown';
import ChagePageButton, { ChagePageButtonImage } from './ChangePageButton';
import styles from './Styles';
import App, { PhoneView } from '../../App';
import { Colors } from 'react-native-paper';





export default function SideBar() {
  var defaultWidth = 150;
  if (PhoneView) {
    defaultWidth = "15%"
  }
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
    ChagePageButton('Settings', 'Settings'),
    ChagePageButton('Statistics', 'StudentStatistics')
  ];
  if (PhoneView()) {
    buttons = [
      ChagePageButtonImage("Home", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("Calander", viewStyle, require('../../assets/CalanderIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("Books", viewStyle, require('../../assets/BookIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("RecordTime", viewStyle, require('../../assets/RecordTimeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("UserInfo", viewStyle, require('../../assets/UserInfoIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("PastLogs", viewStyle, require('../../assets/PastLogsIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("Settings", viewStyle, require('../../assets/SettingsIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("StudentStatistics", viewStyle, require('../../assets/StudentStatisticsIcon.png'), imageWidth, imageHeight, pressableStyle)
    ]
  }

  return (
    <View style={{ ...styles.containerColoumSide, maxWidth: imageWidth, backgroundColor: 'white', maxWidth: defaultWidth }}>
      {buttons[0]}
      {buttons[1]}
      {buttons[2]}
      {buttons[3]}
      {buttons[4]}
      {buttons[5]}
      {buttons[6]}
      {buttons[7]}
    </View>
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

      ChagePageButtonImage("Calander", viewStyle, require('../../assets/CalanderIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("Books", viewStyle, require('../../assets/BookIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("RecordTime", viewStyle, require('../../assets/RecordTimeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("UserInfo", viewStyle, require('../../assets/HomeIcon.png'), imageWidth, imageHeight, pressableStyle),
      ChagePageButtonImage("PastLogs", viewStyle, require('../../assets/PastLogsIcon.png'), imageWidth, imageHeight, pressableStyle)
    ]
  }

  return (
    <View style={{ ...styles.containerColoumSide, backgroundColor: 'white' }}>{
      buttons[0]}{
        buttons[1]}{

        buttons[2]}{
        buttons[3]}{
        buttons[4]}</View>
  );
}
