import { Text, View, TextInput, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, Link, Navigator } from 'expo-router';
// You can import supported modules from npm

// or any files within the Snack 

import FrontPage from './components/Pages/FrontPage.js';
import Orientation from 'react-native-orientation-locker';

import React, { useEffect } from 'react';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderOptions from './components/Objects/HeaderOptions';


import BookList from './components/Pages/BookList';

import CalanderPage from './components/Pages/CalanderPage';

import LogInPage from './components/Pages/LogInPage';

import RecordTimePage from './components/Pages/RecordTimePage';
import UserInfoPage from './components/Pages/UserInfoPage'

import CreateAcountPage, { CreateParentAcountPage, CreateStudentAcountPage, CreateTutorAcountPage } from './components/Pages/CreateAcountPage.js'


import PastLogsPage from './components/Pages/PastLogsPage'

import LogInSelectorPage from './components/Pages/LogInSelectorPage.js';
import SettingsPage from './components/Pages/SettingsPage.js';
import StudentStatisticsPage from './components/Pages/StudentStatisticsPage.js';

//import PageNotFound from './components/Pages/PageNotFound';

//import PageNotFound from getImport('PageNotFound');

console.log("test");

//Key//cb3a5b0d-e691-46ee-afb1-18a8f45438b6

const studentLogin = () => { return LogInPage('Student') }
const parentLogin = () => { return LogInPage('Parent') }
const tutorLogin = () => { return LogInPage('Tutor') }

const RootStack = createNativeStackNavigator({
  screens: {
    LogInSelectorPage: {
      screen: LogInSelectorPage,
      options: HeaderOptions.signIn,
    },
    LogInStudent: {
      screen: studentLogin,
      options: { title: 'Back' },
    },
    LogInTutor: {
      screen: tutorLogin,
      options: { title: 'Back' },
    },
    LogInParent: {
      screen: parentLogin,
      options: { title: 'Back' },
    },
    Home: {
      screen: FrontPage, //replace with front after tests
      options: HeaderOptions.front,
    },
    UserInfo: {
      screen: UserInfoPage, //replace with front after tests
      options: HeaderOptions.front,
    },
    Books: {
      screen: BookList,
      options: { title: 'Back' },
    },
    Calander: {
      screen: CalanderPage,
      options: { title: 'Back' },
    }, RecordTime: {
      screen: RecordTimePage,
      options: { title: 'Back' },
    }, SignUpPage: {
      screen: CreateAcountPage,
      options: HeaderOptions.signIn
    }, MakeTutorAcountPage: {
      screen: CreateTutorAcountPage,
      options: HeaderOptions.signIn
    }, MakeParentAcountPage: {
      screen: CreateParentAcountPage,
      options: HeaderOptions.signIn
    }, MakeStudentAcountPage: {
      screen: CreateStudentAcountPage,
      options: HeaderOptions.signIn
    }, PastLogs: {
      screen: PastLogsPage,
      options: { title: 'Back' },
    }, Settings: {
      screen: SettingsPage,
      options: { title: 'Back' },
    }, StudentStatistics: {
      screen: StudentStatisticsPage,
      options: { title: 'Back' },
    }


  },
});


const Navigation = createStaticNavigation(RootStack);



const AppT = () => {

  return <Navigation />;
}
const AppWebs = () => {
  return (<Router>

    <Routes>
      <Route exact path="/" element={LogInSelectorPage()} />
      <Route path="/LogInStudent" element={studentLogin()} />
      <Route path="/LogInParent" element={parentLogin()} />
      <Route path="/LogInTutor" element={tutorLogin()} />
      <Route path="/Home" element={FrontPage()} />
      <Route path="/UserInfo" element={UserInfoPage()} />
      <Route path="/Books" element={BookList()} />
      <Route path="/Calander" element={CalanderPage()} />
      <Route path="/RecordTime" element={RecordTimePage()} />
      <Route path="/SignUpPage" element={CreateAcountPage()} />
      <Route path="/MakeTutorAcountPage" element={CreateTutorAcountPage()} />
      <Route path="/MakeParentAcountPage" element={CreateParentAcountPage()} />
      <Route path="/MakeStudentAcountPage" element={CreateStudentAcountPage()} />
      <Route path="/PastLogs" element={PastLogsPage()} />
      <Route path="/Settings" element={SettingsPage()} />
    </Routes>
  </Router>);
}
const AppIos = () => {
  return <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' for iOS, 'height' or 'position' for Android
    style={{ flex: 1 }} // Ensure it takes up available space
  > <Navigation /></KeyboardAvoidingView >;
}
/*
export var page = new PageHolder('front');


page.scene = FrontPage;
function App() {
  return (
    <SafeAreaView>
      {Render()}

      <Text>{page.curentPage}</Text>
    </SafeAreaView>
  );
  //screen=''
}

const Disp = () => {
  return App();
};
*/

export default function App() {
  useEffect(() => {
    Orientation.lockToPortrait(); // Lock when screen mounts
    return () => {
      Orientation.unlockAllOrientations(); // Unlock when leaving
    };
  }, []);
  return <Navigation />;
}
//export default App;
export const PhoneView = () => {
  //return true;

  if (Dimensions.get('window').width < 900) {
    console.log("Phone Screen");
    return true;
  }
  else {
    console.log("Computer Screen");
    return false;
  }
}
export const AppName = () => {
  return 'http://localhost:8081/'
}

export const BackEndName = () => {

  return 'https://blackmenreadapp-api.onrender.com/'
  //return 'http://localhost:5000/'
}
