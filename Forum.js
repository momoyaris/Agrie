import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import firebase from 'firebase/app'; // Importation de firebase
import 'firebase/auth'; // Importation des fonctionnalités d'authentification de firebase
import 'firebase/firestore'; // Importation des fonctionnalités de firestore de firebase
import './firebaseConfig'; // Importation de la configuration Firebase

function Forum() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    // Récupérer les sujets depuis la base de données Firebase
    const topicsRef = firebase.database().ref('forum/topics');
    topicsRef.on('value', (snapshot) => {
      const topicsArray = [];
      snapshot.forEach((childSnapshot) => {
        topicsArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setTopics(topicsArray);
    });
  }, []);

  const createTopic = () => {
    // Ajouter un nouveau sujet dans la base de données Firebase
    const topicsRef = firebase.database().ref('forum/topics');
    topicsRef.push({
      title: newTopic,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    setNewTopic('');
  };

  return (
    <View>
      <Text>Forum de conversation</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
      <TextInput
        value={newTopic}
        onChangeText={(text) => setNewTopic(text)}
        placeholder="Nouveau sujet"
      />
      <Button title="Créer un sujet" onPress={createTopic} />
    </View>
  );
}

export default Forum;
