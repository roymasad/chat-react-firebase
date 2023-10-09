import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/database';
import ChatPage from '../screens/ChatPage';
import LoginScreen from '../screens/LoginScreen';
import ProfilePage from '../screens/ProfilePage';

const Stack = createNativeStackNavigator();

const HeaderRightButton = ({ navigation }) => {
  const handleAlertButtonPress = () => {
    Alert.alert('Button Pressed', 'Test Alert Box');
  };

  const handleHomeButtonPress = () => {
    Alert.alert('Home Button Pressed', 'Go to Home');
  };

  const handleLogout = () => {
    firebase.auth().signOut();

  };

  const handleProfileButtonPress = () => {
    navigation.navigate('Profile');
  };

  return (
    <React.Fragment>
      <TouchableOpacity onPress={handleAlertButtonPress} style={{ marginRight: 20 }}>
        <FontAwesome name="bell" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfileButtonPress} style={{ marginRight: 10 }}>
        <FontAwesome name="user" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ marginRight: 30 }}>
        <FontAwesome name="home" size={24} color="white" />
      </TouchableOpacity>
    </React.Fragment>
  );
};

const Navigator = () => {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
  
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#666666' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: () => user ? <HeaderRightButton  navigation={navigation} /> : null,
      }}
      >
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
        ) : null}
        {user ? (
          <Stack.Screen
            name="Chat"
            component={ChatPage}
            options={{ title: 'Chat App' }}
          />
        ) : null}

        {user ? (
          <Stack.Screen 
            name="Profile" 
            component={ProfilePage} 
            options={{ title: 'Profile' }} 
          />
        ) : null}

      </Stack.Navigator>
    );
  };

export default Navigator;
