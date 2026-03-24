import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  StatusBar,
  Dimensions,


} from 'react-native';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import SideBar from '../Objects/SideBar';
import styles from '../Objects/Styles';


export default function MakeScroll(content, inputheight = 200) {


  /*
    const [window, setWindow] = useState(Dimensions.get('window'))
    const [height, setHeight] = useState(0);
    Dimensions.addEventListener('change', ({ window }) => {
      setWindow(window)
    });
  
    const sty = {
      height: window.height
    };
    console.log("Height: " + inputheight)
    */
  return (




    <ScrollView
      style={{ height: inputheight }}
      showsVerticalScrollIndicator={true}>
      <View>
        {content}
      </View>
    </ScrollView>


  );
}

const stylem = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {

  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});
