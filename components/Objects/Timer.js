import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  LogBox,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable
} from 'react-native';
import styles from './Styles';

import { useState, data, useEffect } from 'react';
import PopUpBox from './PopUp';

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
  /*
  return [
    <SafeAreaView style={styles.shrinkDown}>
      <View style={styles.timerView}>
        <Text style={styles.timeDisplay}>Stopwatch</Text>
        <Text style={styles.timeDisplay}>{displayTime(timerTime)}</Text>
        <View style={styles.containerOfStuffRidged}>

          {!timerActive && <Button
            title="Start"
            style={styles.timerButton}
            onPress={() => startTimer()}></Button>}
          {timerActive && <Button
            title="Pause"
            style={styles.timerButton}
            onPress={() => stopTimer()}></Button>}
          <Button
            title="Reset"
            style={styles.timerButton}
            onPress={() => resetTimer()}></Button>
        </View>

      </View>
    </SafeAreaView>,
    timerTime,
  ];*/

  return [
    <SafeAreaView style={styles.shrinkDown}>
      <View style={{ ...styles.timerView, margin: 0, maxHeight: "20%" }}>
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
        </View>

      </View>
    </SafeAreaView>,
    timerTime,
  ];
};
export default Timer;