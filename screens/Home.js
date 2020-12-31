import React from 'react'
import {StyleSheet,Text,View,TouchableOpacity,useWindowDimensions,ScrollView} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Button} from 'react-native-elements';
import AddRemainder from './AddRemainder';
import { Alert } from 'react-native';


function Home({ route, navigation }) {
    
    return (
        <View style={styles.heading}>
            <Text style={{textAlign:'center',fontSize:20,color:'black',paddingTop:30}}>MEDIREM</Text>
            <Text style={styles.text}>
                1){route.params?.med} on {route.params?.date} at {route.params?.time}
            </Text>
            
            <TouchableOpacity style={styles.icon} >
                <AntDesign name="pluscircle" size={40} color="black" />
            </TouchableOpacity>
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
