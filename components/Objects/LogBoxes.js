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
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Styles';

import { useState, data } from 'react';
import TypeBox, {
  InputBoxClass,
  InputBoxNumbers,
  InputBoxNumbersClass,
} from './TypeBox';

//import textfile from '../assets/BookLogsText.txt';
import BookLog from '../InfoHolders/BookLog.js';
import * as logj from '../../assets/Log.json';
import User, { StudentUser } from '../InfoHolders/User';
import UserHolder from '../InfoHolders/UserHolder';


import saveUserToken from '../SaveLoadUserLocal';
import { addUserLogs, GetConnectedUser } from '../../GetSaveUserFromServer'

const LogBoxes = (time, userData = {}) => {
  //const [logInst, setLogInst] = useState();
  const notesLogBox = TypeBox('Notes');
  const summeryLogBox = TypeBox('Summery');
  const bookLogBox = TypeBox('Book', '', styles.paragraphFlexable);



  const [secondsValue, setSecondsValue] = useState('0');
  const [minutesValue, setMinutesValue] = useState('0');
  const [hoursValue, setHoursValue] = useState('0');

  const pageFirstLogBox = InputBoxNumbers(

    '',
    styles.paragraphRowFlexable


  );
  const pageLastLogBox = InputBoxNumbers(
    '',
    styles.paragraphRowFlexable


  );

  const ChangeValueSec = (value = '') => {
    console.log('value changed');
    var stringWithoutLetters = value;
    if (value != null) {
      stringWithoutLetters = value.replace(/[a-zA-Z]/g, '');
    }
    if (parseInt(stringWithoutLetters)) {
      if (parseInt(stringWithoutLetters) > 60) {
        setSecondsValue('60');
      } else {
        console.log("number = " + parseInt(value))
        setSecondsValue(parseInt(stringWithoutLetters));
      }
    }
    else {
      setSecondsValue('0');
    }


  };
  const ChangeValueMin = (value = '') => {
    console.log('value changed');
    var stringWithoutLetters = value;
    if (value != null) {
      stringWithoutLetters = value.replace(/[a-zA-Z]/g, '');
    }
    if (parseInt(stringWithoutLetters)) {
      if (parseInt(stringWithoutLetters) > 60) {
        setMinutesValue('60');
      } else {
        console.log("number = " + parseInt(value))

        setMinutesValue(parseInt(stringWithoutLetters));
      }

    }
    else {
      setMinutesValue('0');
    }

  };
  const ChangeValueHrs = (value = '') => {
    console.log('value changed');
    var stringWithoutLetters = value;
    if (value != null) {
      stringWithoutLetters = value.replace(/[a-zA-Z]/g, '');
    }
    if (parseInt(stringWithoutLetters)) {
      console.log("number = " + parseInt(value))

      setHoursValue(parseInt(stringWithoutLetters));
    } else {
      setHoursValue('0');
    }


  };
  const blankBox = () => {
    return [
      <View style={styles.paragraphFlexable}>
        <Text>{String(userData['UserName'])}</Text>
      </View>,

      userData

    ];
  };
  const [optionTitle, setOptionTitle] = useState('');
  const [displayOptions, setDisplayOptions] = useState(false);
  const [returnValue, setRetunValue] = useState(userData);

  const [studentSelectorValue, setStudentSelectorValue] = useState((blankBox()[1]))
  const ReformatObjectList = (objectList) => {
    var reFormated = [];
    const keys = Object.keys(objectList);

    //console.log(keys)
    for (let i = 0; i <= keys.length - 1; i++) {
      reFormated[i] = (
        <Button
          title={keys[i]}
          onPress={() => selectedOption(keys[i], objectList)}
          style={styles.dropDownOptions}
        />
      );
      //console.log(objectList[i]);
    }

    return reFormated;
  };
  const pressedPutton = (name) => {
    //alert(scr)
    console.log('Pressed')

    setDisplayOptions(!displayOptions);
  };
  const selectedOption = (option, objectList) => {

    console.log(objectList[option])
    setOptionTitle('Selected: ' + option);
    setDisplayOptions(false);
    setRetunValue(objectList[option]);
    setStudentSelectorValue(objectList[option])
  };
  const DropDownSelector = (objectList = {}, titleOfBox = '') => {
    //console.log('updated')
    setOptionTitle(titleOfBox)


    return [
      <View style={styles.flexDefaltAbsolute}>
        <Button title={optionTitle} onPress={() => pressedPutton()} />
        {displayOptions && <View><Text>look</Text></View>}
        <View style={styles.flexDefaltAbsolute}>
          {displayOptions && ReformatObjectList(objectList)}

        </View>
      </View>,

      returnValue
    ];


  }

  const [studentSelector, setStudentSelector] = useState((blankBox()[0]))



  //const [studentSelectorValue, setStudentSelectorValue] = useState((blankBox()[1]))




  //const studentSelector = blankBox()

  //var studentLogBox = blankBox();
  //studentLogBox = blankBox()
  const [updatedBoxes, setUpdatedBoxes] = useState(false)
  const [useDropDown, setUseDropDown] = useState(false)
  const [connectedUsersGotten, setConnectedUsersGotten] = useState(false)
  const GetAllConnectedUsers = (userList = []) => {

    var userDropDown = {}
    console.log(userList)
    userList.map((user) =>
      userDropDown[user['UserName']] = user
    )
    console.log(userDropDown)
    const dropDown = DropDownSelector(userDropDown, 'Users')

    return dropDown[0]

  }

  const updateUserBox = () => {
    if (!updatedBoxes) {


      if (userData['UserType'] == 'Student') {
        console.log('student')
        const selector = blankBox()
        setUpdatedBoxes(true)
        setStudentSelector(selector[0])
        setStudentSelectorValue(selector[1])
      }
      else if (userData['UserType'] == 'Tutor') {
        console.log('UpdateTutor')
        setUpdatedBoxes(true)
        const selector = blankBox()

        setStudentSelector(selector[0])
        setStudentSelectorValue(selector[1])
        setUseDropDown(true)


        //studentLogBox = DropDownSelector({a: 'user', b: 'user' }, 'Users');
      }
      else if (userData['UserType'] == 'Parent') {
        console.log('UpdateTutor')
        setUpdatedBoxes(true)
        const selector = blankBox()

        setStudentSelector(selector[0])
        setStudentSelectorValue(selector[1])
        setUseDropDown(true)
      }
    }

    return studentSelector



  }



  //studentLogBox = DropDownSelector({a: 'user', b: 'user' }, 'Users');

  const displayTime = (time) => {
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
    return [hours, minutes, seconds];
  };

  const LogButtonPressed = () => {
    console.log('pressed');

    if (
      studentSelectorValue != null &&
      bookLogBox[1] != null &&
      notesLogBox[1] != null &&
      summeryLogBox[1] != null &&
      pageFirstLogBox[1] != null &&
      pageLastLogBox[1] != null
    ) {
      console.log('valid Log')
    }
    var theLog = {}

    if (studentSelectorValue['_id']) {
      theLog = {
        LoggedFor: studentSelectorValue['_id'],
        LoggedForName: studentSelectorValue['UserName'],
        LoggedUnder: userData['_id'],
        LoggedUnderName: userData["UserName"],
        LoggedUnderType: userData['UserType'],
        Book: bookLogBox[1],
        Time: hoursValue + '/' + minutesValue + "/" + secondsValue,
        Notes: notesLogBox[1],
        PageFirst: pageFirstLogBox[1],
        PageLast: pageLastLogBox[1],
        Summery: summeryLogBox[1],
        Date: new Date()
      }
    }
    else {
      theLog = {
        LoggedFor: studentSelectorValue['id'],
        LoggedForName: studentSelectorValue['UserName'],
        LoggedUnder: userData['_id'],
        LoggedUnderName: userData["UserName"],
        LoggedUnderType: userData['UserType'],
        Book: bookLogBox[1],
        Time: hoursValue + '/' + minutesValue + "/" + secondsValue,
        Notes: notesLogBox[1],
        PageFirst: pageFirstLogBox[1],
        PageLast: pageLastLogBox[1],
        Summery: summeryLogBox[1],
        Date: new Date()
      }
    }

    //setLogInst(theLog);



    console.log(studentSelectorValue);


    console.log(theLog)





    if (studentSelectorValue['_id']) {
      var modifiedData = userData

      if (!modifiedData['Logs']) {
        //modifiedData['Logs'] = data['Logs']

        modifiedData['Logs'] = []
        console.log(modifiedData)
      }
      modifiedData['Logs'][modifiedData['Logs'].length] = theLog


      //console.log(modifiedData)
      saveUserToken(modifiedData)
      addUserLogs(userData['Email'], userData['_id'], userData['UserType'], theLog)
    }
    else {
      addUserLogs(studentSelectorValue['Email'], studentSelectorValue['id'], 'Student', theLog)
    }






  };

  const autoLog = () => {
    const theTimeStates = displayTime(time);
    console.log(
      'time is ' +
      theTimeStates[0] +
      ':' +
      theTimeStates[1] +
      ':' +
      theTimeStates[2]
    );

    setHoursValue(theTimeStates[0]);
    setMinutesValue(theTimeStates[1]);
    setSecondsValue(theTimeStates[2]);
  };


  const [connectedUsers, setConnectedUsers] = useState(null)
  const [prevOption, setPrevOption] = useState(true)

  const updatePressed = () => {
    console.log('Update')
  }

  const updateConnectedUsers = () => {
    if (!connectedUsersGotten && userData['ConnectedAcounts'] && useDropDown || displayOptions != prevOption) {
      console.log('updated')
      setConnectedUsers(GetAllConnectedUsers(userData['ConnectedAcounts']))
      if (connectedUsers == null) {

      }
      else {
        setPrevOption(displayOptions)
        setConnectedUsersGotten(true)
      }

      console.log(connectedUsers)

    }
    return connectedUsers;
  }
  return [
    <View style={styles.logView}>
      <View style={styles.containerColoum}>
        <View style={styles.logButton}>
          <Button
            title={'Log Time'}
            onPress={() => LogButtonPressed()}></Button>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.containerRow}>
            <Text style={styles.tinyText}>Book: </Text>
            {bookLogBox[0]}
          </View>
          <View style={styles.containerRow}>
            <Text style={styles.tinyText}>First Page: </Text>
            {pageFirstLogBox[0]}
          </View>
          <View style={styles.containerRow}>
            <Text style={styles.tinyText}>Last Page: </Text>
            {pageLastLogBox[0]}
          </View>
        </View>
        <View style={styles.containerRow}>
          <Text style={styles.tinyText}>Notes: </Text>
          {notesLogBox[0]}
        </View>
        <View style={styles.containerRow}>
          <Text style={styles.tinyText}>Summery: </Text>
          {summeryLogBox[0]}
        </View>

        <View style={styles.containerRow}>
          <Button title={'Auto Log'} onPress={() => autoLog()} />
          <View style={styles.containerColoum}>
            <Text style={styles.minuteText}>HRS: </Text>

            <View style={styles.paragraphFlexable}>
              <TextInput
                defaultValue={'00'}
                onChangeText={(val) => ChangeValueHrs(val)}
                style={styles.flexDefalt}
                maxLength={2}
                value={hoursValue}
              />
            </View>
          </View>
          <View style={styles.containerColoum}>
            <Text style={styles.minuteText}>MIN: </Text>

            <View style={styles.paragraphFlexable}>
              <TextInput
                defaultValue={'00'}
                onChangeText={(val) => ChangeValueMin(val)}
                style={styles.flexDefalt}
                maxLength={2}
                value={minutesValue}
              />
            </View>
          </View>
          <View style={styles.containerColoum}>
            <Text style={styles.minuteText}>SEC: </Text>
            <View style={styles.paragraphFlexable}>
              <TextInput
                defaultValue={'00'}
                onChangeText={(val) => ChangeValueSec(val)}
                style={styles.flexDefalt}
                maxLength={2}
                value={secondsValue}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerRowAbove}>{userData['UserName'] && !useDropDown && updateUserBox()}
          {userData['ConnectedAcounts'] &&
            useDropDown &&
            updateConnectedUsers()}</View>
      </View>
    </View>
  ];
};
export default LogBoxes