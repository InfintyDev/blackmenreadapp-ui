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


export default function UserInfoPage() {
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
  const studentBadges = () => {

    if (userAspects['ReadingStats'] != null) {
      if (userAspects['ReadingStats']['TotalTimeRead']) {
        //console.log(Object.keys(userAspects['ReadingStats']['BooksRead']))
        //console.log(Object.keys(userAspects['ReadingStats']['BooksRead']).map((value) => <View><Text> "{value}": {userAspects['ReadingStats']['BooksRead'][value]} </Text></View>))
        return <View style={styles.containerColoum}>
          <Card style={styles.paddedCard}><Text>Badges</Text></Card>

          <Card style={styles.paddedCard}><Text>Total Time Read: {userAspects['ReadingStats']['TotalTimeRead']} </Text></Card>
          <Card style={styles.paddedCard}><Text>Books Read: {Object.keys(userAspects['ReadingStats']['BooksRead']).map((value) => <View><Text> "{value}": {userAspects['ReadingStats']['BooksRead'][value]['TimeRead']} </Text></View>)} </Text></Card>


        </View >;
      }
    }


  };
  const addChildAcount = () => {
    return <Pressable onPress={() => ConnectAcount('Child')}><Card style={styles.paddedCard}><Text>Add Child Acount</Text></Card></Pressable>;
  };
  const addStudentAcount = () => {
    return <Pressable onPress={() => ConnectAcount('Student')}><Card style={styles.paddedCard}><Text>Add Student Acount</Text></Card></Pressable>;
  };

  const pressChangeSettings = () => {
    console.log('change')
  }


  const ConnectAcount = (acountType = '') => {
    setShowAddAcountPopup(true)
    setConnectUserType(acountType)




  }
  const AddAcount = async (email, id) => {
    setShowAddAcountPopup(false)


    const response = connectUserTo(userAspects['Email'], userAspects['_id'], userAspects['UserType'], email, id)
    saveUserToken(await response)
  }

  const connectUserPopUp = () => {
    return (<Modal visible={showAddAcountPopup} onRequestClose={() => setShowAddAcountPopup(false)} animationType="slide"
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={{
          alignContent: 'center', backgroundColor: 'white', shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          borderRadius: 10,
        }}>
          <View style={styles.cornerView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowAddAcountPopup(false)}>
              <Text>X</Text>
            </Pressable>
          </View>
          <View style={{ ...styles.modalViewNoShadows, padding: 10 }}>




            <Text>Add {connectUserType} Acount</Text>
            <TextInput value={addUserInputEmail} onChangeText={(val) => setAddUserInputEmail(val)} placeholder={connectUserType + ' Email'}>


            </TextInput>
            <TextInput value={addUserInputUserId} onChangeText={(val) => setAddUserInputUserId(val)} placeholder={connectUserType + ' Id'}>


            </TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => AddAcount(addUserInputEmail, addUserInputUserId)}>

              <Text>Confirm</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </Modal>)
  }

  const connectedUserLogsPopUp = () => {
    return (<Modal visible={showAddAcountPopup} onRequestClose={() => setShowAddAcountPopup(false)} animationType="slide"
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={{
          alignContent: 'center', backgroundColor: 'white', shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          borderRadius: 10,
        }}>
          <View style={styles.cornerView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowAddAcountPopup(false)}>
              <Text>X</Text>
            </Pressable>
          </View>
          <View style={{ ...styles.modalViewNoShadows, padding: 10 }}>






          </View>
        </View>
      </View>
    </Modal>)
  }


  const removeConnectedAcountTest = (acount) => {
    setShowAcountManagmentPopup(false)
    console.log("Disconnect")
    console.log(acount)
  }
  const removeConnectedAcount = (baseAcount, removeAcount) => {
    setShowAcountManagmentPopup(false)
    console.log("Disconnect")
    console.log(baseAcount)

    var baseAcountID = baseAcount['_id']
    console.log("Id: " + baseAcountID)
    var baseAcountEmail = baseAcount['Email']
    console.log("Email: " + baseAcountEmail)
    var baseAcountType = baseAcount['UserType']
    console.log("Type: " + baseAcountType)

    console.log(removeAcount)
    var removeAcountID = removeAcount['id'];
    console.log("Id Remove: " + removeAcountID)
    //console.log("Id Remove: " + removeAcount['id'])
    var removeAcountEmail = removeAcount['Email']
    console.log("Email: " + removeAcountEmail)
    var removeAcountType = "Student"
    console.log("Type: " + removeAcountType)
    removeConnectedUser(baseAcountEmail, baseAcountID, baseAcountType, removeAcountEmail, removeAcountID);


  }

  const ManagementWindow = (acount) => {
    console.log(acount)
    return (<Modal visible={showAcountManagmentPopup} onRequestClose={() => setShowAcountManagmentPopup(false)} animationType="slide"
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={{
          alignContent: 'center', backgroundColor: 'white', shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          borderRadius: 10,
        }}>
          <View style={styles.cornerView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowAcountManagmentPopup(false)}>
              <Text>X</Text>
            </Pressable>
          </View>
          <View style={{ ...styles.modalViewNoShadows, padding: 10 }}>
            <Text>User Name: {acount['UserName']}</Text>
            <Text>Email: {acount['Email']}</Text>
            <Text>ID: {acount['id']}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => removeConnectedAcount(userAspects, acount)}>
              <Text>Disconnect Acount</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>)
  }



  const ConnectedUserView = (acount) => {
    //const [showAcountManagmentPopup, setShowAcountManagmentPopup] = useState(false)
    const userName = acount['UserName']
    const email = acount['Email']
    console.log('AcountView')
    console.log(acount)
    const changeManagement = () => {
      setShowAcountManagmentPopup(true)
      setManagementAcount(acount)
    }
    return (<View style={styles.centerer}>
      <Card style={styles.paddedCard}>
        <Text>

          {userName}

        </Text>
        <Text>

          {email}

        </Text>
        <Pressable onPress={() => changeManagement()}><Card style={{ ...styles.paddedCard, backgroundColor: 'red' }}><Text>Manage</Text></Card></Pressable>
        {ManagementWindow(mangagementAcount)}
        {ChagePageButton('See Logs', 'PastLogs')}

      </Card>
    </View>)
  }

  const ConnectedAcounts = () => {

    console.log(userAspects['ConnectedAcounts'])
    const connectedAcoutsMapped = userAspects['ConnectedAcounts'].map((acount) => ConnectedUserView(acount))

    return (<View>
      <Text>
        {MakeScroll(connectedAcoutsMapped)}
      </Text>

    </View>)




  }

  const settings = () => {
    <View style={{ flexDirection: 'column' }}>
      <Card style={styles.paddedCard}>
        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => pressChangeSettings()}>
          <Text style={styles.textStyle}>
            Change Email
          </Text>
        </Pressable>

      </Card>
      <Card style={styles.paddedCard}>
        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => pressChangeSettings()}>
          <Text style={styles.textStyle}>
            Change User Name
          </Text>
        </Pressable>

      </Card>
    </View>
  }


  return (
    <View style={{ flex: 1 }}>

      {connectUserPopUp()}

      <View style={styles.containerRow}>

        <SideBar />
        <View>



          <Card style={styles.paddedCard}>
            {ChangePageButton('Log Out', 'LogInSelectorPage')}
          </Card>

          {userAspects['UserType'] == 'Parent' && addChildAcount()}
          {userAspects['UserType'] == 'Tutor' && addStudentAcount()}
          {userAspects['UserType'] == 'Student' && studentBadges()}
          {userAspects['ConnectedAcounts'] && ConnectedAcounts()}



          <Card style={styles.paddedCard}>
            <Text>User Name: {userAspects['UserName']}</Text>
            <Text>Email: {userAspects['Email']}</Text>
            <Text>User Type: {userAspects['UserType']}</Text>


            <Text>{ }</Text>
          </Card>
          <Card style={styles.paddedCard}>
            <Text>User Id: {userAspects['_id']}</Text>


            <Text>{ }</Text>
          </Card>


        </View>

      </View>
    </View >
  );
}
