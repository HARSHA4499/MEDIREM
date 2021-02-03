import React from 'react';
import { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'

import { createAppContainer, createSwitchNavigator } from 'react-navigation-latest';
import AuthNavigator from './screens/AuthNavigator';
import HomeScreen from './screens/HomeScreen.js';
import firebase from 'firebase'
import { View } from 'react-native';
import { Text } from 'react-native';





// var db=firebase.firestore();
//       db.collection("remainders").get().then((snapshot)=>{
//           snapshot.docs.forEach(doc=>{
//               remainders.push(doc.data())
//               console.log("harsha")
//               console.log(remainders)
//     })
//   });







const getFonts=()=>Font.loadAsync({
  'nunito-regular':require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold':require('./assets/fonts/Nunito-Bold.ttf')
});


const AppNavigator = createSwitchNavigator({
      Auth: AuthNavigator,
      App: HomeScreen,  
});

AppContainer = createAppContainer(AppNavigator);








export default function App(){
  const [fontsLoaded, setFontsLoaded] = useState(false)


  if(fontsLoaded){
    return <AppContainer/>
  }
  else{
    return (
      <AppLoading
      startAsync={getFonts}
      onFinish={()=>setFontsLoaded(true)}/>
  )

  }
  
}

