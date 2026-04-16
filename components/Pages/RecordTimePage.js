import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';
import ScreenSelector from '../Objects/SceneSelector';
import Timer from '../Objects/Timer';
import LogBoxes from '../Objects/LogBoxes';
import SideBar from '../Objects/SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../InfoHolders/User';
import App, { PhoneView } from '../../App';

export default function RecordTimePage() {
  //const onPhone = PhoneView();
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
  //console.log(userAspects)

  const stopWatch = Timer();
  const theLogBox = LogBoxes(stopWatch[1], userAspects);

  var onPhone = false;
  onPhone = PhoneView();
  if (onPhone) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.containerRow}>
          <SideBar />
          <View style={{ ...styles.containerColoum, flex: 1 }}>
            <View style={{ transform: [{ scale: .9 }], flex: 1 }}>{stopWatch[0]}</View>
            <View style={{ transform: [{ scale: .9, }], flex: 2 }}>{theLogBox[0]}</View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.containerRow}>
          <SideBar />
          <View style={styles.containerPlain}>
            {stopWatch[0]}
            {theLogBox[0]}
          </View>
        </SafeAreaView>
      </View>
    );
  }

}
