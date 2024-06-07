import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firebase from './firebaseConfig';


function Profile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref(`profiles/${userId}`);
        const snapshot = await userRef.once('value');
        setUserProfile(snapshot.val());
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil personnel</Text>
      {userProfile && (
        <View>
          <Image source={{ uri: userProfile.photoUrl }} style={styles.profileImage} />
          <Text>Nom: {userProfile.name}</Text>
          <Text>Email: {userProfile.email}</Text>
          <Text>Numéro: {userProfile.numéro}</Text>
          <Text>Adresse: {userProfile.adresse}</Text>
          {/* Ajoutez d'autres informations de profil ici */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default Profile;
