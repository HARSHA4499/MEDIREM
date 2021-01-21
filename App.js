import React,{useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import AddRemainder from './screens/AddRemainder';
import Home from './screens/Home';
import Htmlcheck from './screens/Htmlcheck';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIOS } from 'react-native';
import HealthNotes from './screens/HealthNotes'
import Firebase from './screens/Firebase';
import FirebaseFile from './screens/FirebaseFile'
import { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'



// var db=firebase.firestore();
//       db.collection("remainders").get().then((snapshot)=>{
//           snapshot.docs.forEach(doc=>{
//               remainders.push(doc.data())
//               console.log("harsha")
//               console.log(remainders)
//     })
//   });




const Tab=createBottomTabNavigator();


const getFonts=()=>Font.loadAsync({
  'nunito-regular':require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold':require('./assets/fonts/Nunito-Bold.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  

     
  if(fontsLoaded){
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
  else{
    return (
      <AppLoading
      startAsync={getFonts}
      onFinish={()=>setFontsLoaded(true)}/>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center'

    
  },
});
