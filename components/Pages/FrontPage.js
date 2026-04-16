
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
      <View>
        {UpCommingEvents()}


      </View>

    </View>
  );
}
