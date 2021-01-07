import React from 'react'
import { StyleSheet, Text, View,useWindowDimensions } from 'react-native';
import firebase from 'firebase';
import Home from './Home'
import Fb from './Firebase'
import { useState } from 'react';
import Memo from './Memo';
import { useEffect } from 'react';


var remainders=[]

function FirebaseFile(props) {
 
  
  
var s="harsha vardhan"

return(
  <View>
                {props.rems.map((item)=>{
                return (
                    <Text>{item.name}</Text>
                    
                )
                })} 
  </View>
)
}






export default FirebaseFile

