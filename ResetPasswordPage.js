// ResetPasswordPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import firebase from './firebaseConfig';

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Réinitialiser le mot de passe</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      {success ? (
        <Text>Un email de réinitialisation du mot de passe a été envoyé à {email}.</Text>
      ) : (
        <View>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            placeholder="Adresse email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Button title="Réinitialiser le mot de passe" onPress={handleResetPassword} />
        </View>
      )}
    </View>
  );
}

export default ResetPasswordPage;
