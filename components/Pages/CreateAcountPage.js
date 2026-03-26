import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// You can import supported modules from npm
import { Card, TextInput } from 'react-native-paper';
import ChagePageButton from '../Objects/ChangePageButton';
// or any files within the Snack

import styles from '../Objects/Styles';

import TypeBox from '../Objects/TypeBox';
import { fetchNotes, saveUserToServer, loginRequest, IsEmailUsed, addUserRequest } from '../../GetSaveUserFromServer'


function BaseCreation(internal) {
  return (
    <View style={styles.container}>
      <View style={styles.centerer}>

        <View style={styles.centeredContainer}>
          {internal}
        </View>
      </View>

    </View>
  );
}

function userNameInvalid(userName = '') {
  const bannedWordList = ['!']
  for (let index = 0; index < bannedWordList.length; index++) {
    if (userName.includes(bannedWordList[index])) {
      return true;
    }

  }

  return false;
}
function SignUpButtons(userType = '') {
  const [preventButtonPress, setPreventButtonPress] = useState(false);
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [userNameError, setUserNameError] = useState('')

  const showPasswordButton = <Button title='a' onPress={() => setShowPassword(!showPassword)} />;
  const showConfirmPasswordButton = <Button title='a' onPress={() => setShowConfirmPassword(!showConfirmPassword)} />;
  var navigation = null;
  try {
    if (useNavigation()) {
      navigation = useNavigation();

    }

  }
  catch {

  }


  const pressedButton = (name) => {
    //alert(scr)

    navigation.navigate(name);
  };
  const CreateAcountConfirmation = (email = '', password = '', confirmPassword = '', userName = '', userType,) => {

    var noUserIssues = true;
    if (userName = '') {
      console.log('User Name Invalid')
      setUserNameError('Please Enter a User Name')
      var noUserIssues = false;
    }


    if (confirmPassword != password) {
      console.log('passwords Do not match')
      var noUserIssues = false;
    }
    if (!(email.includes('@') && email.includes('.'))) {
      console.log('Email Invalid')
      setEmailError('Use a Valid Email')
      var noUserIssues = false;
    }
    if (userNameInvalid(userName)) {
      console.log('User Name Invalid')
      setUserNameError('Use an Appropriate User Name')
      var noUserIssues = false;
    }




    return noUserIssues;

  }

  async function CreateAcount(email = '', password = '', confirmPassword = '', userName = '', userType,) {
    if (CreateAcountConfirmation(email, password, confirmPassword, userName, userType) && !preventButtonPress) {

      setPreventButtonPress(true)
      await addUserRequest(email, password, userName, userType)
      pressedButton('LogInSelectorPage')
    }
  }


  const setEmailValue = (NewValue) => {

    setEmail(NewValue)
    setEmailError('')
  }
  const setUserNameValue = (NewValue) => {

    setUserName(NewValue)
    setUserNameError('')
  }




  return (<View style={styles.containerBackGround}>

    <View style={styles.centerer}><Text style={styles.titalText}>Make {userType} Acount</Text></View>

    {ChagePageButton('Back', 'SignUpPage')}

    <TextInput placeholder='User Name' onChangeText={(NewValue) => setUserNameValue(NewValue)} value={userName}></TextInput>
    {<Text>{userNameError}</Text>}
    <TextInput placeholder='Email' onChangeText={(NewValue) => setEmailValue(NewValue)} value={email}></TextInput>
    {<Text>{emailError}</Text>}
    <Text>{<TextInput secureTextEntry={showPassword} placeholder='Password' onChangeText={(NewValue) => setPassword(NewValue)} value={password}></TextInput>}
      {showPasswordButton}</Text>
    {<Text>{passwordError}</Text>}
    <Text>{<TextInput placeholder='Confirm Password' secureTextEntry={showConfirmPassword} onChangeText={(NewValue) => setConfirmPassword(NewValue)} value={confirmPassword}></TextInput>}
      {showConfirmPasswordButton}</Text>
    {<Text>{passwordError}</Text>}

    <Button title={'Make ' + userType + ' Acount'} onPress={() => CreateAcount(email, password, confirmPassword, userName, userType)} />
  </View>

  );
}

export default function CreateAcountPage() {
  const studentUserButton = ChagePageButton('Make Student Acount', 'MakeStudentAcountPage')
  const parentUserButton = ChagePageButton('Make Parent Acount', 'MakeParentAcountPage')
  const tutorUserButton = ChagePageButton('Make Tutor Acount', 'MakeTutorAcountPage')


  return (
    <View style={styles.container}>
      <View style={styles.centerer}>

        <View style={styles.centeredContainer}>
          {ChagePageButton('Back', 'LogInSelectorPage')}
          <View style={styles.buttonPadding}>{studentUserButton}</View>
          <View style={styles.buttonPadding}>{parentUserButton}</View>
          <View style={styles.buttonPadding}>{tutorUserButton}</View>
        </View>
      </View>

    </View>
  );
}




export function CreateTutorAcountPage() {
  return BaseCreation(SignUpButtons('Tutor'))
}

export function CreateStudentAcountPage() {
  return BaseCreation(SignUpButtons('Student'))
}
export function CreateParentAcountPage() {
  return BaseCreation(SignUpButtons('Parent'))
}