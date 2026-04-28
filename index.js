import { View, AppRegistry } from 'react-native';



import App from './App.js';



// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
console.log('loaded')

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
});
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelloWorld />
    </React.StrictMode>
);
*/