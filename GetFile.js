import Papa, { parse } from 'papaparse';
import React, {
  useState,
} from 'react';
//var RNFS = require('react-native-fs');
//import * as FileSystem from 'expo-file-system';
//import { readFile } from 'react-native-fs';
import { Dirs, FileSystem } from 'react-native-file-access';

export default async function readCSV(csvFile) {
  const [dataset, setDataSet] = useState(false)
  const [data, setData] = useState([['']])

  try {
    const path = Dirs.DocumentDir() + '/example.txt';
    console.log(path)
    const content = await FileSystem.readFile(path);
    console.log(await fetch('http://localhost:5000/BookRec'))


    Papa.parse(readFile('./assets/filename.csv'), {

      complete: function (result) {
        console.log(result)
        if (dataset == false) {
          setData(result);
          setDataSet(true)
        }

      }
    });

    return data;


  } catch (error) {
    console.log(error)
  }
};

