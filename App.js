import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import './config/firebaseConfig';
import Navigator from './navigation/Navigator';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Chat app demo</Text>
//         <Image
//           source={{
//             uri: 'https://reactjs.org/logo-og.png'
//           }}
//           style={styles.image}
//         />
//       </View>
//       <ChatPage/>
//     </View>
//   );
// };

const App = () => {
  return (

    <View style={styles.container}>

      <NavigationContainer>

        <Navigator />
        
      </NavigationContainer>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // header : {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // title: {
  //   color: '#ffffff',
  //   fontSize: 20,
  //   fontWeight: 'normal',
  //   flex: 3
  // },
  // image: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 50,
  //   borderColor: '#0f0',
  //   borderWidth: 3,
  //   flex: 1
    
  // },

});

export default App;
