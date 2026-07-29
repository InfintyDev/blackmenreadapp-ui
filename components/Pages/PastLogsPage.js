import { Text, StyleSheet, View, Button, Pressable, Modal } from 'react-native';
import { useEffect, useState, useRef } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
//import SafeAreaView from 'react-native-safe-area-context';
import styles from '../Objects/Styles';
import ScreenSelector from '../Objects/SceneSelector';
import Calandar from '../Objects/Calendar';
import Timer from '../Objects/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBar from '../Objects/SideBar';
import BookLog from '../InfoHolders/BookLog';
import saveUserToken, { getUserToken } from '../SaveLoadUserLocal';

import User, { StudentUser, TuterUser, ParentUser } from '../InfoHolders/User';
import MakeScroll, { MakeScrollHorizontal } from '../Objects/MakeScroll';
import { Screen } from 'expo-router/build/views/Screen';
import { Dimensions } from 'react-native';
import { GetConnectedUser, removeLog, saveUserDataLocaly } from '../../GetSaveUserFromServer';
import App, { PhoneView } from '../../App';


export default function PastLogsPage() {


  const [userAspects, setUserAspects] = useState({});
  const [shouldSetUserAspects, setShouldSetUserAspects] = useState(true);
  const [window, setWindow] = useState(Dimensions.get('window'))
  const [height, setHeight] = useState(0);
  Dimensions.addEventListener('change', ({ window }) => {
    setWindow(window)

  });
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




  function canset(toset) {
    if (shouldSetUserAspects) {
      setUserAspects(toset)
      setShouldSetUserAspects(false)
    }
  }
  async function GetUserAspects() {
    const mostLikelyUser = getUserToken();
    if (mostLikelyUser != null) {
      return await mostLikelyUser;
    }
  };

  async function reload() {
    setShouldSetUserAspects(true)
    await GetUserAspects().then((toset) => canset(toset))
  }
  GetUserAspects().then((toset) => canset(toset))


  const heightFunction = () => {
    return window.height;
  }

  const [seeConectedUserLogs, setSeeConnectedUserLogs] = useState(false)
  const [viewConnectedLogs, setViewConnectedLogs] = useState(<View></View>)


  console.log(userAspects)



  const PressedStudent = async (student) => {


    console.log(student['UserName'])

    const data = await GetConnectedUser(student['Email'], student['id'], 'Student')
    if (await data) {
      console.log(await data)

      const studentLogs = <View style={{ flex: 3 }}>{MakeScroll(await data['Logs'].map((log) => GetTheLogLook(log['Notes'], log['Summery'],
        log['Book'], log['PageFirst'], log['PageLast'],
        log['Time'], log['Date'], log['LoggedForName'],
        log['LoggedUnderName'], data['Email'], data["UserType"], data["_id"], log, data['Logs'].indexOf(log), () => { reload() })).reverse()
        , window.height - height)}</View>

      setSeeConnectedUserLogs(true)
      setViewConnectedLogs(studentLogs)




    }



  }

  const studentSelector = (connectedUser = {}) => {
    return (
      <Pressable onPress={() => PressedStudent(connectedUser)}>
        <Card style={styles.paddedCard}>
          <Text>
            {connectedUser['UserName']}



          </Text>
        </Card>
      </Pressable>)
  }


  const ConnectedLogsPopUp = () => {
    return (<Modal visible={seeConectedUserLogs} onRequestClose={() => setSeeConnectedUserLogs(false)} animationType="slide"
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={{
          alignContent: 'center', backgroundColor: 'white', shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          borderRadius: 10,
        }}>
          <View style={styles.cornerView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setSeeConnectedUserLogs(false)}>
              <Text>X</Text>
            </Pressable>
          </View>
          <View style={{ ...styles.modalViewNoShadows, padding: 10 }}>



          </View>
        </View>
      </View>
    </Modal>)
  }


  const studentLogs = (students = '') => {
    return <View style={styles.centerer} onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      setHeight(height);
    }}><Card style={styles.paddedCard}><Text>{students}</Text></Card>

      <View style={styles.containerColoum}>
        {MakeScrollHorizontal(<View style={styles.containerRow}>{userAspects['ConnectedAcounts'].map((connectedUser) => studentSelector(connectedUser))}</View>, 200
        )}
      </View>
    </View>
  }

  console.log(userAspects)
  console.log(" Window Height: " + window.height)



  return (
    <View style={styles.containerRow}>
      <SideBar />

      <View style={styles.container}>

        {userAspects['UserType'] == 'Tutor' && userAspects['ConnectedAcounts'] &&
          studentLogs('Students')
        }
        {userAspects['UserType'] == 'Parent' && userAspects['ConnectedAcounts'] &&
          studentLogs('Children')
        }

        {viewConnectedLogs}

        {userAspects['UserType'] == 'Student' && MakeScroll(
          userAspects['Logs'] &&
          userAspects['Logs'].map((log) => GetTheLogLook(log['Notes'], log['Summery'], log['Book'], log['PageFirst'], log['PageLast'], log['Time'], log['Date'], log['LoggedForName'], log['LoggedUnderName'], userAspects['Email'], userAspects['UserType'], userAspects['_id'], log, userAspects['Logs'].indexOf(log), () => reload())).reverse()
          , heightFunction
        )}



      </View>




    </View >
  );
}

async function removeDaLog(userEmail, userId, userType, userLog, logIndex, reaction) {
  removeLog(userEmail, userId, userType, userLog, logIndex)
  //const [useReload, setUseReload] = useState(true)
  var usertoken = await getUserToken()


  var logs = await usertoken["Logs"];

  const arrayTest = ["", ""]
  console.log(typeof (arrayTest))


  if (logs.length == 0) {
    logs = []
  }
  logs.splice(logIndex, 1)



  usertoken["Logs"] = logs

  await saveUserToken(usertoken)
  reaction()
  //setUseReload(false)


}

function GetTheLogLook(notes, summery, bookName, fristPage, lastPage, time, date = new Date, studentName, loggedUnderName, userEmail, userType, userId, userLog, logIndex, reaction) {
  //const [deleteLogButton, setDeleteLogButton] = useState(false)

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
  function getTimeLook(time) {
    const hr = String(time).split("/")[0];
    const min = String(time).split("/")[1];
    var returnString = "";
    console.log(hr + "HR")
    console.log(min + "MIN")
    if (parseInt(hr) != 0) {
      returnString = hr + " Hours"

      if (parseInt(min) != 0) {
        returnString = hr + " Hours, " + min + " Minutes"
      }

    }
    else if (parseInt(min) != 0) {
      returnString = min + " Minutes"
      console.log("MINtest")
    }
    return returnString


  }
  const DisplayDay = (dateMade = new Date) => {
    console.log(Date(dateMade))

    const dateInst = new Date(dateMade)
    return (
      (dateInst.getMonth() + 1) +
      '/' +
      dateInst.getDate() +
      '/' +
      dateInst.getFullYear()
    );
  }
  const DisplayBox = (
    dispText,
    sty = styles.paragraphFlexable,
    textSty = styles.textStyle
  ) => {
    return (
      <View style={{ ...sty, flex: 1, flexGrow: 1 }} >
        <Text style={{ ...textSty, textAlign: 'center', textAlignVertical: 'center', flexWrap: 'nowrap', padding: 2, alignSelf: 'center', flexShrink: 1 }} > {dispText} </Text>
      </View>
    );
  }
  const notesLogBox = DisplayBox('Notes: ' + notes, styles.paragraphRowFlexable);
  const summeryLogBox = DisplayBox('Summery: ' + summery, styles.paragraphRowFlexable);
  const bookLogBox = DisplayBox(
    'Read "' + bookName + '" From Page ' + fristPage + ' To Page ' + lastPage,
    styles.paragraphRowFlexable
  );

  const timeBox = DisplayBox(
    'Time Read: ' + getTimeLook(time),
    styles.paragraphRowFlexable
  );
  const dateBox = DisplayBox(
    'Date: ' + DisplayDay(date),
    styles.paragraphRowFlexable
  );
  const logForBox = DisplayBox(
    'Reading Log For ' + studentName,
    styles.paragraphRowFlexable
  );
  const loggedUnderBox = DisplayBox(
    'Reading Logged By ' + loggedUnderName,
    styles.paragraphRowFlexable
  );
  var sty = styles.logView
  if (PhoneView()) {
    sty = { ...styles.logView, maxWidth: 300 };
  }
  var deleteLogButton = true;
  //const [deleteLogButton, setDeleteLogButton] = useState(false)

  //const deleteLogButton = useRef(true);
  const changeDeleteLogButton = () => {

    //deleteLogButton = true

  }
  const DeleteLogButtonPressed = (log) => {
    console.log("Delete")

    removeDaLog(userEmail, userId, userType, userLog, logIndex, () => reaction())

    //deleteLogButton = true

  }

  return (
    <View style={sty}>
      <View style={styles.cornerView}>
        <View style={styles.containerRow}>
          {deleteLogButton && <View><Button title='Delete' onPress={() => DeleteLogButtonPressed()}></Button></View>}
          {false && <Button title='...' onPress={() => DeleteLogButtonPressed()}></Button>}
        </View>


      </View>

      <View style={styles.centerer}>{logForBox}</View>
      <View style={styles.centerer}>{loggedUnderBox}</View>
      <View style={styles.centerer}>{bookLogBox}</View>
      <View style={styles.centerer}>{notes != '' && notesLogBox}</View>
      <View style={styles.centerer}>{summery != '' && summeryLogBox}</View>
      <View style={{ ...styles.centerer, flexDirection: 'row', flexWrap: 'wrap', flex: 1, flexShrink: 1 }}>
        <View style={styles.centerer}>{timeBox}</View>
        <View style={styles.centerer}>{dateBox}</View>
      </View>




    </View>
  );
}
