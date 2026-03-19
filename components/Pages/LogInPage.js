import {
  Text,

  StyleSheet,
  View,
  Button,
  Image,
  Pressable
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import styles from '../Objects/Styles';
import ScreenSelector from '../Objects/SceneSelector';
import TypeBox from '../Objects/TypeBox';
import SignInBox from '../Objects/SignInBox';
import User from '../InfoHolders/User';
import AsyncStorage from '@react-native-async-storage/async-storage';



//import GoogleSignin from 'react-native-google-signin';

export default function LogInPage(logInType) {

  console.log(logInType)
  /*
  const [signInBox, setSignInBox] = useState();
  const [signInSelected, setSignInSelected] = useState(false);
  const signIn = SignInBox();*/


  const signIn = SignInBox(logInType, false);
  //const signInParent = SignInBox('Parent', false);
  //const signInTutor = SignInBox('Tutor', false);


  /*
    const setUserTypeSelected = (userType) => {
  
      if (!signInSelected) {
        if (userType == 'Student') {
          setSignInBox(signInStudent)
        } else if (userType == 'Parent') {
          setSignInBox(signInParent)
        }
        else if (userType == 'Tutor') {
          setSignInBox(signInTutor)
        }
        setSignInSelected(true)
      }
    }*/

  const typeSelectorButton = (userType) => {
    var buttonSty = styles.buttonSide


    return <Pressable onPress={() =>
      setUserTypeSelected(userType)
    } style={buttonSty}><Text style={{ ...styles.sideButtonTextStyle, ...styles.centerer }}>{userType}</Text>

    </Pressable>
  }

  const typeSelectorButtons = <View style={{ ...styles.containerColoum, scale: 1 }} >
    <View>{typeSelectorButton('Parent')}</View>
    <View>{typeSelectorButton('Tutor')}</View>
    <View>{typeSelectorButton('Student')}</View>
  </View>;



  /*
  var ret = signIn[1];
  if (signIn[1] == null) {
    ret = null;
  }*/

  const MakeImage = (imageStyle, imageSource, width = 0, height = 0) => {


    return (
      <Image
        style={{ ...styles.scaledImage, width: width, height: height }}
        source={imageSource}

      />
    );
  };


  //setUserTypeSelected(logInType)


  return (

    <View style={{ ...styles.container, backgroundColor: '#ffffffff' }}>
      <View style={styles.centerer}>

        {MakeImage(
          styles.scaledImage,
          require('../../assets/BlackMenReadLogo.jpg'),
          300,
          300
        )}
      </View>
      {<View style={styles.containerLimitLogin}>{signIn}</View>}



    </View >


  );
}
