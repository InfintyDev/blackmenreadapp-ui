import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  LogBox,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable,
  SafeAreaProvider,
} from 'react-native';
import styles from './Styles';

import { useState, Component } from 'react';

export default function InputBox(
  def = '',
  sideText,
  sty = styles.paragraphFlexable,
  textSty = styles.textStyle,
  multi = true
) {
  const [inputedValue, onChangeText] = useState('');

  const inputer = (
    <TextInput
      style={styles.flexDefalt}
      value={inputedValue}
      onChangeText={(inputedValue) => onChangeText(inputedValue)
      }
      multiline={multi}
      numberOfLines={1} placeholder={def} />
  );


  return [
    <View style={sty} >
      <Text style={textSty}>{inputer}</Text>
    </View>,
    inputedValue,
  ];
}
/*
export class InputBoxNumbersClass extends Component {
  constructor(
    def = '',
    sideText,
    maxNumbers = 2,

    sty = styles.paragraphFlexable,
    textSty = styles.textStyle,
    multi = true
  ) {
    super();

    this.state = {
      def: def,
      sideText: sideText,
      maxNumbers: maxNumbers,
      sty: sty,
      textSty: textSty,
      multi: multi,
      showBox: InputBoxNumbers(def, sideText, maxNumbers, sty, textSty, multi),
    };
    //console.log(this.def);
  }

  ChangeValue(value) {
    console.log(value);
    //console.log(this.state.showBox[1]);
    const newShowBox = InputBoxNumbers(
      toString(value),
      this.state.sideText,
      this.state.maxNumbers,
      this.state.sty,
      this.state.textSty,
      this.state.multi
    );
    //this.state = { showBox: newShowBox };
    //this.state.showBox = newShowBox;
    console.log(newShowBox[1]);
  }
}
*/
export const InputBoxNumbers = (
  def = '',
  sideText,
  maxNumbers = 2,
  sty = styles.paragraphFlexable,
  textSty = styles.textStyle,
  multi = true
) => {
  const [inputedValue, onChangeText] = useState('');

  const ChangeValue = (value = '') => {
    console.log('value changed');
    var stringWithoutLetters;
    if (value != null) {
      stringWithoutLetters = value.replace(/[a-zA-Z]/g, '');
      if (stringWithoutLetters.length > maxNumbers) {
        stringWithoutLetters.slice(0, maxLength - 3) + '...'; // Subtract 3 for the ellipsis
      }
      onChangeText(stringWithoutLetters);
    }
  };

  const inputer = (
    <TextInput
      style={{ width: '100%', height: '100%' }}
      value={inputedValue}
      onChangeText={(inputedValue) => ChangeValue(inputedValue)}
      multiline={multi}
    > </TextInput>
  );

  return [
    <View style={sty} >
      <Text style={textSty} > {inputer} </Text>
    </View>,
    inputedValue,
  ];
};

export class InputBoxClass extends Component {
  constructor(
    def,
    sideText,
    sty = styles.paragraphFlexable,
    textSty = styles.textStyle,
    multi = true
  ) {
    super();

    this.state = {
      inputedValue: String,
      count: 0,
    };

    this.sideText = sideText;
    this.sty = sty;
    this.textSty = textSty;
    this.multi = multi;
  }
  handleInputTextChange = (newText) => {
    this.setState({ queryText: newText });
  };

  ChangeValue(value) {
    console.log('new Value: ' + value);
    this.setState({ inputedValue: value }, () => {
      console.log('State updated, new count:' + this.state.inputedValue);
    });
  }

  Render() {
    return [
      <View style={this.sty} >
        <Text style={this.textSty} >
          <TextInput
            style={styles.flexDefalt}
            onChangeText={this.handleInputTextChange}
            multiline={this.multi}
            numberOfLines={1} > </TextInput>
        </Text>
      </View>,
      this.inputedValue,
    ];
  }
}

export function DisplayBox(
  dispText,
  sty = styles.paragraphFlexable,
  textSty = styles.textStyle
) {
  return (
    <View style={sty} >
      <Text style={textSty}> {dispText} </Text>
    </View>
  );
}
