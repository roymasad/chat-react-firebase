
import { StyleSheet, View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

const ChatBubble = ({text, align}) => {

    return (
        <View style={align=="right" ? styles.alignRight : styles.alignLeft}>
            <Text style={styles.message}>{text}</Text>
        </View>
    );

}

const styles = StyleSheet.create({

    message: {
      borderRadius: 50,
      borderColor: '#0f0',
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      color: '#fff'
  
    },
    alignRight: {
        alignSelf : 'flex-end'
    },
    alignLeft: {
        alignSelf : 'flex-start'
    }
  });
  
  export default ChatBubble;