import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Importer des icônes
import firebase from './firebaseConfig';


function NewsFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = firebase.database().ref('news-feed');
        postsRef.on('value', (snapshot) => {
          const postsArray = [];
          snapshot.forEach((childSnapshot) => {
            postsArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
          });
          setPosts(postsArray);
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const postRef = firebase.database().ref(`news-feed/${postId}`);
      const snapshot = await postRef.once('value');
      const likes = snapshot.val().likes || 0;
      postRef.update({ likes: likes + 1 });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = (postId) => {
    // Implémenter la navigation vers la page de commentaire
  };

  const handleShare = (postId) => {
    // Implémenter la logique de partage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fil d'actualité</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComment(item.id)}>
                <FontAwesome name="comment-o" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare(item.id)}>
                <AntDesign name="sharealt" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text>{item.likes || 0} Likes</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postContainer: {
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default NewsFeed;
