import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  StatusBar,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack

import SideBar from '../Objects/SideBar';
import styles from '../Objects/Styles';



export default function MakeScroll(content, inputheight) {

  return (



    <SafeAreaProvider>
      <SafeAreaView styles={stylem.container} edges={['top']}>
        <ScrollView
          style={{ height: inputheight }}
          showsVerticalScrollIndicator={true}>
          <View>
            {content}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>

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
