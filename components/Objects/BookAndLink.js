import {
  Text,
  StyleSheet,
  Image,
  View,
  LayoutRectangle,
  TextLayoutLine,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// You can import supported modules from npm
import {
  Card,
  Searchbar,
  Banner,
  Checkbox,
  Divider,
  List,
  Button,
} from 'react-native-paper';

import { React } from 'react';

import { Router, Link } from 'expo-router';


// or any files within the Snack

function MakeImage(imageStyle, imageSource) {
  return (
    <View>
      <Image style={imageStyle} source={imageSource} />
    </View>
  );
}

export default function BookWithLink(
  bookName = '',
  author = '',
  bookLink,
  imageStyle,
  imageSource
) {
  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.centeredContainer}>
        <View style={styles.centerer}>
          <Text style={styles.bookText}>
            <Link href={bookLink}>{bookName}</Link>
          </Text>

          {MakeImage(imageStyle, imageSource)}

          <Text style={styles.bookText}>By {author}</Text>
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  centerer: {
    flex: 1,
    verticalAlign: 'bottom',
    textAlign: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,

    padding: 8,
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookText: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerText: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    height: 90,
    width: 90,
    margin: 30,
  },
});
