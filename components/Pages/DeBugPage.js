import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack


import styles from '../Objects/Styles';
import ScreenSelector from '../Objects/SceneSelector';
import SideBar from '../Objects/SideBar';


export default function DebugPage() {
  return (
    <View style={styles.container}>

      <Card>{SideBar()}</Card>





    </View>
  );
}
