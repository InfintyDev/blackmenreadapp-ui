import { Text, StyleSheet, View, Button, Pressable, Modal } from 'react-native';
import { useState } from 'react';

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
import { GetConnectedUser } from '../../GetSaveUserFromServer';
import App, { PhoneView } from '../../App';




function GetTheLogLook(notes, summery, bookName, fristPage, lastPage, time, date = new Date, studentName, loggedUnderName) {
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
    'Time Read: ' + displayTime(time),
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
  return (
    <View style={sty}>

      <View>{logForBox}</View>
      <View>{loggedUnderBox}</View>
      <View>{bookLogBox}</View>
      <View>{notes != '' && notesLogBox}</View>
      <View>{summery != '' && summeryLogBox}</View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, flexShrink: 1 }}>
        <View>{timeBox}</View>
        <View>{dateBox}</View>
      </View>




    </View>
  );
}

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
  const heightFunction = () => {
    return window.height;
  }

  const [seeConectedUserLogs, setSeeConnectedUserLogs] = useState(false)
  const [viewConnectedLogs, setViewConnectedLogs] = useState(<View></View>)

  GetUserAspects().then((toset) => canset(toset))
  console.log(userAspects)



  const PressedStudent = async (student) => {


    console.log(student['UserName'])

    const data = await GetConnectedUser(student['Email'], student['id'], 'Student')
    if (await data) {
      console.log(await data)

      const studentLogs = <View style={{ flex: 3 }}>{MakeScroll(await data['Logs'].map((log) => GetTheLogLook(log['Notes'], log['Summery'],
        log['Book'], log['PageFirst'], log['PageLast'],
        log['Time'], log['Date'], log['LoggedForName'],
        log['LoggedUnderName']))
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
          userAspects['Logs'].map((log) => GetTheLogLook(log['Notes'], log['Summery'], log['Book'], log['PageFirst'], log['PageLast'], log['Time'], log['Date'], log['LoggedForName'], log['LoggedUnderName']))
          , heightFunction
        )}



      </View>




    </View >
  );
}
