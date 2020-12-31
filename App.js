import React from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import AddRemainder from './screens/AddRemainder';
import Home from './screens/Home';
import Htmlcheck from './screens/Htmlcheck';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIOS } from 'react-native';


const Tab=createBottomTabNavigator();

export default function App() {
  return (
    
    <NavigationContainer >
      <Tab.Navigator tabBarOptions={{activeBackgroundColor:"coral",labelStyle:{fontSize:18,padding:10,color:"black"} }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Add" component={AddRemainder}/>
        <Tab.Screen name="Notes" component={HealthNotes}/>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center'

    
  },
});
