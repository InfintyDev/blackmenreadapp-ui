import { Text, StyleSheet, View, Button, Pressable, Modal } from 'react-native';
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
import { connectUserTo, saveUserDataLocaly, removeConnectedUser } from '../../GetSaveUserFromServer';
import ChagePageButton from '../Objects/ChangePageButton';
import saveUserToken from '../SaveLoadUserLocal';
import MakeScroll from '../Objects/MakeScroll';


export default function SettingsPage() {
  const [mangagementAcount, setManagementAcount] = useState({ Email: '', UserName: '', id: '' })
  const [userAspects, setUserAspects] = useState({});
  const [shouldSetUserAspects, setShouldSetUserAspects] = useState(true);
  const [showAddAcountPopup, setShowAddAcountPopup] = useState(false)
  const [showAcountManagmentPopup, setShowAcountManagmentPopup] = useState(false)

  const [addUserInputEmail, setAddUserInputEmail] = useState('')
  const [addUserInputUserId, setAddUserInputUserId] = useState('')
  const [connectUserType, setConnectUserType] = useState('')
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






  return (
    <View style={{ flex: 1 }}>



      <View style={styles.containerRow}>

        <SideBar />
        <View>



          <Card style={styles.paddedCard}>
            {ChangePageButton('Log Out', 'LogInSelectorPage')}
          </Card>







          <Card style={styles.paddedCard}>
            <Text>Settings</Text>
          </Card>

          <Card style={styles.paddedCard}>
            <Text>Delete Acount</Text>
          </Card>

          <Card style={styles.paddedCard}>
            <Text>User Id: {userAspects['_id']}</Text>
          </Card>


        </View>

      </View>
    </View >
  );
}
