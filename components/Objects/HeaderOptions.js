import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HeaderOptions = {
  front: {
    headerShown: true,
    headerBackVisible: false,
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ffc20f',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  signIn: {
    headerShown: false,
    //headerBackVisible: false,
    //headerLeft: null,
    headerStyle: {
      backgroundColor: '#ffc20f',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};
export default HeaderOptions