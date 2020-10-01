import React from 'react'
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Button} from 'react-native-elements';
import AddRemainder from './AddRemainder';
import { Alert } from 'react-native';




const htmlContent=()=>{
    <h1>this is a heading</h1>
}

function Home() {
    return (
        <View style={styles.heading}>

            <Text style={styles.text}>
                MEDIREM
            </Text>
            <View>
                <HTML html={htmlContent}/>
            </View>

            
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
        textAlign:"center",
        fontSize:30,
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
