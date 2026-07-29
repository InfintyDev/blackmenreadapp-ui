
import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBar, { SideBarExclued } from '../Objects/SideBar'


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


  return (
    <View style={styles.containerRow}>


      <SideBar />
      <View style={styles.containerColoumUp}>
        <View>
          {UpCommingEvents()}


        </View>

        {userAspects['ReadingStats'] && <View>

          {userAspects['ReadingStats']['TotalTimeRead'] && userAspects['UserType'] == 'Student' && <Card style={styles.paddedCard}><Text>Total Time Read: {getTimeLook(String(userAspects['ReadingStats']['TotalTimeRead']))} </Text></Card>}
        </View>}
      </View>


    </View>
  );
}
