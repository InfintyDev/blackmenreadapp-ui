import { Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { useState } from 'react';

export default function DropDown(objectList = [], titleOfBox) {

  const [displayButtons, setDisplayButtons] = useState(false);

  const pressedPutton = (name) => {

    //alert(scr)



    setDisplayButtons(!displayButtons)


  };


  return (
    <SafeAreaView>


      <Button title={titleOfBox} onPress={() => pressedPutton()} />





      {displayButtons && objectList}


    </SafeAreaView>
  );
}