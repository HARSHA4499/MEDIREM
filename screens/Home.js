import React,{useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity,useWindowDimensions,ScrollView, FlatList, SafeAreaView} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Button} from 'react-native-elements';
import { Alert } from 'react-native';
import firebase from './Firebase'
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
import HeaderFile from './HeaderFile'
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';




function Home() {


    const isFocused = useIsFocused()


    const [rems, setRems] = useState([])
    const [loading,setLoading]=useState(false)
    const [count,setCount]=useState(1)

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
  },[isFocused,count]);

  if(loading){
    return <Text style={styles.loading}>...Loading</Text>
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

    const deleteHandler=(item)=>{
      Alert.alert(
        'Are You Sure Want To Delete?',
        item.name,
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: ()=>delItem(item)}
        ],
        {cancelable: false}
        );

      function delItem(item){
        var jobskill_query = ref.where('id','==',item.id);
          jobskill_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
            setCount((prevCount)=>prevCount+1)
          });
          
          setCount((prevCount)=>prevCount-1)
          
          setLoading(true)
          if(loading){
            return <Text style={styles.loading}>....Loading</Text>
          }
          setLoading(false)

          setCount((prevCount)=>prevCount+1)
        
      }
      



    }

    function GetIcon(props){
      if(props.item.sc==1){
        return(
          <FontAwesome5 name="tablets" size={40} color={"black"} style={{paddingTop:20} } />
        )
      }
      else if(props.item.sc==2){
        return(
          <Fontisto name="tablets" size={40} color={"black"} style={{paddingTop:20,paddingLeft:40}}/>
        )
      }
      else if(props.item.sc==3){
        return(
          <Fontisto name="drug-pack" size={40} color={"black"} style={{paddingTop:20,paddingLeft:40}}/>
          )
      }
      else if(props.item.sc==4){
        return(
          <Fontisto name="injection-syringe" size={40} color={"black"} style={{paddingTop:20,paddingLeft:40}}/>
          )
      }
      else if(props.item.sc==5){
        return(
          <FontAwesome5 name="pills" size={40} color={"black"} style={{paddingTop:20}} />
          )
      }
      else if(props.item.sc==6){
        return(
          <Fontisto name="pills" size={40} color={"black"} style={{paddingTop:20,paddingLeft:40}}/>
          )
      }
      else if(props.item.sc==7){
        return(
          <MaterialCommunityIcons name="pill" size={40} color={"black"} style={{paddingTop:20,paddingLeft:40}}/>
          )
      }
      else if(props.item.sc==8){
        return(
          <FontAwesome name="medkit" size={40} color={"black"} style={{paddingTop:20,paddingLeft:40}}/>
          )
      }
      
    }


    
    
    return (
        <View style={{flex:1}}>
          <HeaderFile/>
          <View style={styles.container}>
            <FlatList 
              keyExtractor={(item)=>item.id}
              data={rems}
              horizontal={false}
              renderItem={({item})=>(
                <View>
                <View><GetIcon item={item} sytle={styles.icon}/></View>
                <TouchableOpacity onPress={()=>pressHandler(item)} activeOpacity={0.8} >
                <Text style={styles.item}>{item.name}{item.sc}</Text>
                <AntDesign name="delete" size={30} color="red" style={styles.delete} onPress={()=>deleteHandler(item)}  />
                </TouchableOpacity>
                </View>
                
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
      marginHorizontal:5,
      
      
      
    },
    
    
    item:{
      backgroundColor:"pink",
      paddingLeft:15,
      paddingRight:5,
      paddingTop:15,
      paddingBottom:15,
      fontFamily:"nunito-bold",
      marginTop:20,
      fontSize:20,
      flex:1,
      justifyContent:"center",
      alignItems:"center"    
    },
    icon:{
      marginLeft:150,
      backgroundColor:"red"
    },
    delete:{
      marginLeft:150
    },
    loading:{
      fontFamily:"nunito-bold",
      fontSize:30,


    }
    
    

});

export default Home
