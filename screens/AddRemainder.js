import React,{useState} from 'react'
import {Text,View,StyleSheet, TextInput,TouchableOpacity,Alert,Platform} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Icon,Button} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment'

function AddRemainder() {
    const [medname, setMedname] = useState("")
    const [clr,setClr]=useState("black")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [ud, setUd] = useState("")
    const [ut, setUt] = useState("")


    const changeHandler=(val)=>{
        return setMedname(val)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
     
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
     
      const handleConfirmD = (date) => {
        console.warn("A date has been picked:",moment(date).format("MMM Do YYYY"));
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
     
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
     
      const handleConfirmT = (time) => {
        console.warn("A Time has been picked:",moment(time).format("hh:mm"));
        hideTimePicker();
    };


    
    
    

    return (
        <View style={styles.main}>
            <View style={styles.row1}>
                <Text style={{fontSize:17,fontWeight:'500',paddingBottom:5}}>Medicine Name</Text>
                <TextInput
                style={{paddingTop:10,fontSize:17}}
                placeholder="Enter Medicine Name"
                onChangeText={changeHandler}
                />
                </View>
            <View style={styles.row2}>
                <Text style={{fontSize:17,fontWeight:'500'}}>Select Medicine Icon</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity  activeOpacity='0'>
                        <FontAwesome5 name="tablets" size={40} color={clr} style={{paddingTop:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity='0'>
                        <Fontisto name="tablets" size={40} color='black' style={{paddingTop:20,paddingLeft:40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity='0'>
                        <Fontisto name="drug-pack" size={40} color="black" style={{paddingTop:20,paddingLeft:40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity='0'>
                        <Fontisto name="injection-syringe" size={40} color="black" style={{paddingTop:20,paddingLeft:40}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity  activeOpacity='0'>
                        <FontAwesome5 name="pills" size={40} color="black" style={{paddingTop:20}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity='0'>
                        <Fontisto name="pills" size={40} color="black" style={{paddingTop:20,paddingLeft:40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity='0'>
                        <MaterialCommunityIcons name="pill" size={40} color="black" style={{paddingTop:20,paddingLeft:40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity='0'>
                        <FontAwesome name="medkit" size={40} color="black" style={{paddingTop:20,paddingLeft:40}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1,paddingTop:20}}>
                <Text style={{fontSize:17,fontWeight:'500',padding:10,paddingTop:20}}>Select Date and Time</Text>
                <View style={{paddingBottom:20,paddingTop:10}}>
                    <Button title="Show Date Picker" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmD}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View>
                    <Button title="Show Time Picker" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmT}
                        onCancel={hideTimePicker}
                    />
                </View>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({
    main:{
        flex:1,
        paddingTop:50,
        paddingLeft:10
    },
    row1:{
        padding:10,
        borderBottomColor:'black',
    },
    row2:{
        justifyContent:'center',
        paddingTop:20,
        paddingLeft:10
    }


});

export default AddRemainder
