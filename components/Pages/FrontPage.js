
import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBar, { SideBarExclued } from '../Objects/SideBar'

import { Router, Link } from 'expo-router';
import User from '../InfoHolders/User';
import UpCommingEvents from '../Objects/UpComingEvents'
import { getUserDataLocaly, saveBookRecToComputor } from '../../GetSaveUserFromServer';



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

function getBadges(time) {
  const hr = String(time).split("/")[0];
  const min = String(time).split("/")[1];
  var minTotal = parseInt(min) + (parseInt(hr) * 60)
  var badgeTime = 0;
  var timeTillNextBadge = 120;
  var returnString = ""




  if (parseInt(hr) > 2) {
    badgeTime = Math.floor(minTotal / 120);


    returnString = String(badgeTime)


  }
  else {
    returnString = "Read At Least Two Hours To Get A Badge"
  }
  minTotal = minTotal % 120
  minTotal = timeTillNextBadge - minTotal

  console.log("MinConvert: " + minTotal);

  const readMorehr = Math.floor(minTotal / 60)
  const readMoreMin = minTotal % 60
  if (badgeTime == 1) {
    returnString = "You Have " + badgeTime + " Badge,"
  }
  else if (badgeTime == 0) {
    returnString = "You Have No Badges But,"
  }
  else {
    returnString = "You Have " + badgeTime + " Badges,"
  }

  if (readMorehr > 0) {

    if (readMoreMin > 0) {
      returnString += " Read " + readMorehr + " Hours And " + readMoreMin + " Minutes More For The Next Badge"
    }
    else {
      returnString += " Read " + readMorehr + " Hours More For The Next Badge"
    }

  }
  else {
    if (readMoreMin > 0) {
      returnString += " Read " + readMoreMin + " Minutes More For The Next Badge"
    }
  }


  return returnString;


}

export default function FrontPage() {
  /*
  if (!await AsyncStorage.getItem('BookRecToken')) {
    await saveBookRecToComputor()
  }*/

  const [userAspects, setUserAspects] = useState({});
  const [shouldSetUserAspects, setShouldSetUserAspects] = useState(true);
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
  console.log(userAspects)
  var numberOfDaysInARow = 0;
  var numberOfLogsTotal = 0;
  var numberOfPagesTotal = 0;
  var longestReadingStreak = 0;
  var currentReadingStreak = 0;
  var totalTime = 0;
  var logMadeToday = false;
  var timeString = "0/0/0"
  const today = new Date();

  const dateToDayMonthYear = (date = new Date()) => {
    return String(date.getMonth()) + "/" + String(date.getDate()) + "/" + String(date.getFullYear())
  }
  const dateTheSame = (dateA = new Date(), dateB = new Date()) => {
    if (dateToDayMonthYear(dateA) == dateToDayMonthYear(dateB)) {
      return true;

    }
    return false;
  }

  const getLastDayFromDate = (date = new Date()) => {
    var dateYesterDay = date;
    dateYesterDay.setDate(date.getDate() - 1)
    return dateYesterDay
  }
  const getCurrentReadingStreakFrom = (streakCurent = 0, logs, dateFrom = new Date()) => {
    var streak = streakCurent;
    const yesterDay = getLastDayFromDate(dateFrom)
    for (let indexB = 0; indexB < logs.length; indexB++) {

      const element = logs[indexB];
      const dateMade = new Date(element["Date"])
      if (dateTheSame(dateMade, yesterDay)) {
        streak += 1
        return getCurrentReadingStreakFrom(streak, logs, yesterDay)


      }





    }
    return streak;

  }
  if (userAspects["Logs"]) {
    const logs = userAspects["Logs"];
    //console.log(logs);
    //console.log(logs.length);
    for (let index = 0; index < logs.length; index++) {
      const element = logs[index];
      //console.log(index)
      //console.log(element)
      if (element["Date"]) {
        //console.log(today);

        const dateMade = new Date(element["Date"])
        //console.log(dateToDayMonthYear(today))
        //console.log(dateToDayMonthYear(dateMade))

        if (dateTheSame(today, dateMade)) {
          //console.log("dateMadeToday")
          logMadeToday = true;

          //console.log(getCurrentReadingStreakFrom(1, logs, today))

          currentReadingStreak = getCurrentReadingStreakFrom(1, logs, today)

        }
        else {
          const streakFrom = getCurrentReadingStreakFrom(1, logs, dateMade)
          //console.log("Streak: " + streakFrom)
          if (longestReadingStreak == 0) {
            longestReadingStreak = streakFrom
          }
          else if (streakFrom > longestReadingStreak) {
            longestReadingStreak = streakFrom
          }

        }




      }
      if (element["PageFirst"]) {
        if (element["PageLast"]) {

          const pageFirst = parseInt(element["PageFirst"])
          const pageLast = parseInt(element["PageLast"])

          if (pageFirst < pageLast) {

            const pagesRead = pageLast - pageFirst
            if (pagesRead > 0) {
              //console.log(pagesRead)
              numberOfPagesTotal += pagesRead
            }

          }
        }

      }
      if (element["Time"]) {


        const hr = parseInt(element["Time"].split("/")[0])
        const min = parseInt(element["Time"].split("/")[1])


        totalTime += (hr * 60) + min;
        console.log(totalTime)

      }
    }
    numberOfLogsTotal = logs.length;
  }

  if (totalTime > 0) {
    const hr = Math.floor(totalTime / 60)
    const min = totalTime % 60
    console.log(hr + "/" + min + "/")
    timeString = hr + "/" + min + "/" + "00"
  }
  if (longestReadingStreak < currentReadingStreak) {
    longestReadingStreak = currentReadingStreak
  }
  const BlackMenReadLink = () => {
    return (
      <View>
        <Link href={"https://www.blackmenread.org/"}>Black Men Read Website</Link>
      </View>


    )
  }

  return (
    <View style={styles.containerRow}>


      <SideBar />
      <View style={styles.containerColoumUp}>
        <View>
          {UpCommingEvents()}


        </View>

        {userAspects['ReadingStats'] && <View>

          {userAspects['ReadingStats']['TotalTimeRead'] && userAspects['UserType'] == 'Student' && <Card style={styles.paddedCard}><Text>Total Time Read: {getTimeLook(timeString)} </Text></Card>}
        </View>}




        {userAspects['ReadingStats'] && <View>

          {userAspects['ReadingStats']['TotalTimeRead'] && userAspects['UserType'] == 'Student' && <Card style={styles.paddedCard}><Text>Badges: {getBadges(timeString)} </Text></Card>}
        </View>}

        {numberOfDaysInARow != 0 && <View style={styles.centeredView}>
          <Card style={styles.paddedCard}>
            <Text>Days Read In A Row: {numberOfDaysInARow}</Text>
          </Card>
        </View>}
        {numberOfLogsTotal != 0 && <View style={styles.centeredView}>
          <Card style={styles.paddedCard}>
            <Text>Total Logs: {numberOfLogsTotal}</Text>
          </Card>
        </View>}
        {numberOfPagesTotal != 0 && <View style={styles.centeredView}>
          <Card style={styles.paddedCard}>
            <Text>Total Pages Read: {numberOfPagesTotal}</Text>
          </Card>
        </View>}
        {longestReadingStreak != 0 && <View style={styles.centeredView}>
          <Card style={styles.paddedCard}>
            <Text>Longest Reading Streak: {longestReadingStreak}</Text>
          </Card>
        </View>}
        {currentReadingStreak != 0 && <View style={styles.centeredView}>
          <Card style={styles.paddedCard}>
            <Text>Current Reading Streak: {currentReadingStreak}</Text>
          </Card>
        </View>}

        <View style={styles.centeredView}>
          <Card style={styles.paddedCard}>
            {BlackMenReadLink()}
          </Card>
        </View>
      </View>


    </View>
  );
}
