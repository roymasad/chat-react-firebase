
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import ChatBubble from '../components/ChatBubble';

const database = firebase.database();

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);
  const flatListRef = useRef(null);
  const [username, setUsername] = useState(''); 


  useEffect(() => {
    const messagesRef = database.ref('messages').limitToLast(100);
    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
    });

    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = database.ref(`users/${userId}/nickname`);
      userRef.on('value', (snapshot) => {
        const newUsername = snapshot.val();
        setUsername(newUsername);
      });
    }

    return () => {
      messagesRef.off();
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = database.ref(`users/${userId}/nickname`);
        userRef.off();
      }
    };
  }, []);

  const handleSend = () => {
    if (inputText) {

      const user = firebase.auth().currentUser; 

      if (user) {
        const userId = user.uid; 
        const newMessageRef = database.ref('messages').push();
        newMessageRef.set({
          text: inputText,
          timestamp: Date.now(),
          userId: userId, 
          username: username,
          type: "string"
        });
      }
    }
    setInputText('');
    inputRef.current.focus();
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble 
            text={item.text} 
            align={item.userId === firebase.auth().currentUser?.uid ? 'right' : 'left'}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageContainer}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="  Type your message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
    paddingBottom: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  messageContainer: {
    marginTop: 20,
    width: 350,
  },
  message: {
    borderRadius: 50,
    borderColor: '#0f0',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    color: '#fff',

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    //marginBottom: 60,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,

  },
  sendButton: {
    marginLeft: 15,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#0f0',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ChatPage;
