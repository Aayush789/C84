import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';
import {Header,Icon, Badge} from 'react-native-elements'
import db from '../config'

export default class MyHeader extends Component{
    constructor(props){
        super(props)
        this.state= {
            value:""
        }
    }
    getNumberOfUnreadNotifications(){
        db.collection('all_notifications').where('notification_status', '==', "unread")
        .onSnapshot((snapshot)=>{
            var unreadNotifications= snapshot.docs.map((doc)=>docs.data())
            this.setState({
                value: unreadNotifications.length
            })
        }) 
    }
    componentDidMount(){
        this.getNumberOfUnreadNotifications()
    }
    BellIconWithBadge=()=>{
        return(
            <View>
                <Icon name= 'bell' type= 'font-awesome' color= '#696969' size= {25}
                onPress= {()=>this.props.navigation.navigate('Notification')}/>
                <Badge 
                value= {this.state.value} 
                containerStyle= {{position: 'absolute', top: -4, right: -4}}/> 
            </View>
        )
    }
    render(){
    return(
        <Header
        leftComponent= {<Icon name= 'bars' type= 'font-awesome' color= '#696969' onPress= {()=>this.props.navigation.toggleDrawer()}/>} 
        centerComponent= {{text: this.props.title, style: {color: '#90a5a9',fontSize: 20,fontWeight: 'bold'}}}
        rightComponent= {<this.BellIconWithBadge{...this.props}/>}
        backgoundColor= "#eaf8fe"
        /> 
    
    )
    }
}