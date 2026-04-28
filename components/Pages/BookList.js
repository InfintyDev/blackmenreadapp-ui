import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  StatusBar,
  TextInput,
} from 'react-native';


// or any files within the Snack
import BookWithLink from '../Objects/BookAndLink';

import SideBar from '../Objects/SideBar';
import styles from '../Objects/Styles';
import BookListView from '../Objects/BookListView';

//import axios from 'axios';


import { fetchBookRecomendations, getLocalBookRec } from '../../GetSaveUserFromServer';
//import { GoogleSignin } from 'react-native-google-signin';

import React, {
  useState,
  data,
  Component,
  useCallback,
  useMemo,
  useRef,
} from 'react';




function ListArrayToBooks(listAray = [['']], imageStyle) {

  var listOfBooks = [];

  for (var i = 1; i < listAray.length; i++) {
    //console.log(listAray[i])
    if (
      listAray[i]["Title"] != '' &&
      listAray[i]["Author"] != '' &&
      listAray[i]["Image url"] != '' &&
      listAray[i]["Link url"] != ''
    ) {
      listOfBooks[i] = [
        listAray[i]["Title"],
        BookWithLink(
          listAray[i]["Title"],
          listAray[i]["Author"],
          listAray[i]["Link url"],
          imageStyle,
          listAray[i]["Image url"]
        ), listAray[i]["Author"]
      ];
    } else {
      listOfBooks[i] = <View />;
    }
  }
  return listOfBooks;
}

export default function BookList() {
  console.log('ReRender')

  const [bookArray, setBookArray] = useState([{}]);
  const [settedArray, setSettedArray] = useState(false);

  const getBookListFormated = async () => {
    const bookRec = await fetchBookRecomendations();

    try {


      const data = bookRec;
      //console.log(await data);
      if (settedArray == false && await data != null) {
        setBookArray(await data);
        setSettedArray(true);
      }

      return true
    } catch { console.log('failed to get') }
  };


  getBookListFormated();
  const listOfBooks = ListArrayToBooks(bookArray, styles.img);

  const bookView = BookListView(listOfBooks)

  return (
    <View style={styles.containerRow} >
      <SideBar />
      {bookView}


    </View >
  );
}

const stylem = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'lightgray',
    padding: 0,
    height: 320,
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});
