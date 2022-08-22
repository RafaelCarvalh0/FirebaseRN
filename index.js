/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Recebendo notificações em Background (App fechado)
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Recebido no BACKGROUND', remoteMessage);
})

AppRegistry.registerComponent(appName, () => App);
