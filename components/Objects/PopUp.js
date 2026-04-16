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
import TypeBox from './TypeBox'

import React, {
  useState,
  data,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useRef
} from 'react';
import CalanderDay from './CalanderDay'


export const PopUpBox = (clickLink, sty, content) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {content}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}></Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={sty}
        onPress={() => {
          console.log('popUp');
          setModalVisible(true);
        }}>
        {clickLink}
      </Pressable>
    </View>
  );
};
//*/
export const PopUpBoxCalander = (
  clickLink,
  sty,
  fullDate,
  day,
  addto,
  eventList
) => {
  const [modalVisible, setModalVisible] = React.useState(false);


  const SetPopup = useCallback((chageTo) => {
    setModalVisible(chageTo);
  }, []);
  const refrece = useRef()
  useImperativeHandle(refrece, () => ({
    setPopup: (setto) => {
      setPopup(setto);
    },
  }));

  //const addevent = EventAdderInterface(addto = new CalanderDay(), SetPopup);
  return (
    <View style={{ ...styles.centeredView }}>
      <Modal
        style={{ ...styles.centeredView }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={{ ...styles.centeredView, }}>

          <View style={{ ...styles.modalView, alignItems: 'center', justifyContent: 'center' }}>

            <View>
              <Text style={styles.centerer}>
                {fullDate.getMonth() + 1}/{day}/
                {fullDate.getFullYear()}
              </Text>
              <View>{ }</View>
              {eventList}
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}></Pressable>
          </View>
        </View>

      </Modal>
      <Pressable
        style={sty}
        onPress={() => {
          console.log('popUp');
          setModalVisible(true);
        }}>
        {clickLink}
      </Pressable>
    </View>
  );
};


const EventAdderInterface = (addto, ref) => {
  const [activeEventAdder, setActiveEventAdder] = useState(false);
  const eventInput = TypeBox('Events ', '', styles.textStyle);
  const [eventAdderPressed, setEventAdderPressed] = useState(false);

  const addEventButtonPushed = () => {
    setActiveEventAdder(!activeEventAdder);
  };

  const addEventSubmit = () => {
    addto.EventAdded(eventInput[1]);
    setActiveEventAdder(false)
    //console.log(ref)
    ref(false)


  };

  const eventadder = (
    <View>
      {!activeEventAdder && (
        <View style={styles.centerer}>
          <Button
            title={'Add Event'}
            onPress={() => addEventButtonPushed()}></Button>
        </View>
      )}

      {activeEventAdder && (
        <View style={styles.centerer}>
          <View style={(styles.centerer, { flex: 6 })}>{eventInput[0]}</View>

          <View style={styles.containerRow}>
            <Button
              title={'Cancel'}
              onPress={() => addEventButtonPushed()}></Button>
            <Button title={'Submit'} onPress={() => addEventSubmit()}></Button>
          </View>
        </View>
      )}
    </View>
  );

  return [eventadder, eventAdderPressed];
};

