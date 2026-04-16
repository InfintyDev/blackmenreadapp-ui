import { Text, StyleSheet, View, Button, Pressable, Linking, Image } from 'react-native';
//import {SafeAreaView} from 'react-native-responsive-screen'


// You can import supported modules from npm
import { Card } from 'react-native-paper';

import { Navigator } from 'expo-router';


// or any files within the Snack

import { React, useState, pressedPutton } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, useLinkTo } from '@react-navigation/native';
import styles from './Styles';
import App, { AppName } from '../../App'
export default function ChagePageButton(
  titleText = '',
  pageName = '',
  buttonStyle = styles.sideButtonStyle
) {

  const webName = AppName();
  var navigation = null;
  try {
    if (useNavigation()) {
      navigation = useNavigation();

    }

  }
  catch {

  }


  const pressedPutton = async (namea) => {
    //alert(scr)
    var name = namea;
    if (navigation == null) {
      if (name == "LogInSelectorPage") {
        name = ''
      }
      if (await Linking.canOpenURL(webName + name)) {
        Linking.openURL(webName + name)

      }
    } else {
      navigation.navigate(name);
    }

  };

  return (
    <View style={buttonStyle}>
      <Pressable
        title={titleText}
        onPress={() => pressedPutton(pageName)}
        style={styles.buttonSide}>
        <Text numberOfLines={1} style={styles.sideButtonTextStyle}>
          {titleText}
        </Text>
      </Pressable>
    </View>
  );
}

export function ChagePageButtonImage(

  pageName = '',
  viewStyle = styles.sideButtonStyle,
  imageSource,
  imageWidth = 0,
  imageHeight = 0,
  pressableStyle = styles.container,
  imageStyle = styles.img,


) {

  const MakeImage = (imageStyle, imageSource, width = 0, height = 0) => {


    return (
      <Image
        style={{ ...styles.img, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height, margin: 2 }}
        source={imageSource}

      />
    );
  };
  const webName = AppName();
  var navigation = null;
  try {
    if (useNavigation()) {
      navigation = useNavigation();

    }

  }
  catch {

  }


  const pressedPutton = async (namea) => {
    //alert(scr)
    var name = namea;
    if (navigation == null) {
      if (name == "LogInSelectorPage") {
        name = ''
      }
      if (await Linking.canOpenURL(webName + name)) {
        Linking.openURL(webName + name)

      }
    } else {
      navigation.navigate(name);
    }

  };

  return (
    <View style={{ ...viewStyle, maxHeight: imageHeight, maxWidth: imageWidth }}>
      <Pressable

        onPress={() => pressedPutton(pageName)}
        style={{ ...pressableStyle, minHeight: imageHeight, minWidth: imageWidth }}>
        {MakeImage(imageStyle, imageSource, imageWidth, imageHeight)}
      </Pressable>
    </View>
  );
}
