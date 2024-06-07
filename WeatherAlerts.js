import { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase/app'; 

const WeatherAlerts = () => {
  useEffect(() => {
    // Demander les permissions nécessaires pour la géolocalisation sur Android
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permission de géolocalisation',
              message: 'L\'application a besoin d\'accéder à votre localisation',
              buttonNeutral: 'Demander plus tard',
              buttonNegative: 'Annuler',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission de géolocalisation accordée');
            getLocation();
          } else {
            console.log('Permission de géolocalisation refusée');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getLocation();
      }
    };

    // Fonction pour obtenir la géolocalisation
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Utiliser les coordonnées pour obtenir les données météorologiques
          fetchWeatherData(latitude, longitude);
        },
        error => {
          console.error('Erreur de géolocalisation : ', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    // Demander la permission et obtenir la géolocalisation
    requestLocationPermission();
  }, []);

  const fetchWeatherData = (latitude, longitude) => {
    // Effectuer une requête HTTP pour récupérer les données météorologiques
    // Utilisez une API météo de votre choix
    // Exemple simplifié :
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;

        // Vérifier les conditions météorologiques et afficher une alerte si nécessaire
        if (temperature > 35) {
          Alert.alert(
            'Alerte météo',
            'Température élevée détectée ! Prenez des mesures de protection pour vos cultures.',
          );
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des données météorologiques :', error));
  };

  return null; // Cette composante ne rend rien visuellement
};

export default WeatherAlerts;
