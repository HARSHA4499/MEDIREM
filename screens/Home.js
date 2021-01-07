import React,{useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity,useWindowDimensions,ScrollView} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Button} from 'react-native-elements';
import { Alert } from 'react-native';
import firebase from './Firebase'
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native'




function Home(props) {
    const isFocused = useIsFocused()


    const [rems, setRems] = useState([])
    const [loading,setLoading]=useState(false)

    const ref=firebase.firestore().collection("remainders"); 

  
  
  function getRems(){
    setLoading(true);

    
    ref.get().then((snapshot)=>{
      const items=[];
      snapshot.forEach((doc)=>{
        items.push(doc.data());

      });
      setRems(items);
      setLoading(false);
    });
  }
  // var db=firebase.firestore();
//       db.collection("remainders").get().then((snapshot)=>{
//           snapshot.docs.forEach(doc=>{
//               remainders.push(doc.data())
//               console.log("harsha")
//               console.log(remainders)
//     })
//   });


  useEffect(()=>{
    getRems();
  },[isFocused]);

  if(loading){
    return <Text>...Loading</Text>
  }



    
    
    return (
        <View style={styles.heading}>
            <Text>Remainders</Text>
        <View style={{marginTop:30}}>
            <Text>remainders</Text>
            {rems.map((rem)=>(
                <View key={rem.id} >
                <Text>{rem.id}</Text>
                <Text>{rem.time}</Text>
                <Text>{rem.name}</Text>
                <Text>{rem.date}</Text>
                <Text></Text>
                </View>
            ))}
    </View>
        </View>
    )
}

const styles=StyleSheet.create({
    heading:{
        flex:1,
        
    },
    text:{
        paddingLeft:30,
        fontSize:20,
        color:'black',
        paddingTop:30
    },
    icon:{
        flex:1,
        justifyContent:'flex-end',
        textAlign:'center',
        paddingBottom:10,
        marginLeft:135,


    }

});

export default Home
