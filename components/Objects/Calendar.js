import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  LogBox,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import styles from './Styles';

import React, { useState, data, Component, useCallback, useMemo } from 'react';
import PopUpBox from './PopUp';
import TypeBox from './TypeBox';
import CalendarDay from './CalanderDay';
import { CalendarDayProps, EventProps } from './CalanderTypes'


const daysDisplay = (day) => {
  return (
    <View style={styles.calanderDayBlock}>
      <Text style={styles.dayOfTheWeekText}>{day}</Text>
    </View>
  );
};

class DispCal {
  constructor(calday) {
    //console.log(calday);

    this.calday = calday;
  }

  Display() {
    return this.calday;
  }
}

const daysOfTheWeek = () => {
  var dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i <= dayList.length - 1; i++) {
    dayList[i] = daysDisplay(dayList[i]);
  }

  return <View style={styles.calanderMonth}>{dayList}</View>;
};

function practiclyTheSame(dateStart = new Date(), dateEnd = new Date()) {
  //console.log('Run')

  const dateStartDate = dateStart.getDate()
  const dateStartMonth = dateStart.getMonth()
  const dateStartYear = dateStart.getFullYear()

  const dateEndDate = dateEnd.getDate()
  const dateEndMonth = dateEnd.getMonth()
  const dateEndYear = dateEnd.getFullYear()

  if (dateEndDate == dateStartDate & dateStartYear == dateEndYear && dateEndMonth == dateStartMonth) {
    return true
  }
  else {
    return false
  }



}

function GetEventsOnDay(day = new Date(), events = []) {
  //console.log('Events')
  var eventsOnDay = [];
  //console.log(events)
  for (let index = 0; index < events.length; index++) {
    const element = events[index];
    //console.log(element['StartDay'])

    const same = practiclyTheSame(day, new Date(element['StartDay']))


    if (same) {

      const item = [element["Title"], element["Start"], element["End"]]
      //console.log(element['Title'])
      eventsOnDay[eventsOnDay.length] = item

    }

  }

  return eventsOnDay;


}

const CalanderMonth = (year = 0, month = 0, events = []) => {
  console.log('Calander Start')
  console.log(events)
  /*
  const fakeProps = {
    fullDate: new Date(),
    events: [],
  };*/

  const fakeProps = new CalendarDayProps()

  const getEventOnTheDay = (theDay) => {
    //console.log(theDay)
    const dayevents = GetEventsOnDay(theDay, events);
    //console.log(dayevents)
    return dayevents;
  }
  var dayList = []
  // const [dayList, setDayList] = useState([new CalendarDay(fakeProps)]);
  //console.log(year + ' : ' + month + 'canander');
  const getDays = (year, month) => new Date(year, month, 0).getDate();
  //console.log(dayList[0])
  const getDateFromDay = (year, month, day) => {
    return new Date(year, month, day);
  };

  const days = getDays(year, month + 1);
  //console.log(days + ':days in month');
  const getOffset = () => {
    const offset = getDateFromDay(year, month, 1);
    const listOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i <= 7; i++) {
      if (offset.toDateString().includes(listOfDays[i])) {
        return i;
      }
    }
  };

  const theOffSet = getOffset();

  var loo = 0;
  for (let i = theOffSet; i >= 0; i--) {
    //console.log('day1')
    //console.log(getDateFromDay(year, month, -i + 1)+" : "+i);
    loo += 1;
    const theday = getDateFromDay(year, month, -i + 1);
    const eventsOnDay = getEventOnTheDay(theday, events);
    //console.log(eventsOnDay)
    /*
    const calProps = {
      fullDate: theday,
      events: eventsOnDay,
    };*/
    const calProps = new CalendarDayProps(eventsOnDay, theday)

    dayList[loo] = new CalendarDay(calProps);
  }
  //console.log('test');

  var daysGone = 0;
  for (let i = 1; i <= days + 1; i++) {
    //console.log('day2')
    const theday = getDateFromDay(year, month, i);
    const eventsOnDay = getEventOnTheDay(theday, events);
    //console.log(eventsOnDay)
    /*
    const calProps = {
      fullDate: theday,
      events: eventsOnDay,
    };*/
    const calProps = new CalendarDayProps(eventsOnDay, theday)
    dayList[i + theOffSet] = new CalendarDay(calProps);

    daysGone = i;
  }

  if (dayList.length != 43) {

    if (dayList.length < 43) {
      while (dayList.length < 43) {
        //console.log('day3')
        //console.log(year + '/' + month + '/' + daysGone);
        const theday = getDateFromDay(year, month, daysGone + 1);
        const eventsOnDay = getEventOnTheDay(theday, events);
        //console.log(eventsOnDay)
        /*
    const calProps = {
      fullDate: theday,
      events: eventsOnDay,
    };*/
        const calProps = new CalendarDayProps(eventsOnDay, theday)
        dayList[loo + daysGone] = new CalendarDay(calProps);

        daysGone++;
      }
    } else {
      //console.log(dayList.length - 43 + 'to long');
    }
  } else {
    //console.log(daysGone + ':');
    /*
    if (loo + daysGone < 42) {

      //console.log('returned blank');
      while (loo + daysGone < 42) {
        console.log('day4')
        //console.log('loop');
        const theday = getDateFromDay(year, month, daysGone + 1);
        console.log(theday)
        const eventsOnDay = getEventOnTheDay(theday, events);
        //console.log(eventsOnDay)
        const calProps = {
          fullDate: theday,
          events: eventsOnDay,
        };
        dayList[loo + daysGone] = new CalendarDay(calProps);
        daysGone++;
      }
    }
      */
  }
  console.log('Calander End')
  //console.log(dayList.length + 'list Length');
  //console.log('calanderRendered');
  //console.log(dayList)

  return dayList;
};

const DateSelector = (events = []) => {
  console.log(events)
  //console.log(new Date(2025,0,29)+'month')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [curentCalander, setCurentCalander] = useState(
    CalanderMonth(selectedYear, selectedMonth, events)
  );
  //console.log('CalInstant')
  console.log(parseInt(selectedMonth, 10) + ':' + parseInt(selectedYear, 10));

  //const [changeCalander, setChangeCalander] = useState(false);
  const changeCalander = false;

  const yearInputBox = (
    <TextInput
      onChangeText={(theYear) => ChangeCalanderPage(theYear, selectedMonth)}
      defaultValue={new Date().getFullYear()}></TextInput>
  );

  const monthInputBox = (
    <TextInput
      onChangeText={(theMonth) =>
        ChangeCalanderPage(selectedYear, parseInt(theMonth, 10) - 1)
      }
      defaultValue={new Date().getMonth() + 1}></TextInput>
  );

  const RenderCalander = () => {
    console.log(events)
    var calImprove = [new CalendarDay()]
    var i = 0;
    curentCalander.map((cal) => {

      const calanderW = cal.state

      if (GetEventsOnDay(calanderW['date'], events)) {

        const theEvents = GetEventsOnDay(calanderW['date'], events);
        calImprove[i] = new CalendarDay(new CalendarDayProps(theEvents, calanderW['date']))

      }


      i += 1;

    })
    //setCurentCalander(calImprove)
    //console.log(calImprove)
    return (
      <View style={styles.calanderMonth}>
        {calImprove
          .map((calInst) => calInst.Display())}
      </View>
    );
  };

  const ChangeCalanderPage = (toYear = '', toMonth = '') => {
    console.log(
      'change from:' +
      selectedYear +
      ' : ' +
      selectedMonth +
      ' to : ' +
      toYear +
      ' : ' +
      toMonth
    );

    if (
      (/^\d+$/.test(toMonth) &&
        changeCalander != true &&
        /^\d+$/.test(toYear) &&
        parseInt(toMonth, 10) != selectedMonth) ||
      parseInt(toYear, 10) != selectedYear
    ) {
      console.log(parseInt(toMonth, 10) + ':' + parseInt(toYear, 10));



      setSelectedYear(parseInt(toYear, 10));
      setSelectedMonth(parseInt(toMonth, 10));
      //console.log('before')
      setCurentCalander(
        CalanderMonth(parseInt(toYear, 10), parseInt(toMonth, 10), events)
      );
      //console.log('after')

      //updateDatesInInput();
    }
  };
  //ChangeCalanderPage(selectedYear, selectedMonth)
  return (
    <View style={styles.calanderWrap}>


      <View style={{ ...styles.containerColoum, }}>


        <View >
          <View style={styles.containerRow}>
            <View style={{ ...styles.flexDefaltBlank }}> <Button style={styles.button}></Button></View>
            <View style={styles.calanderInput}>
              <Text style={styles.monthInput}>Year:{yearInputBox}</Text>
              <Text style={styles.monthInput}>Month:{monthInputBox}</Text>
            </View>
            <View style={{ ...styles.flexDefaltBlank }}><Button style={styles.button}></Button></View>
          </View>
        </View>

        <View style={styles.rightSideContainer}>
          <View style={styles.daysOfTheWeekContainer}>{daysOfTheWeek()}</View>
          <View style={styles.calanderContainer}>{RenderCalander()}</View>
        </View>
      </View>


    </View >
  );
};

export default function Calandar(events = []) {



  console.log(events);

  const getDays = (year, month) => new Date(year, month, 0).getDate();

  const days = getDays(new Date().getFullYear(), new Date().getMonth());


  if (events != []) {
    const dateselect = DateSelector(events);
    return (
      <View style={styles.container}>
        {dateselect}
      </View>
    );
  }

}
