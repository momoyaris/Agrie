import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import firebase from 'firebase/app'; // Importer la configuration Firebase
import 'firebase/auth';
import 'firebase/firestore';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Récupérer les messages depuis la base de données Firebase
    const chatRef = firebase.database().ref('chat');
    chatRef.on('value', (snapshot) => {
      const messagesArray = [];
      snapshot.forEach((childSnapshot) => {
        messagesArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setMessages(messagesArray);
    });
  }, []);

  const sendMessage = () => {
    // Envoyer un nouveau message dans la base de données Firebase
    const chatRef = firebase.database().ref('chat');
    chatRef.push({
      text: newMessage,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    setNewMessage('');
  };

  return (
    <View>
      <Text>Chat privé</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
      <TextInput
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        placeholder="Nouveau message"
      />
      <Button title="Envoyer" onPress={sendMessage} />
    </View>
  );
}

export default Chat;
