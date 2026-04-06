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

import React, {
  useState,
  data,
  Component,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { PopUpBoxCalander } from './PopUp';

import { CalendarDayProps, EventProps } from './CalanderTypes'
import { Card } from 'react-native-paper';
import App, { PhoneView } from '../../App';


const calanderBlockWidth = () => {

  if (PhoneView) {
    return (40)
  }
  else {
    return (50)
  }
}
// If you have custom components, import them:
// import PopUpBox from "./PopUpBox";
// import EventAdderInterface from "./EventAdderInterface";
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
export default class CalendarDay extends Component {
  constructor(props = new CalendarDayProps()) {
    super(props);
    //console.log('DayMade')

    this.fullDate = props['fullDate'];
    this.day = props['fullDate'].getDate();
    this.sty = { ...styles.calanderBlock, maxWidth: calanderBlockWidth() };
    this.styEvents = styles.calanderBlockWithEvents;
    //const eventTest = ['a']
    this.state = {
      date: props['fullDate'],
      events: props['events'],
      dateStart: props['dateStart'],
      dateEnd: props['dateEnd'],
    };
    if (props['events']) {

    }
    if (props['fullDate'].getTime() == new Date().getTime()) {

    }
    else {





      //console.log(this.state)
    }
  }


  TestDisp() {



  }

  MakeEvent(eventName) {
    return <Card style={{ ...styles.centerer, padding: 0.5, flex: .5 }}>
      <Text style={{ ...styles.calanderText, fontSize: 6, padding: 1 }}>{eventName}</Text>
    </Card>;
  }
  Display() {



    const clickLink = <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ ...styles.calanderText, fontSize: 10 }}>
          {this.day}
        </Text>
      </View>

      <View style={{ ...styles.centererNoFlex, transform: [{ scale: 0.75 }], flex: 5 }}>



        {this.state.events.map((event) => { return this.MakeEvent(event) })}

      </View>
    </View>;



    //console.log(this.state.events)
    const amountOfEvents = this.state.events.length
    if (amountOfEvents) {
      const calDisp = PopUpBoxCalander(
        clickLink,
        this.sty,
        this.fullDate,
        this.day,
        this,
        EventHolder(this.state.events, this.state.dateStart, this.state.dateEnd)
      );
      return <View>{calDisp}</View>;
    }

    const calDisp = PopUpBoxCalander(
      clickLink,
      this.sty,
      this.fullDate,
      this.day,
      this,
      EventHolder(this.state.events, this.state.dateStart, this.state.dateEnd)
    );
    return <View>{calDisp}</View>;




  }
}

const EventHolder = (events = [], eventStarts = [], eventEnds = []) => {
  //console.log(events)
  var eventStartsMap = []

  for (let index = 0; index < events.length; index++) {
    const element = [events[index], eventStarts[index], eventEnds[index]];
    eventStartsMap[eventStartsMap.length] = element
  }

  return eventStartsMap.map((eve) =>
    <View style={{ ...styles.centerer, padding: 10 }}><Text>{eve[0]}</Text>
      <Text>{getTime(eve[1])} to {getTime(eve[2])}</Text>

    </View>
  );
};
