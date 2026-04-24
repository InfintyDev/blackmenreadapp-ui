import { Text, StyleSheet, View, Button, Pressable, Modal, Dimensions } from 'react-native';
import { useState } from 'react';

// You can import supported modules from npm
import { Card, TextInput } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';
import ScreenSelector from '../Objects/SceneSelector';
import Calandar from '../Objects/Calendar';
import Timer from '../Objects/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '../InfoHolders/User';
import SideBar from '../Objects/SideBar';
import ChangePageButton from '../Objects/ChangePageButton';
import { GetConnectedUser } from '../../GetSaveUserFromServer';
import ChagePageButton from '../Objects/ChangePageButton';
import saveUserToken from '../SaveLoadUserLocal';
import MakeScroll, { MakeScrollHorizontal } from '../Objects/MakeScroll';

import { BarChart, BubbleChart, LineChart, PieChart } from 'react-native-gifted-charts';
import App, { PhoneView } from '../../App';

export default function StudentStatisticsPage() {

  const maxHoursToLog = 8;
  const [userAspects, setUserAspects] = useState({});
  const [shouldSetUserAspects, setShouldSetUserAspects] = useState(true);
  const [window, setWindow] = useState(Dimensions.get('window'))
  const [height, setHeight] = useState(0);
  const [seeConectedUserLogs, setSeeConnectedUserLogs] = useState(false)
  const [viewConnectedLogs, setViewConnectedLogs] = useState(<View></View>)
  const [studentData, setStudentData] = useState(null)
  const getUserToken = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('userToken');

      const data = await JSON.parse(jsonData)

      //console.log(data)
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
  const bookTesting = { Book: 'book', Test: 'test' }
  console.log(Object.keys(bookTesting))
  const findUser = () => { };
  const pressChangeSettings = () => {
    console.log('change')
  }




  const PressedStudent = async (student) => {


    console.log(student['UserName'])

    const data = await GetConnectedUser(student['Email'], student['id'], 'Student')
    if (await data) {
      console.log(data)
      setStudentData(data)


    }



  }
  const studentSelector = (connectedUser = {}) => {
    return (
      <Pressable onPress={() => PressedStudent(connectedUser)}>
        <Card style={{ ...styles.paddedCard, margin: 5, padding: 5 }}>
          <Text>
            {connectedUser['UserName']}



          </Text>
        </Card>
      </Pressable>)
  }

  const studentLogs = (students = '') => {
    return <View style={styles.centerer} onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      setHeight(height);
    }}>

      <View style={styles.containerColoum}>
        {MakeScrollHorizontal(<View style={styles.containerRow}>{userAspects['ConnectedAcounts'].map((connectedUser) => studentSelector(connectedUser))}</View>, 200
        )}
      </View>
    </View>
  }

  const ExtractReadingData = (data) => {

    //console.log(data["Logs"])
    var readingData = []
    if (data["Logs"]) {


      for (let index = 0; index < data["Logs"].length; index++) {
        const element = data["Logs"][index];
        //console.log(element)
        var time = ""
        time = element["Time"]
        //console.log(time)
        const times = time.split('/')
        //console.log(times)
        if (times.length != 3) {
          //console.log("invalid")
        }
        else {

          //console.log("Valid")
          const hours = times[0]
          const minutes = times[1]
          const seconds = times[2]
          console.log("Hours: " + hours + " Minutes: " + minutes + " Seconds: " + seconds)
          if (element["Date"]) {
            const date = new Date(element["Date"]);
            //console.log(date)

            readingData[readingData.length] = { Date: date, Hours: hours, Minutes: minutes, Seconds: seconds }
          }


        }

      }

    }
    //console.log(readingData)
    return readingData;
  }
  const ChartData = (data) => {



    var uniqueDates = []
    var uniqueTimes = []
    var finalData = []
    var newData = []
    var newDataValues = []
    var i = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      var valueOfTimeHours = 0
      var valueOfTimeMinutes = 0
      var valueOfTimeSeconds = 0
      const date = new Date(element["Date"])
      const dateString = (date.getMonth() + 1) + "/" + date.getDate()

      valueOfTimeHours = parseFloat(element["Hours"])
      valueOfTimeMinutes = parseFloat(element["Minutes"])
      valueOfTimeSeconds = parseFloat(element["Seconds"])

      var TotalTimeValue = 0.0;
      if (valueOfTimeMinutes != 0) {


        if (valueOfTimeSeconds != 0) {
          TotalTimeValue = valueOfTimeHours + (valueOfTimeMinutes / 60) + ((valueOfTimeSeconds / 60) / 60)
        }
        else {
          TotalTimeValue = valueOfTimeHours + (valueOfTimeMinutes / 60)
        }
      }
      else {
        TotalTimeValue = valueOfTimeHours
      }

      console.log(TotalTimeValue)
      if (uniqueDates.includes(dateString)) {
        const dateIndex = uniqueDates.indexOf(dateString)
        uniqueTimes[dateIndex] = uniqueTimes[dateIndex] + TotalTimeValue;
      }
      else {
        uniqueDates.push(dateString);
        uniqueTimes.push(TotalTimeValue)
      }

      newData[i] = { value: TotalTimeValue, label: dateString }
      newDataValues[i] = Math.round(TotalTimeValue);
      if (TotalTimeValue == 0) {

      }
      else {
        i++;
      }
    }

    for (let index = 0; index < uniqueDates.length; index++) {
      const element = uniqueDates[index];
      var elementTime = uniqueTimes[index];
      if (elementTime > maxHoursToLog) {
        elementTime = maxHoursToLog;
      }
      finalData[index] = { value: elementTime, label: element }
    }
    var width = 300
    if (PhoneView) {
      width = 175
    }

    return (<View style={styles.centerer}>


      <View style={styles.container}>

        <View style={styles.containerColoum}>
          <View style={styles.containerRow}>
            <View>

            </View>
            <View style={{ ...styles.centeredView, transform: [{ rotate: "90deg" }], flex: .7 }}>
              <Text >
                Hours
              </Text>
            </View>

            <View style={styles.containerNoFlex}>
              <LineChart data={finalData}

                width={200}
                adjustToWidth={true}
                areaChart1={true}
                scrollToEnd={false}

                dataPointsColor1='#ffc20f'
                yAxisTextStyle={styles.tinyTextChart}
                xAxisLabelTextStyle={styles.tinyTextChart}
                xAxisLabelTexts={newDataValues}


              />
            </View>


          </View>
          <View>
            <View style={styles.centeredView}>
              <Text>
                Date
              </Text>
            </View>
          </View>

        </View>
      </View>







    </View>)

  }
  const StudentDataView = (data) => {

    console.log(data)

    const chartData = ExtractReadingData(data)
    return (
      <View style={styles.centerer}>
        <View style={styles.containerColoum}>
          <Text>

          </Text>
          <View>
            {ChartData(chartData)}
          </View>
        </View>

      </View>)
  }
  if (userAspects['UserType'] == 'Student' && studentData == null) {
    setStudentData(userAspects);
  }

  return (
    <View style={{ flex: 1 }}>



      <View style={styles.containerRow}>

        <SideBar />
        <View style={styles.centerer}>
          <View style={styles.containerColoum}>


            <Card style={{ ...styles.paddedCard, padding: 5, margin: 2 }}>
              <Text>Student Statistics</Text>
            </Card>
            <View>
              {userAspects['UserType'] == 'Tutor' && userAspects['ConnectedAcounts'] &&
                studentLogs('Students')
              }
              {userAspects['UserType'] == 'Parent' && userAspects['ConnectedAcounts'] &&
                studentLogs('Children')
              }


            </View>

            {studentData != null && StudentDataView(studentData)}

          </View>


        </View>

      </View>
    </View >
  );
}
