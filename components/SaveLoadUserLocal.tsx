
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './InfoHolders/User';
import useState from 'react';



const isUserValue = (value: any) => {
  if (typeof value == typeof new User()) {
    return true;
  } else {
    return false;
  }
};
export const saveUserToken = async (token: User) => {
  try {
    const jsonValue = JSON.stringify(token);
    await AsyncStorage.setItem('userToken', jsonValue);
    console.log('stored ' + jsonValue);
  } catch (error) {
    console.log('falure');
    console.log(error);
  }
};

export const getUserToken = async () => {
  //const [theData, setTheData] = useState('Waiting for data...');
  try {
    const jsonData = await AsyncStorage.getItem('userToken');
    if (jsonData != null) {
      if (typeof JSON.parse(jsonData) == typeof new User()) {
        const theUser: User = JSON.parse(jsonData);
        return theUser;
      }
    }

  } catch (error) {
    // Handle reading error
    console.log('falure to retrive');
  }
  return null;
};

export default saveUserToken;