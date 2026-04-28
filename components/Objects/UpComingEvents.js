import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';


import { Card } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';

import { fetchCalendar } from '../../GetSaveUserFromServer';
import User from '../InfoHolders/User';




const UpCommingEvents = () => {

  const [calenderSet, setCalenderSet] = useState(false);
  const [calenderData, setCalenderData] = useState([]);


  const calculateDiff = (startDate, endDate) => {

    const diffMs = Math.abs(endDate - startDate); // Difference in milliseconds

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);


    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
  };

  const practiclyTheSame = (dateStart = new Date(), dateEnd = new Date()) => {

    if (dateStart.getDate() == dateEnd.getDate() & dateStart.getFullYear() == dateEnd.getFullYear() && dateEnd.getMonth() == dateStart.getMonth()) {
      return true
    }
    else {
      return false
    }



  }
  const interprateData = async () => {
    if (calenderSet == false) {
      const data = await fetchCalendar()
      //console.log(await data)
      var eventNewList = []
      for (let index = 0; index < data.length; index++) {
        var eventNew = {}


        const start = new Date(data[index]['Start Time'])
        const end = new Date(data[index]['End Time'])
        eventNew['Start'] = start
        eventNew['End'] = end
        eventNew['Duration'] = calculateDiff(start, end)
        eventNew['Title'] = data[index]['Event Name']
        const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
        const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate())
        //console.log(startDay)
        //console.log(endDay)
        eventNew['StartDay'] = [startDay]
        if (practiclyTheSame(startDay, endDay)) {
          console.log("spansOneDay")
          eventNew['SpansDays'] = [startDay]
        }
        else {
          eventNew['SpansDays'] = [startDay]
          var daysSpanned = []





        }

        //eventNew['Day'] = st
        eventNewList[index] = eventNew




      }
      console.log(eventNewList)
      setCalenderSet(true)
      //setCalenderData(eventNewList)
      var recentDates = [];
      var i = 0;
      for (let index = 0; index < eventNewList.length; index++) {
        const element = eventNewList[index];


        //console.log(element['Start'])
        if (element['Start'].getMonth() == new Date().getMonth()) {
          recentDates[i] = [element['Title'], element['Start'], element['End']]
          i += 1;
        }
      }
      setCalenderData(recentDates)


    }
  }


  interprateData()
  const getTime = (date) => {
    var minutes = '';
    var hours = '';
    var amOrPm = '';


    if (date.getMinutes() == 0) {
      minutes = '00'
    }
    else {
      minutes = String(date.getMinutes());
    }
    if (date.getHours() > 12) {
      hours = date.getHours() - 12;
      amOrPm = 'PM'
    }
    else {
      hours = date.getHours();
      amOrPm = 'AM'
    }
    const timeDisplay = (hours + ":" + minutes + ' ' + amOrPm)

    //console.log(timeDisplay)
    return timeDisplay
  }

  const interprateCalenderMap = (eventsTitles = []) => {

    var mapDatas = []
    var i = 0;
    eventsTitles.map((theData) => {
      //console.log(theData)
      const title = theData[0]
      const dateStart = new Date(theData[1])
      const dateEnd = new Date(theData[2])

      const dateDisplay = (dateStart.getMonth() + 1) + "/" + dateStart.getDate() + "/" + dateStart.getFullYear()
      const timeDisplayStart = getTime(dateStart)
      const timeDisplayEnd = getTime(dateEnd)
      mapDatas[i] = <View style={{ ...styles.centerer, padding: 8 }}><Text>{title} : {dateDisplay}</Text>
        <Text>{timeDisplayStart} to {timeDisplayEnd}</Text>
      </View>
      i += 1;
    })
    return mapDatas;




  }



  return (
    <View style={styles.centerer}>
      <Card style={styles.paddedCard}>
        <Text style={{ ...styles.largeText, justifyContent: 'center', alignItems: 'center' }}>Upcomming Events</Text>

        <View style={styles.centeredView}>

          <Text style={styles.textStyle}>Event Placement</Text>
          <View>{interprateCalenderMap(calenderData)}</View>
        </View>


      </Card>
    </View>
  );
};
export default UpCommingEvents