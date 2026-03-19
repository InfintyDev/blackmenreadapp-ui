import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    Button,
    StatusBar,
    TextInput,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import * as Papa from 'papaparse';
// or any files within the Snack
import BookWithLink from '../Objects/BookAndLink';

import SideBar from '../Objects/SideBar';
import styles from '../Objects/Styles';

//import axios from 'axios';

import getCSV from '../../GetFile';
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




export default function BookListView(listOfBooks) {

    const [searchString, setSearchString] = useState('');

    console.log(listOfBooks)
    return (

        < View style={{ ...styles.containerColoum }} >
            <Card style={styles.paddedCardHalf}>
                <Text style={styles.headerText}> Book List </Text>
            </Card>
            < Card >
                <TextInput
                    onChangeText={(value) => setSearchString(value)}
                    value={searchString} />
            </Card>
            < SafeAreaProvider >
                <SafeAreaView styles={stylem.container} edges={['top']} >
                    <ScrollView
                        style={stylem.scrollView}
                        showsVerticalScrollIndicator={true} >
                        <View>
                            {
                                listOfBooks.map((bookInst) => (
                                    <View>
                                        {(String(bookInst[0])
                                            .toLowerCase()
                                            .includes(searchString.toLowerCase()) || String(bookInst[2])
                                                .toLowerCase()
                                                .includes(searchString.toLowerCase())) && bookInst[1]}
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </View>

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
        height: 600,
        maxWidth: "100%",
        alignContent: "center",
        alignSelf: 'center',




    },
    text: {
        fontSize: 42,
        padding: 12,
    },
});
