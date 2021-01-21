import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,useWindowDimensions,FlatList,TouchableOpacity} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import firebase from './Firebase'
import { AntDesign } from '@expo/vector-icons';
import {Header} from 'react-native-elements';
import { Alert } from 'react-native';



function HealthNotes() {
    const isFocused = useIsFocused()
    const [loading,setLoading]=useState(false)
    const [notes, setNotes] = useState("")
    const [val,setVal]=useState(1)

    const ref=firebase.firestore().collection("notes"); 

  
  
  function getNotes(){
    setLoading(true);

   
    ref.get().then((snapshot)=>{
      const items=[];
      snapshot.forEach((doc)=>{
        items.push(doc.data());

      });
      setNotes(items);
      setLoading(false);
    });
  }


  useEffect(()=>{
    getNotes();
  },[isFocused,val]);

  if(loading){
    return <Text style={styles.loading}>...Loading</Text>
  }




  // var db=firebase.firestore();
//       db.collection("remainders").get().then((snapshot)=>{
//           snapshot.docs.forEach(doc=>{
//               remainders.push(doc.data())
//               console.log("harsha")
//               console.log(remainders)
//     })
//   });

  function notesHandler(item){
    Alert.alert(item.Details)
    

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
        setVal((prevVal)=>prevVal+1)
      });
      
      setVal((prevVal)=>prevVal-1)
      
      setLoading(true)
      if(loading){
        return <Text style={styles.loading}>....Loading</Text>
      }
      setLoading(false)

      setVal((prevVal)=>prevVal+1)
    
  }
}

  
    
    return (
        <View style={styles.container}>
        <View style={styles.heading}>
        <Header
                        backgroundColor="coral"
                        statusBarProps={{ barStyle: 'light-content' }}
                        barStyle="light-content" // or directly
                        centerComponent={{ text: 'Health Notes', style: { paddingBottom:10,color: 'black',fontFamily:'nunito-bold',fontSize:25 } }}
                        containerStyle={{
                            borderColor:"blue",
                            marginLeft:-10,
                            marginRight:-10
                            

                        }}
                        
                        
                />
        </View>
        <View style={styles.list}>
        <FlatList 
              keyExtractor={(item)=>item.id}
              data={notes}
              renderItem={({item})=>(
                <TouchableOpacity onPress={()=>notesHandler(item)} activeOpacity={0.8} >
                <Text style={styles.item}>Doc_Name:{item.Doc_Name}{'\n'}
                      Date:{item.Date}</Text>
                <AntDesign name="delete" size={30} color="red" style={styles.delete} onPress={()=>deleteHandler(item)}  />
                </TouchableOpacity>
                
              )}
              />
        </View>
        <AntDesign name="pluscircle" size={35} color="black"  style={styles.plus}/>
        </View>
       
    )
}

const styles=StyleSheet.create({
    plus:{
        alignItems:"center",
        justifyContent:"center",
        marginLeft:125

    },
    container:{
      flex:1,
      backgroundColor:"white",
      marginHorizontal:5,
      padding:20
      
      
    },
    list:{
      flex:1,
      backgroundColor:"white",
      marginHorizontal:-10
    },
    item:{
      backgroundColor:"antiquewhite",
      paddingLeft:15,
      paddingRight:5,
      paddingTop:15,
      paddingBottom:15,
      fontFamily:"nunito-bold",
      marginTop:20,
      fontSize:20
    },
    delete:{
      marginLeft:130,
    },
    loading:{
      fontFamily:"nunito-bold",
      fontSize:30,


    }


})

export default HealthNotes
