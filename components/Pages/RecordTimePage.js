

// You can import supported modules from npm


// or any files within the Snack

import styles from '../Objects/Styles';
import ScreenSelector from '../Objects/SceneSelector';

//import LogBoxes from '../Objects/LogBoxes';
import SideBar from '../Objects/SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import App, { PhoneView } from '../../App';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  Modal,
  Pressable,
  SafeAreaProvider

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { useState, data, useEffect } from 'react';
import TypeBox, {
  InputBoxClass,
  InputBoxNumbers,
  InputBoxNumbersClass,
} from '../Objects/TypeBox';
import { Card } from 'react-native-paper';
//import textfile from '../assets/BookLogsText.txt';
import BookLog from '../InfoHolders/BookLog.js';

import User, { StudentUser } from '../InfoHolders/User';
import UserHolder from '../InfoHolders/UserHolder';


import saveUserToken from '../SaveLoadUserLocal';
import { addUserLogs, GetConnectedUser } from '../../GetSaveUserFromServer'

import MakeScroll from '../Objects/MakeScroll.js';
import { PopUpBox } from '../Objects/PopUp';


const MakeImage = (imageSource, width = 0, height = 0, upOffSet, sideOffset) => {




  return (
    <Image
      style={{ ...styles.scaledImage, width: width, height: height, transform: [{ translateY: upOffSet }] }}
      source={imageSource}

    />
  );
};
const BallonImage = (requiredImage, speed = 1) => {

  //const requireString = '../../assets/BallonsForCelebration' + color + '.png'
  //console.log(requireString)
  const [upOffset, setUpOffset] = useState(0)
  const [offsetActive, setOffsetActive] = useState(true);
  useEffect(() => {
    let interval;
    if (offsetActive) {
      interval = setInterval(() => {
        setUpOffset((prevSeconds) => prevSeconds - (1 * speed));
      }, 10);
    }


    return () => clearInterval(interval);
  }, [offsetActive, upOffset]);

  return (
    MakeImage(requiredImage, 100, 100, upOffset)

  )


}

export default function RecordTimePage() {
  //const onPhone = PhoneView();
  const [userAspects, setUserAspects] = useState({});
  const [shouldSetUserAspects, setShouldSetUserAspects] = useState(true);
  const [celebration, setCelebration] = useState(false);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const getUserToken = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('userToken');

      const data = await JSON.parse(jsonData)

      console.log(data)
      return data
    } catch (error) {
      // Handle reading error
      console.log('falure to retrive');
    }
  };
  async function GetUserAspects() {
    const mostLikelyUser = getUserToken();
    if (mostLikelyUser != null) {
      return await mostLikelyUser;
    }
  };
  function canset(toset) {
    if (shouldSetUserAspects) {
      setUserAspects(toset)
      setShouldSetUserAspects(false)
    }
  }
  GetUserAspects().then((toset) => canset(toset))
  //console.log(userAspects)


  const Timer = () => {
    const [timerTime, setTimerTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
      let interval;
      if (timerActive) {
        interval = setInterval(() => {
          setTimerTime((prevSeconds) => prevSeconds + 1);
        }, 1000);
      }

      return () => clearInterval(interval);
    }, [timerActive, timerTime]);

    const startTimer = () => {
      setTimerActive(true);
    };

    const stopTimer = () => {
      setTimerActive(false);
    };
    const resetTimer = () => {
      setTimerActive(false);
      setTimerTime(0);
    };

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
      return hours + ':' + minutes + ':' + seconds;
    };


    return [
      <View style={styles.shrinkDown}>
        <View style={{ ...styles.timerView, margin: 0, maxHeight: "50%" }}>
          <Text style={styles.timeDisplay}>Stopwatch</Text>
          <Text style={styles.timeDisplay}>{displayTime(timerTime)}</Text>
          <View style={styles.containerOfStuffRidged}>

            {!timerActive && <Pressable
              title="Start"
              style={styles.timerButtonFixed}
              onPress={() => startTimer()}><Text>Start</Text></Pressable>}
            {timerActive && <Pressable
              title="Pause"
              style={styles.timerButtonFixed}
              onPress={() => stopTimer()}><Text>Pause</Text></Pressable>}
            <Pressable
              title="Reset"
              style={styles.timerButtonFixed}
              onPress={() => resetTimer()}><Text>Reset</Text></Pressable>

            <Pressable
              title="AutoLog"
              style={styles.timerButtonFixed}
              onPress={() => autoLog()}><Text>Auto Log</Text></Pressable>
          </View>


        </View>
      </View>,
      timerTime,
    ];
  };


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

  const timeLoggedCelebration = () => {
    console.log("Celebration")
    setCelebrationVisible(true)

  }
  const celebrationOver = () => {

    setCelebrationVisible(false)

  }

  const generateRandomNumber = (min, max) => {

    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number
  };
  const CelebrationComponent = () => {
    const upOffset = 650;
    const leftOffset = 0;


    return (
      <View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={celebrationVisible}

          onRequestClose={() => setCelebrationVisible(!celebrationVisible)}>

          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset, left: leftOffset, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationBlue.png'))}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 20, left: leftOffset + 90, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationGreen.png'), 1.3)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 60, left: leftOffset + 20, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationRed.png'), 2)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 10, left: leftOffset + 10, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationYellow.png'), 1.1)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 50, left: leftOffset + 39, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationOrange.png'), 1.32)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 50, left: leftOffset + 200, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationBlue.png'), 1.32)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 50, left: leftOffset + 236, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationRed.png'), 1.21)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 50, left: leftOffset + 164, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationGreen.png'), 1.21)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 50, left: leftOffset + 340, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationBlue.png'), 1.21)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 50, left: leftOffset + 400, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationRed.png'), 1.6)}
          </View>
          <View style={{ ...styles.centeredViewMiddleDown, top: upOffset + 10, left: leftOffset + 500, height: 100, width: 100 }}>
            {BallonImage(require('../../assets/BallonsForCelebrationYellow.png'), 1.1)}
          </View>






          <View style={styles.centeredView}>

            <Pressable onPress={() => { celebrationOver() }}>


              <Card style={{ ...styles.paddedCard, padding: 23 }}>
                <View>
                  <Text>
                    Congradulations You Logged Time

                  </Text>
                  <Text>

                    Press Here To Continue
                  </Text>


                </View>
              </Card>

            </Pressable>


          </View>


        </Modal>

      </View>)
  }
  const [secondsValue, setSecondsValue] = useState('0');
  const [minutesValue, setMinutesValue] = useState('0');
  const [hoursValue, setHoursValue] = useState('0');

  const LogBoxes = (time, userData = {}) => {
    //const [logInst, setLogInst] = useState();
    const styView = styles.centeredContainerBlankBackGround;
    const notesLogBox = TypeBox('Notes', '', styles.paragraphBox, styles.textStyle, true);
    const summeryLogBox = TypeBox('Summery', '', styles.paragraphBox, styles.textStyle, true);
    const bookLogBox = TypeBox('', '', styView, styles.textStyle, true, stylem.parBox);
    const [invalidLog, setInvalidLog] = useState(false)
    const [logError, setLogError] = useState("");



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
        <View style={{ ...styles.flexDefaltAbsolute, top: 2 }}>
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

    const LogButtonPressed = () => {

      var invalidTimeBool = parseInt(hoursValue) == 0 && parseInt(minutesValue) == 0 && parseInt(secondsValue) == 0;
      var invalidLogBool = bookLogBox[1] == "" || pageFirstLogBox[1] == "" || pageLastLogBox[1] == "" || invalidTimeBool;


      console.log('pressed');
      console.log(bookLogBox[1])
      console.log(pageFirstLogBox[1])
      console.log(pageFirstLogBox[1])
      if (invalidLogBool) {
        console.log("Invalid")
        setInvalidLog(true);
        var toSetLogError = "";
        if (bookLogBox[1] == "") {
          toSetLogError = "Please put a book name"
        }
        if (pageFirstLogBox[1] == "") {
          toSetLogError = toSetLogError + ":Please put a First Page"
        }
        if (pageLastLogBox[1] == "") {
          toSetLogError = toSetLogError + ":Please put a Last Page"
        }
        if (invalidTimeBool) {
          toSetLogError = toSetLogError + ":Please put a Time"
        }
        setLogError(toSetLogError)



      }
      else {
        setInvalidLog(false);
      }

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
      var stringTest = "adf"

      if (studentSelectorValue['_id']) {
        theLog = {
          LoggedFor: studentSelectorValue['_id'],
          LoggedForName: studentSelectorValue['UserName'],
          LoggedUnder: userData['_id'],
          LoggedUnderName: userData["UserName"],
          LoggedUnderType: userData['UserType'],
          Book: bookLogBox[1].toLowerCase(),
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
          Book: bookLogBox[1].toLowerCase(),
          Time: hoursValue + '/' + minutesValue + "/" + secondsValue,
          Notes: notesLogBox[1],
          PageFirst: pageFirstLogBox[1],
          PageLast: pageLastLogBox[1],
          Summery: summeryLogBox[1],
          Date: new Date()
        }
      }

      //setLogInst(theLog);


      if (invalidLogBool) {
        console.log("Invalid")
        setInvalidLog(true);
      }
      else {

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
          //clearLogBoxes()
          addUserLogs(userData['Email'], userData['_id'], userData['UserType'], theLog)
        }
        else {
          //clearLogBoxes()
          addUserLogs(studentSelectorValue['Email'], studentSelectorValue['id'], 'Student', theLog)

        }
        timeLoggedCelebration()
        clearLogBoxes()
      }




    };



    const [connectedUsers, setConnectedUsers] = useState(null)
    const [prevOption, setPrevOption] = useState(true)

    const updatePressed = () => {
      console.log('Update')
    }

    const clearLogBoxes = () => {
      ChangeValueHrs('0')
      ChangeValueMin('0')
      ChangeValueSec('0')
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
          {invalidLog && <Card style={{ ...styles.centeredContainer, padding: 2 }}>{invalidLog && <Text style={{ ...styles.tinyText, fontSize: 10 }}>Invalid Log: {logError}</Text>}</Card>}
          <View style={styles.container}>{userData['UserName'] && !useDropDown && updateUserBox()}
            {userData['ConnectedAcounts'] &&
              useDropDown &&
              updateConnectedUsers()}</View>

          <View style={styles.logButton}>
            <Pressable

              onPress={() => LogButtonPressed()}><Card style={{ ...styles.paddedCard, margin: 5, backgroundColor: "#ffc20f" }}><Text>Log Time</Text></Card></Pressable>
          </View>

        </View>
      </View>
    ];

  };


  const stopWatch = Timer();
  const theLogBox = LogBoxes(stopWatch[1], userAspects);

  const autoLog = () => {
    const theTimeStates = displayTime(stopWatch[1]);
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




  var onPhone = false;
  onPhone = PhoneView();
  if (onPhone) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.containerRow}>
          <SideBar />
          <View style={{ ...styles.containerColoum, flex: 1 }}>
            <View style={{ transform: [{ scale: .875 }], flex: .9 }}>{stopWatch[0]}</View>
            <View style={{ transform: [{ scale: .9, }], flex: 2 }}>{theLogBox[0]}</View>
          </View>
        </SafeAreaView>
        <CelebrationComponent />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.containerRow}>
          <SideBar />
          <View style={styles.containerPlain}>
            {stopWatch[0]}
            {theLogBox[0]}
          </View>
        </SafeAreaView>
        <CelebrationComponent />
      </View>
    );
  }

}

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

