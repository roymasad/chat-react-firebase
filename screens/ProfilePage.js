import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Image, Pressable, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const database = firebase.database();
const storage = firebase.storage();

const ProfilePage = () => {
  const [nickname, setNickname] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    // Retrieve the current user's profile data from the database
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = database.ref(`users/${user.uid}`);
      userRef.on('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setNickname(userData.nickname);
          setAvatarURL(userData.avatarURL);
        }
      });
    }
  }, []);

  const handleNicknameChange = (text) => {
    setNickname(text);
  };

  const handleSaveProfile = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      // Save the profile data to the database
      const userRef = database.ref(`users/${user.uid}`);
      userRef.set({
        nickname: nickname,
        avatarURL: avatarURL,
      })
      .then(() => {
        Alert.alert('Profile saved successfully');
      })
      .catch((error) => {
        Alert.alert('Error saving profile', error.message);
      });
    }
  };

  const handleChooseAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {

      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

    if (!result.cancelled) {

        uploadImage(result.uri);
    }
  };

  const uploadImage = async (imageUri) => {
        
    const response = await fetch(imageUri);
    const blob = await response.blob();
  
    const filename = `avatars/${firebase.auth().currentUser.uid}/${Date.now()}`;
    const storageRef = storage.ref(filename);
    const uploadTask = storageRef.put(blob);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log('Uploading Image..');
      },
      (error) => {
        console.error('Image upload error:', error);
      },
      () => {
        console.log('Image uploaded successfully!');

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('Download URL:', downloadURL);
          setAvatarURL(downloadURL);
        });
      }
    );
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={handleNicknameChange}
      />
      <Pressable style={styles.avatarContainer} onPress={handleChooseAvatar}>
        {avatarURL ? (
          <Image source={{ uri: avatarURL }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarPlaceholder}>Choose Avatar</Text>
        )}
      </Pressable>
      <Pressable style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  avatarContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    fontSize: 16,
    color: '#666666',
  },
  saveButton: {
    backgroundColor: '#0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
