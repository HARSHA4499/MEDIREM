import React from 'react';
import { StyleSheet, Text, View,ScrollView} from 'react-native';
import AddRemainder from './screens/AddRemainder';


export default function App() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <AddRemainder/>
      
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

    
  },
});
