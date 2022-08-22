import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import messaging from '@react-native-firebase/messaging';

export default () => {

  //Tipos de status
  // - feito
  // - aceito
  // - enviado
  // - entregue
  const [orderStatus, setOrderStatus] = useState('feito');

  handleNotifyOpen = (remoteMessage) => {
    if(remoteMessage) {
      console.log('Abriu o app com: ', remoteMessage);

      if(remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    }
  }

  useEffect(() => {
    //Pedindo permissão de notificação
    const requestNotifPermission = async () => {
      const authStatus = await messaging().requestPermission();
    //   const enabled =
    // authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    // authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log("Permissão" , authStatus);
    }
    requestNotifPermission();

    //Pegando o TOKEN do dispositivo (Oque identifica o celular que o usuário está usando)
    messaging().getToken().then((token) => {
      console.log("Token do dispositivo", token);
    });

    // Recebendo notificação foreground (app aberto)
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Recebido no FOREGROUND ', remoteMessage);  

      if(remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }

    });

    // Evento para clique na notificação (em background)
    messaging().onNotificationOpenedApp(handleNotifyOpen);

    //Evento para click na notificação (Com app totalmente fechado)
    messaging().getInitialNotification().then(handleNotifyOpen);

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.orderTitle}>Pedido 1234</Text>
      <Text>Status:</Text>
      <Text  style={styles.orderStatusText}>
        {orderStatus == 'feito' && '#1 Seu pedido foi feito'}
        {orderStatus == 'aceito' && '#2 Pedido está sendo preparado'}
        {orderStatus == 'enviado' && '#3 Saiu para entrega'}
        {orderStatus == 'entregue' && '#4 Pedido entregue com sucesso'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderTitle: {
    fontSize: 20,
    marginBottom: 20
  },
  orderStatusText: {
    fontSize: 17
  }
});