import React,{useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity,useWindowDimensions,ScrollView, FlatList, SafeAreaView} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Button} from 'react-native-elements';
import { Alert } from 'react-native';
import firebase from './Firebase'
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
import HeaderFile from './HeaderFile'




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

    const pressHandler=(item)=>{
      Alert.alert(
        'Med Details',
        (item.date+" at "+item.time),
        [
            { text: 'OK' }
        ],
        );
    }


    
    
    return (
        <View style={{flex:1}}>
          <HeaderFile/>
          <View style={styles.container}>
            <FlatList 
              keyExtractor={(item)=>item.id.toString()}
              data={rems}
              renderItem={({item})=>(
                <TouchableOpacity onPress={()=>pressHandler(item)}>
                <Text style={styles.item}>{item.name}</Text>
                </TouchableOpacity>
              )}
              />
          </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"white",
      paddingTop:30,
      paddingHorizontal:-10,
      marginHorizontal:5,
      
    },
    item:{
      marginTop:24,
      padding:10,
      backgroundColor:'pink',
      fontSize:20,
      fontFamily:'nunito-bold'
    }

});

export default Home
