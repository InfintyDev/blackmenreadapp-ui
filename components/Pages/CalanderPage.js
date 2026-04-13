import { Text, StyleSheet, View, Button } from 'react-native';

import { useState } from 'react';

// You can import supported modules from npm
import { Card, Title } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';

import Calendar from '../Objects/Calendar';
import SideBar from '../Objects/SideBar';
import MakeScroll from '../Objects/MakeScroll'
import { fetchCalendar } from '../../GetSaveUserFromServer';
import App, { PhoneView } from '../../App';



export default function CalanderPage() {

  const [calenderSet, setCalenderSet] = useState(false);
  const [calenderData, setCalenderData] = useState([]);
  const [calender, setCalendar] = useState(Calendar(calenderData));

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
      setCalenderData(eventNewList)


    }
  }


  interprateData()
  var scale = 1.0;
  var margen = 0;
  if (PhoneView()) {
    scale = 1.0;
    margen = 0;
  }
  else {
    scale = 1.2;
    margen = 40;
  }
  const CalandarWithEvents = <View>{Calendar(calenderData)}</View>
  const CalandarWithEventsLarge = <View style={{ transform: [{ scale: scale }], marginTop: margen }}>{Calendar(calenderData)}</View>


  return (
    <View style={styles.container}>

      <View style={styles.containerRow}>
        <SideBar />

        {MakeScroll(CalandarWithEventsLarge, 500 * scale)}

      </View>
    </View>
  );
}
