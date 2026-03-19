import { Text, StyleSheet, View, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { useState } from 'react';
import styles from './Styles';

export default function DropDownSelector(objectList = {}, titleOfBox = '') {
  const [optionTitle, setOptionTitle] = useState(titleOfBox);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [returnValue, setRetunValue] = useState();

  const ReformatObjectList = () => {
    var reFormated = [];
    const keys = Object.keys(objectList);

    //console.log(keys)
    for (let i = 0; i <= keys.length - 1; i++) {
      reFormated[i] = (
        <Button
          title={keys[i]}
          onPress={() => selectedOption(keys[i])}
          style={styles.dropDownOptions}
        />
      );
      //console.log(objectList[i]);
    }

    return reFormated;
  };

  const pressedPutton = (name) => {
    //alert(scr)

    setDisplayOptions(!displayOptions);
  };
  const selectedOption = (option) => {
    //console.log(option)
    //alert(scr)
    setOptionTitle('Selected: ' + option);
    setDisplayOptions(false);
    setRetunValue(objectList[option]);
  };

  return [
    <View style={styles.flexDefaltAbsolute}>
      <Button title={optionTitle} onPress={() => pressedPutton()} />
      <View style={styles.flexDefaltAbsolute}>
        {displayOptions && ReformatObjectList()}
      </View>
    </View>,
    returnValue,
  ];
}
