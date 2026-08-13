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
import TypeBox from '../Objects/TypeBox';
import DatePicker from "react-date-picker";
import { addUserGoals } from '../../GetSaveUserFromServer'




export default function GoalSettingPage() {
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

          <Card style={styles.paddedCard}><Text>Total Time Read: {getTimeLook(String(userAspects['ReadingStats']['TotalTimeRead']))} </Text></Card>
          <Card style={styles.paddedCard}><Text>Books Read  </Text></Card>
          <View style={styles.containerCenterMade}>
            {Object.keys(userAspects['ReadingStats']['BooksRead']).map((value) => <View><Card style={{ ...styles.paddedCard, margin: 4, padding: 4 }}><Text>"{value}"{userAspects['ReadingStats']['BooksRead'][value]['TimeRead']}</Text></Card></View>)}

          </View>


        </View >;
      }
    }


  };

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
  const [goalCreationShowing, setGoalCreationShowing] = useState(false)
  const [goalCreationType, setGoalCreationType] = useState("")
  const [goalAmount, setGoalAmount] = useState(0)
  const [goalPages, setGoalPages] = useState(0)
  const [goalTimeHr, setGoalTimeHr] = useState(0)
  const [goalTimeMin, setGoalTimeMin] = useState(0)
  const [dateValue, setDateValue] = useState(new Date());

  const inputAmount = TypeBox("Start");

  const GoalCreationPopUp = () => {
    return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={goalCreationShowing}
        onRequestClose={() => closeGoalCreation()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Card>
              <Text>
                {goalCreationType}
              </Text>


            </Card>

            {goalCreationType == "Time" && timeGoalSetter()}
            {goalCreationType == "Pages" && pagesGoalSetter()}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => submitGoalCreation()}>

              <Text>
                Submit
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeGoalCreation()}>

              <Text>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>


    );

  }
  //const [update, setUpdate] = useState(true);



  const pagesGoalSetter = () => {

    return (
      <View>
        <Text>Pages To Read</Text>
        <TextInput value={goalPages} onChangeText={(goal) => changePageText(goal)} />
        <View style={styles.boxCalContain}>
          <DatePicker onChange={setDateValue} value={dateValue} autoFocus={true} ></DatePicker>
        </View>

      </View>


    )
  }
  const timeGoalSetter = () => {
    return (<View>
      <View style={styles.containerRow}>
        <Text>Hours </Text>
        <TextInput value={goalTimeHr} onChangeText={(goal) => changeTimeTextHr(goal)} />
      </View>
      <View style={styles.containerRow}>
        <Text>Minutes</Text>
        <TextInput value={goalTimeMin} onChangeText={(goal) => changeTimeTextMin(goal)} />
      </View>
      <View style={styles.boxCalContain}>
        <DatePicker onChange={setDateValue} value={dateValue} autoFocus={true} ></DatePicker>
      </View>




    </View>

    )
  }
  const changeTimeTextMin = (time) => {
    var stringWithoutLetters = time.replace(/[a-zA-Z]/g, '');

    if (parseInt(stringWithoutLetters)) {
      setGoalTimeMin(parseInt(stringWithoutLetters))
    }
    else {
      setGoalTimeMin("")
    }

  }
  const changeTimeTextHr = (time) => {
    var stringWithoutLetters = time.replace(/[a-zA-Z]/g, '');

    if (parseInt(stringWithoutLetters)) {
      setGoalTimeHr(parseInt(stringWithoutLetters))
    }
    else {
      setGoalTimeHr("")
    }

  }
  const changePageText = (pages) => {
    var stringWithoutLetters = pages.replace(/[a-zA-Z]/g, '');

    if (parseInt(stringWithoutLetters)) {
      setGoalPages(parseInt(stringWithoutLetters))
    }
    else {
      setGoalPages("")
    }





  }

  const dateSelector = () => {

  }
  const submitGoalCreation = () => {
    var validGoal = false;

    if (goalCreationType == "Pages") {
      if (goalPages == "" || goalPages == 0) {

      }
      else {
        console.log(goalPages)
        validGoal = true
      }
    }
    if (goalCreationType == "Time") {
      if (goalTimeHr == "" || goalTimeHr == 0) {

      }
      else {
        console.log(goalTimeHr + "Hr")
        validGoal = true
      }
      if (goalTimeMin == "" || goalTimeMin == 0) {

      }
      else {
        console.log(goalTimeMin + "Min")
        validGoal = true
      }
    }
    console.log(dateValue)
    const today = new Date()


    if (dateValue > today) {
      var dateString = (dateValue.getMonth() + 1) + "/" + dateValue.getDate() + "/" + dateValue.getFullYear()
      if (validGoal) {
        console.log("Valid Goal")

        if (goalCreationType == "Pages") {
          var goalText = "Read " + goalPages + " Pages by " + dateString
          var madeOn = new Date();

          var goalObject = { "Type": goalCreationType, "Pages": goalPages, "TimeTotal": 0, "By": dateValue, "MadeOn": madeOn, "Text": goalText, "Completed": false }
          console.log(goalObject)
          addGoalToUser(goalObject);

        }
        if (goalCreationType == "Time") {
          var madeOn = new Date();
          var goalText = "Read For " + goalTimeHr + " Hours and " + goalTimeMin + " minutes by " + dateString

          var goalObject = { "Type": goalCreationType, "Pages": 0, "TimeTotal": (goalTimeHr * 60) + goalTimeMin, "By": dateValue, "MadeOn": madeOn, "Text": goalText, "Completed": false }


          console.log(goalObject)

          addUserGoals(userAspects["Email"], userAspects["_id"], userAspects["UserType"], goalObject)
          addGoalToUser(goalObject);




        }

      }
    }



    closeGoalCreation()
  }

  const addGoalToUser = (goal) => {
    var userNewSave = userAspects;
    if (userNewSave["Goals"]) {
      userNewSave["Goals"][userNewSave["Goals"].length] = goal
    }
    else {
      userNewSave["Goals"] = []
      userNewSave["Goals"][userNewSave["Goals"].length] = goal
    }

    saveUserToken(userNewSave)

    console.log(userNewSave);

  }

  const isDateBetweenTwoDates = (dateA = new Date(), dateToCheck = new Date(), dateB = new Date()) => {


    console.log(dateA + "/" + dateB)
    console.log("A" + dateA)
    console.log("B" + dateB)
    console.log("C" + dateToCheck)
    if (dateToCheck >= dateA) {

      if (dateToCheck <= dateB) {
        return true;
      }
    }

    return false;
  }

  const isGoalCompleteCheck = (logs, goal) => {
    console.log(goal)
    var goalCompleated = false;
    var currentGoalTime = 0;
    var currentGoalPages = 0;



    for (let index = 0; index < logs.length; index++) {
      const element = logs[index];
      console.log(element)
      const date = new Date(element["Date"])
      console.log(date)
      if (isDateBetweenTwoDates(new Date(goal["MadeOn"]), new Date(element["Date"]), new Date(goal["By"]))) {
        console.log("GoalBetween Today and By date")
        if (goal["Type"] == "Pages") {
          var pagesReadLog = element["PageLast"] - element["PageFirst"]
          console.log(pagesReadLog);
          currentGoalPages += pagesReadLog;
        }
        if (goal["Type"] == "Time") {
          var timeReadLogHr = parseInt(element["Time"].split("/")[0]);
          var timeReadLogMin = parseInt(element["Time"].split("/")[1]);


          var timeReadLogTotal = (timeReadLogHr * 60) + timeReadLogMin

          currentGoalTime += timeReadLogTotal


        }


      }
      else {
        console.log("goal not Between Dates")
      }


      console.log(element)
    }

    console.log("PagesRead:" + currentGoalPages)
    console.log("TimeRead:" + currentGoalTime)


    if (goal["Type"] == "Pages") {
      console.log("PagesToRead:" + parseInt(goal["Pages"]))
      if (currentGoalPages >= parseInt(goal["Pages"])) {
        return true
      }
    }
    if (goal["Type"] == "Time") {
      console.log("TimeToRead:" + parseInt(goal["TimeTotal"]))
      if (currentGoalTime >= parseInt(goal["TimeTotal"])) {
        return true
      }
    }

    return false;


  }

  const isGoalCompleteLook = (logs, goal) => {


    console.log(goal)
    if (isGoalCompleteCheck(logs, goal)) {
      goal["Completed"] = true;
    }


    return <View><Card><Text>{goal["Text"]}</Text>
      <View>
        <Text>Goal is </Text>
        {goal["Completed"] == true && <Text>Complete</Text>}
        {goal["Completed"] == false && <Text>Inomplete</Text>}
      </View>


    </Card></View>;
  }



  const closeGoalCreation = () => {

    setGoalCreationShowing(false)
    setGoalAmount(0)
    setGoalPages(0)
    setGoalTimeHr(0)
    setGoalTimeMin(0)
    setGoalCreationType('')
    setDateValue(new Date())
  }
  const goalButtonCreationPressed = (typeOfGoal) => {
    console.log("GoalMade")
    setGoalCreationShowing(true)
    setGoalCreationType(typeOfGoal)
  }
  const SetGoalButton = (typeOfButton) => {
    return (
      <Pressable onPress={() => goalButtonCreationPressed(typeOfButton)}>
        <Card style={styles.paddedCardHalf}>
          <Text style={styles.smallText}>
            {typeOfButton}
          </Text>

        </Card>
      </Pressable>

    )
  }


  return (
    <View style={{ flex: 1 }}>



      <View style={styles.containerRow}>

        <SideBar />
        <View>

          {GoalCreationPopUp()}
          <View style={styles.containerColoum}>
            <Card style={styles.paddedCard}>
              <Text style={styles.headerTextGoal}>
                Set Goal
              </Text>

            </Card>
            {SetGoalButton("Time")}
            {SetGoalButton("Pages")}

          </View>



          {userAspects['ConnectedAcounts'] && ConnectedAcounts()}


          <View style={styles.containerColoum}>
            <Card style={styles.paddedCard}>
              <Text>
                Current Goals
              </Text>
            </Card>
            {userAspects["Goals"] && < View >

              {userAspects["Goals"].map((goal) => isGoalCompleteLook(userAspects["Logs"], goal))}

            </View>}

          </View>
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
