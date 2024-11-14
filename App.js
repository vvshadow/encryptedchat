import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Randomiser, TextInput } from 'react-native';



export default function App() {
  const [nb, setNb] = useState(0);

  const plus = () => {
    setNb(nb + 1);
  }

  const moins = () => {
    setNb(nb - 1)
  }
  const [number, onChangeNb] = useState();
  

  let max = 100;
  let min = 1;
  let rand = Math.floor(Math.random() * number);

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>
        App Zayd React native</Text>
      <StatusBar style="auto" />
      <Image source={require('./assets/favicon.png')}></Image>
      <Button onPress={() => Alert.alert('Vous avez cliquez')} title="React" color="#ff0000"
        accessibilityLabel="test de test de test" />
      <Text>valeur de {nb}</Text>
      <TextInput
      style={styles.input}
      onChanheText={number => onChangeNb(number)}
      value={number}
      placeholder='Entrer un nombre'
      keyboardType='numeric'
      ></TextInput>
      <Text>nombre magique : {rand}</Text>
      <Button onPress={plus} title="plus" color="#ff0000"
        accessibilityLabel="testplus" />

      <Button onPress={moins} title="moins" color="#ff0000"
        accessibilityLabel="testplus" />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#afff33',
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  statusbar: {
    color: '#ff0000',
  },
  Text: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});
