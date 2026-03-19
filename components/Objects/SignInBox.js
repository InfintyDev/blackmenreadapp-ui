import { Text, SafeAreaView, StyleSheet, View, Button, Pressable, Linking } from 'react-native';
import { useState } from 'react';


// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import styles from './Styles';

import TypeBox from './TypeBox';

import UserList from '../InfoHolders/UserHolder';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../InfoHolders/User';

import { fetchNotes, saveUserToServer, loginRequest, IsEmailUsed } from '../../GetSaveUserFromServer'
import ChagePageButton from './ChangePageButton';
import App, { AppName } from '../../App'

export default function SignInBox(userTypeAssigned = '', userUsed = true) {
  var navigation = null;
  try {
    if (useNavigation()) {
      navigation = useNavigation();

    }

  }
  catch {

  }


  const pressedPutton = (name) => {
    //alert(scr)

    navigation.navigate(name);
  };
  //navigation = useNavigation();


  const saveUserToken = async (token, password) => {

    //token['Password'] = password
    console.log(token)
    try {
      const jsonValue = JSON.stringify(token);
      await AsyncStorage.setItem('userToken', jsonValue);
      //console.log('stored ' + jsonValue);
      const webName = AppName();
      const name = 'Home';
      if (navigation == null) {
        Linking.canOpenURL(webName + name).then((supported) => {
          if (supported) {
            Linking.openURL(webName + name);
          } else {
            console.log('Cannot handle URL');
          }
        });
      } else {
        await navigation.navigate(name);
      }
    } catch (error) {
      console.log('falure');
    }
  };
  const [userInst, setUserInst] = useState(new User());
  const [loginFailed, setLoginFailed] = useState(false)
  const [logingInNow, setLogingInNow] = useState(false)

  var users = new UserList();
  const [userNameLogBox, userNameLogBoxAwnser] = TypeBox(
    'example@example.com',
    'User:',
    styles.paragraphFlexable,
    styles.textStyle,
    false
  );
  const [passwordLogBox, passwordLogBoxAwnser] = TypeBox(
    'Password',
    'Password:',
    styles.paragraphFlexable,
    styles.textStyle,
    false
  );

  const UserSignedIn = (theUser) => {


    //console.log(theUser)
    saveUserToken(theUser);
  };

  const SignInButtonPressed = (userName = '', password = '', userType = '') => {

    console.log(IsEmailUsed(userName))
    loginRequest(userName, password, userType)
    console.log('pressed User:' + userName + ' Password:' + password);

    // console.log("Valid User")
    //users.GetUser(userName)

    if (users.IsAUser(userName) == true) {
      console.log('Valid User');

      const daUser = users.GetUser(userName, password);

      console.log(daUser.state);
      setUserInst(daUser);
      UserSignedIn(daUser);
    } else {
      console.log('invalid');
    }
  };
  const SignInConnect = async (email = '', password = '', userType = '') => {
    if (!logingInNow) {
      setLogingInNow(true)
      var useTypeOrSelect = '';

      if (userUsed) {
        useTypeOrSelect = userType;
      }
      else {
        useTypeOrSelect = userTypeAssigned;
      }
      //console.log(await IsEmailUsed(email))
      const responce = await loginRequest(email, password, useTypeOrSelect)
      console.log('pressed User:' + email + ' Password:' + password);



      // console.log("Valid User")
      //users.GetUser(userName)
      if (responce['Fail']) {
        console.log('fail')
        setLoginFailed(true)
        setLogingInNow(false)
      }
      else if (responce != null) {


        //const daUser = responce;


        //setUserInst(daUser);

        saveUserToken(responce, password);
      } else {
        console.log('invalid');
        setLogingInNow(false)
      }
    }

  };

  const [userTypeSelected, setUserTypeSelected] = useState('Tutor')

  const typeSelectorButton = (userType) => {
    var buttonSty = styles.buttonSide
    if (userTypeSelected == userType) {
      buttonSty = styles.buttonSidePressed
    }

    return <Pressable onPress={() =>
      setUserTypeSelected(userType)
    } style={buttonSty}><Text style={styles.sideButtonTextStyle}>{userType}</Text>

    </Pressable>
  }

  const typeSelectorButtons = <View style={{ ...styles.containerRow, scale: .8 }} >
    <View>{typeSelectorButton('Parent')}</View>
    <View>{typeSelectorButton('Tutor')}</View>
    <View>{typeSelectorButton('Student')}</View>
  </View>;


  return (
    <View style={styles.loginBoxView}>

      <View >{userUsed && <View style={styles.containerRow}><Text style={styles.largeText}>Sign In: </Text>{typeSelectorButtons}</View>}</View>
      <View>{!userUsed && <View><Text style={styles.largeText}>Sign In {userTypeAssigned}</Text></View>}</View>
      <View style={styles.containerRow}>
        <Text style={styles.smallText} >Email: </Text>
        {userNameLogBox}

      </View>

      <View style={styles.containerRow}>
        <Text style={styles.smallText}>Password: </Text>
        {passwordLogBox}

      </View>
      {loginFailed && <View><Text>The User Name or Password is Incorrect</Text></View>}

      <Button
        title={'Log In'}
        onPress={() =>
          SignInConnect(userNameLogBoxAwnser, passwordLogBoxAwnser, userTypeSelected)
        } style={styles.button} />


    </View >
  );
};
