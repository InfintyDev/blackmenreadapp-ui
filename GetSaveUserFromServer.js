import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pathToWebSite = 'https://blackmenreadapp-api.onrender.com'
//const pathToWebSite = 'http://localhost:5000'
export const saveUserToServer = async (userData) => {
  try {
    const response = await axios.post(
      'https://blackmenreadapp-api.onrender.com/',
      userData
    );
    console.log('User saved successfully:', response.data);
    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error saving user:', error);
    // Handle error, e.g., display an error message to the user
  }
};

export const saveBookRecToComputor = async () => {

  try {
    const bookrec = await fetchBookRecomendations()
    const jsonValue = JSON.stringify(bookrec);
    await AsyncStorage.setItem('BookRecToken', jsonValue);
    console.log('stored ' + jsonValue);
  } catch (error) {
    console.log('falure');
  }
};

export const saveUserToken = async (token) => {
  console.log(token)
  try {
    const jsonValue = JSON.stringify(token);
    await AsyncStorage.setItem('userToken', jsonValue);
    console.log('stored ' + jsonValue);
    await navigation.navigate('Home');
  } catch (error) {
    console.log('falure');
  }
};
export const saveUserDataLocaly = async (userData) => {
  try {

    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error saving user:', error);
    // Handle error, e.g., display an error message to the user
  }
};
export const getUserDataLocaly = async () => {
  try {
    const jsonData = await AsyncStorage.getItem('userToken');

    const data = JSON.parse(jsonData)

    console.log(data)
    return (await data)
  } catch (error) {
    // Handle reading error
    console.log('falure to retrive');
  }

};

export const getLocalBookRec = async () => {
  try {
    const jsonData = await AsyncStorage.getItem('BookRecToken');

    const data = JSON.parse(jsonData)

    console.log(data)
    return (await data)
  } catch (error) {
    // Handle reading error
    console.log('falure to retrive');
  }

};
export const loginRequest = async (email = '', password = '', usertype = '') => {
  try {
    const response = await fetch(pathToWebSite + '/LoginForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          usertype: usertype,
        }
      })
    });


    return await response.json();



    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    return await { Fail: true }
    // Handle error, e.g., display an error message to the user
  }
};

export const addUserRequest = async (email = '', password = '', userName = '', userType = '') => {
  try {
    const response = await fetch(pathToWebSite + '/AddNewUserForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: userName,
          usertype: userType
        }
      })
    });
    //await console.log(await response.json());

    console.log(await response.json())
    return await response.json();
    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error Logging in:', error);
    // Handle error, e.g., display an error message to the user
  }
};

export const IsEmailUsed = async (email = '') => {
  try {
    const response = await fetch(pathToWebSite + '/isEmailUsed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email
        }
      })
    });
    await console.log('Logged In:', response.data);
    return await response.data
    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error Logging in:', error);
    // Handle error, e.g., display an error message to the user
  }
};

export const addUserLogs = async (email = '', id, usertype = '', log, totalTimeRead) => {
  console.log('addLog')
  try {
    const response = await fetch(pathToWebSite + '/AddUserLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: email,
          id: id,
          usertype: usertype,
          log: log,
          totalTimeRead: totalTimeRead

        }
      })
    });


    return await response.json();



    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error Logging in:', error);
    // Handle error, e.g., display an error message to the user
  }
};


export const connectUserTo = async (connectToEmail = '', connectToId, ConnectToUsertype = '', connectEmail = '', connectId = '') => {
  console.log('addLog')
  try {
    const response = await fetch(pathToWebSite + '/ConnectUserTo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          toEmail: connectToEmail,
          toId: connectToId,
          toUsertype: ConnectToUsertype,
          connectEmail: connectEmail,
          connectId: connectId

        }
      })
    });


    return await response.json();



    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error Logging in:', error);
    // Handle error, e.g., display an error message to the user
  }
};


export const removeConnectedUser = async (connectToEmail = '', connectToId, ConnectToUsertype = '', removeEmail = '', removeId = '') => {
  console.log('addLog')
  try {
    const response = await fetch(pathToWebSite + '/RemoveConnectedUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          toEmail: connectToEmail,
          toId: connectToId,
          toUsertype: ConnectToUsertype,
          removeEmail: removeEmail,
          removeId: removeId

        }
      })
    });


    return await response.json();



    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error Logging in:', error);
    // Handle error, e.g., display an error message to the user
  }
};

export const GetConnectedUser = async (email = '', id, userType = '') => {
  console.log('getData')
  try {
    const response = await fetch(pathToWebSite + '/GetConnectedUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          id: id,
          usertype: userType
        }
      })
    });
    //console.log(await response.json())
    return await response.json()
    // Handle successful response, e.g., navigate to a different screen
  } catch (error) {
    console.error('Error Logging in:', error);
    // Handle error, e.g., display an error message to the user
  }
};


export const fetchNotes = async () => {
  try {
    const response = await axios.get(pathToWebSite + '/notes');
    console.log(response.data);
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
};


export const fetchBookRecomendations = async () => {
  try {
    const response = await axios.post(pathToWebSite + '/BookRec');
    console.log(await response.data);
    return await response.data
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
};


export const fetchCalendar = async () => {
  try {
    const response = await axios.post(pathToWebSite + '/CalenderData');
    //console.log(await response);
    return await response.data
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
};



