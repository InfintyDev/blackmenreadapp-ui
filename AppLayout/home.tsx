import { Text, SafeAreaView, StyleSheet } from 'react-native';
import FrontPage from '../components/Pages/FrontPage.js'

export default function HomePage()
{

  return( 
    <SafeAreaView>
    {FrontPage()}
    </SafeAreaView>
    

  );

}