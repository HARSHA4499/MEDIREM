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
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useRef } from 'react';





Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



function Home() {


    const isFocused = useIsFocused()


    const [rems, setRems] = useState([])
    const [loading,setLoading]=useState(false)
    const [count,setCount]=useState(1)

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }, []);



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

  useEffect(()=>{
    (()=>registerForPushNotificationsAsync())();
  },[]);

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
      else{
        return;
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
                <SafeAreaView>
                <View style={{flexDirection:"row"}}>
                <View style={{marginLeft:-30}}><GetIcon item={item} sytle={styles.icon}/></View>
                <TouchableOpacity onPress={()=>pressHandler(item)} style={{marginHorizontal:10,borderWidth:1.5,margin:10,width:215,height:65,backgroundColor:"pink"}} activeOpacity={0.8} >
                <Text style={styles.item}>{item.name}{item.sc}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:-10,marginTop:30}}>
                <AntDesign name="delete" size={30} color="red" style={styles.delete} onPress={()=>deleteHandler(item)}  />
                </TouchableOpacity>
                </View>
                </SafeAreaView>
                
              )}
              
              />
          </View>
          <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}/>

        </View>

    )
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"white",
      marginHorizontal:5,
      
      
      
      
    },
    
    
    item:{
      padding:5,
      fontFamily:"nunito-bold",
      fontSize:20,
      justifyContent:"center",
      alignItems:"center",
      borderStyle:"solid",
      width:220,
      height:100,

      

      
    },
    icon:{

    },
    delete:{
      marginLeft:5
    },
    loading:{
      fontFamily:"nunito-bold",
      fontSize:30,


    }
    
    

});

export default Home
