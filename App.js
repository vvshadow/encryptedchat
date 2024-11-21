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



  //const [number, onChangeNb] = useState();
  //const [nombre, setNombre] = useState(Math.floor(Math.random() * 40));
  //let max = 100;
  //let min = 1;


  const [saisie, setsaisie] = useState("S?");

  const listecourses = ["Pain", "Fromage", "Fruits"];

  const ajouter = () =>{
    
  }

/*  const validate = () => {
    if (saisie == nombre) {
      alert("reussis")
    } else if (saisie > nombre) {
      alert("faux plus petit");
    }
    else {
      alert("faux plus grand");
    }
  }*/

  return (
    /*<View style={styles.container}>
      <Text style={styles.Text}>
        App Zayd React native</Text>
      <StatusBar style="auto" />
      <Image source={require('./assets/favicon.png')}></Image>
      <Button onPress={() => Alert.alert('Vous avez cliquez')} title="React" color="#ff0000"
        accessibilityLabel="test de test de test" />
      <Text>valeur de {nb}</Text>
      <TextInput
        style={styles.input}
        placeholder='Saisisez votre normbre'
        value={saisie}
        onChangeText={(value) => setsaisie(value)}
        keyboardType='text'

      ></TextInput>
      <Text>nombre magique : {nombre}</Text>
      <Button onPress={plus} title="plus" color="#ff0000"
        accessibilityLabel="testplus" />

      <Button onPress={moins} title="moins" color="#ff0000"
        accessibilityLabel="testplus" />
      <Button onPress={validate} title="valider" color="#ff0000"
        accessibilityLabel="testplus" />
    </View>*/
    <View style={styles.container}>
      <Text style={styles.Text}>
        Liste de course de Zayd</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        value = {saisie}
        onChangeText={(value) => setsaisie(value)}
        keyboardType="text"

      ></TextInput>
      <Button onPress={ajouter} title="ajouter" color="#ff0000" accessibilityLabel="testajouter"/>
      {
        listecourses.map((element, i) => {
          return (
            <Text> {i + 1} - {element} </Text>
          );
        })
      }
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
