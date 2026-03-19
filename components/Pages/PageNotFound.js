import { Text, SafeAreaView, StyleSheet ,View, Button} from 'react-native';
import {useState} from 'react'

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import ChangePageButton from '../Objects/ChangePageButton'

import styles from '../Objects/Styles'







export default function FrontPage() {
  return (

    
    <SafeAreaView style={styles.container}>
      
      
      
      {
        ChangePageButton("Front", "home")
      }
        
      <Card>
      </Card>


      
      
      
      
      
    </SafeAreaView>
  );
}



