import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import { LesBoutons, LeTextInput } from './lesBoutons';
import axios from 'axios';

export default function App() {
  const [saisie, setsaisie] = useState(""); // Saisie utilisateur pour un produit
  const [listecourses, setList] = useState(["Pain", "Fromage", "Fruits"]);

  
  const ajouter = () => {
    if (saisie.length >= 1) {
      setList([...listecourses, saisie]);
      Alert.alert("Produit ajouté", "Vous avez ajouté : " + saisie);
      setsaisie(""); 
    } else {
      Alert.alert("Erreur", "Vous n'avez rien ajouté !");
    }
  };

  const supprimer = (index) => {
    const nouvelleListe = listecourses.filter((_, i) => i !== index);
    setList(nouvelleListe);
    Alert.alert("Produit supprimé, Vous avez supprimé : " + listecourses[index]);
  };

  const modifier =(index) =>{
    setsaisie(listecourses[index]);
    const nouvelleListe= listecourses.filter((_, i) => i !== index);
    setList(nouvelleListe);}
  
  

  return(
    <View style={styles.container}>
      <Text style={styles.Text}>Liste de course de Zayd</Text>
      <StatusBar style="auto" />
      {listecourses.map((element, i) => (
        <View key={i} style={styles.itemContainer}>
          <Text style={styles.itemText}>{i + 1} - {element}</Text>
          <TouchableOpacity onPress={() => modifier(i)} style={styles.modifyButton}>
            <Text style={styles.buttonText}>Modif</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => supprimer(i)} style={styles.deleteButton}>
          
            <Text style={styles.buttonText}>Supp</Text>
          </TouchableOpacity> 
          
        </View>
      ))}
      <TextInput
        style={styles.input}
        value={saisie}
        onChangeText={(value) => setsaisie(value)}
        placeholder="Ajoutez prod"
      />
      <LeTextInput saisie={setsaisie} lestyles={styles}></LeTextInput>
      <LesBoutons ajouter={ajouter} lestyle={styles}></LesBoutons>
    </View>
  );}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#afff33',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    paddingLeft: 5,
    width: '80%',
  },
  Text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  modifyButton: {
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
