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
import { Card } from 'react-native-paper';
//import textfile from '../assets/BookLogsText.txt';
import BookLog from '../InfoHolders/BookLog.js';

import User, { StudentUser } from '../InfoHolders/User';
import UserHolder from '../InfoHolders/UserHolder';

import SideBar from '../Objects/SideBar';
import saveUserToken from '../SaveLoadUserLocal';
import { addUserLogs, GetConnectedUser } from '../../GetSaveUserFromServer'
import App, { PhoneView } from '../../App';
import MakeScroll from './MakeScroll.js';

const LogBoxes = (time, userData = {}) => {
  //const [logInst, setLogInst] = useState();
  const styView = styles.centeredContainerBlankBackGround;
  const notesLogBox = TypeBox('Notes', '', styles.paragraphBox, styles.textStyle, true);
  const summeryLogBox = TypeBox('Summery', '', styles.paragraphBox, styles.textStyle, true);
  const bookLogBox = TypeBox('Book', '', styView, styles.textStyle, true, stylem.parBox);



  const [secondsValue, setSecondsValue] = useState('0');
  const [minutesValue, setMinutesValue] = useState('0');
  const [hoursValue, setHoursValue] = useState('0');

  const pageFirstLogBox = InputBoxNumbers(

    4,
    styles.centeredContainerBlankBackGround,
    styles.textStyle,
    stylem.parBox



  );
  const pageLastLogBox = InputBoxNumbers(
    4,
    styles.centeredContainerBlankBackGround,
    styles.textStyle,
    stylem.parBox



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

    return <View>{MakeScroll(reFormated, 35)}</View>;
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
  var styPhone = styles.containerRow;
  if (PhoneView()) {
    styPhone = styles.containerColoum
  }
  return [
    <View style={{ ...styles.logView }}>
      <View style={styles.containerColoum}>
        <View style={styles.logButton}>
          <Pressable

            onPress={() => LogButtonPressed()}><Card style={{ ...styles.paddedCard, margin: 5, backgroundColor: "#ffc20f" }}><Text>Log Time</Text></Card></Pressable>
        </View>
        <View style={{ ...styPhone, flex: 1, flexWrap: 'wrap' }}>
          <View style={styles.containerRow}>
            <Text style={styles.tinyText}>Book: </Text>
            <View>{bookLogBox[0]}</View>
          </View>
          <View style={styles.containerRow}>
            <Text style={styles.tinyText}>First Page: </Text>
            <View>{pageFirstLogBox[0]}</View>
          </View>
          <View style={styles.containerRow}>
            <Text style={styles.tinyText}>Last Page: </Text>
            <View >{pageLastLogBox[0]}</View>
          </View>
        </View>
        {
          <View style={{ ...styles.containerRow, flex: 1 }}>
            <View style={styles.containerRow}>
              <Text style={stylem.text}>Notes: </Text>
              <View>{notesLogBox[0]}</View>
            </View>
            <View style={styles.containerRow}>
              <Text style={stylem.text}>Summery: </Text>
              <View>{summeryLogBox[0]}</View>
            </View>
          </View> && !PhoneView()}


        <View style={styles.containerRow}>
          <View style={styles.centeredContainerBlankBackGround}>
            <Pressable onPress={() => autoLog()} >
              <Card style={{ ...styles.paddedCard, backgroundColor: "#ffc20f", margin: 3 }}>
                <Text>Auto Log</Text>
              </Card>

            </Pressable>
          </View>

          <Card style={{ ...styles.containerColoum, backgroundColor: "#ffc20f", margin: 3 }}>

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
          </Card>


          <Card style={{ ...styles.containerColoum, backgroundColor: "#ffc20f", margin: 3 }}>
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
          </Card>
          <Card style={{ ...styles.containerColoum, backgroundColor: "#ffc20f", margin: 3 }}>
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
          </Card>
        </View>
        <View style={styles.containerRowAbove}>{userData['UserName'] && !useDropDown && updateUserBox()}
          {userData['ConnectedAcounts'] &&
            useDropDown &&
            updateConnectedUsers()}</View>

      </View>
    </View>
  ];
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


const stylem = StyleSheet.create({

  paragraphRowFlexable: {
    backgroundColor: 'lightgray',
    flex: 1,

    flexDirection: 'row',
    margin: 3,
    minHeight: 10,
    borderRadius: 5,
    width: '100%', borderRadius: 10,
    borderColor: '#6b6a6f',
    borderWidth: 3,
    //flex: 1,
    //backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },

  parBox: {
    backgroundColor: 'lightgray',
    //flex: 1,


    //flexDirection: 'row',
    margin: 5,
    padding: 2.5,
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: '#6b6a6f',
    borderWidth: 3,
    alignItems: "center",
    alignSelf: "center",
    verticalAlign: "middle"
    //objectFit:'scale-down',
    //textAlign: 'center',
    //flexWrap:'nowrap',
    //textAlignVertical:'auto',
  },
  text: {
    //flex: 0.5,
    //flexShrink: 4,
    //backgroundColor: 'orange',
    //width:'100%',

    //flexDirection:'row',
    margin: 5,
    fontSize: 12,

    fontWeight: 'bold',
    alignSelf: 'center',
  }
});

export default LogBoxes