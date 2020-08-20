import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import {ListItem, Card, Header, Icon} from 'react-native-elements'

export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state= {
            userId: firebase.auth().currentUser.email,
            reciverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')["request_id"],
            bookName: this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting: this.props.navigation.getParam('details')["reason_to_request"],
            recieverName:'',
            recieverContact:'',
            recieverAddress:'',
            recieverRequestDocId:'',
        }
    }
    getRecieverDetails= ()=>{
        db.collection('users').where('email_id', '==', this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{

             this.setState ({
                recieverName: doc.data().first_name, 
                recieverAddress: doc.data().address,
                recieverContact: doc.data().contact,
           })

            })
        })

        db.collection('requested_books').where('request_id', '==', this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{

             this.setState ({
              recieverRequestDocId: doc.id
           })

            })

            
        })

        
    }


    updateBookStatus= ()=>{
        db.collection('all_donations').add({
        book_name: this.state.bookName,
        request_id: this.state.requestId,
        requested_by: this.state.recieverName,
        donor_id: this.state.userId,
        request_status: "donor Intrested"

        })
    }

    componentDidMount(){
        this.getRecieverDetails()
    }
    
    render(){
        return(
            <View style= {styles.container}>
                <View style= {{flex:0.1}}>
                <Header
                    leftComponent= {<Icon name= 'arrow-left' type= 'font-awesome' color= '#696969' onPress= {()=>this.props.navigation.goBack()}/>} 
                    centerComponent= {{text:"donate books", style: {color: '#90a5a9',fontSize: 20,fontWeight: 'bold'}}}
                    backgoundColor= "#eaf8fe"
                    /> 
                </View>
                <View style= {{flex:0.3}}>
                    <Card 
                    title= {"Book Information"}
                    titleStyle= {{fontSize: 20}}>
                        <Card>
                            <Text style= {{fontWieght: 'bold'}}>Name: {this.state.bookName}</Text>
                        </Card>
                        <Card>
                            <Text style= {{fontWieght: 'bold'}}>Reason: {this.state.reason_for_requesting}</Text>
                        </Card>
                    </Card>
                </View>
                <View style= {{flex:0.3}}>
                    <Card 
                    title= {"Reciever Information"}
                    titleStyle= {{fontSize: 20}}>
                        <Card>
                            <Text style= {{fontWieght: 'bold'}}>Name: {this.state.recieverName}</Text>
                        </Card>
                        <Card>
                            <Text style= {{fontWieght: 'bold'}}>Contact: {this.state.recieverConatct}</Text>
                        </Card>

                        <Card>
                            <Text style= {{fontWieght: 'bold'}}>Address: {this.state.recieverAddress}</Text>
                        </Card>
                    </Card>
                </View>

                <View style= {styles.buttonContainer}>
                    {
                        this.state.recieverId!== this.state.userId
                        ?(
                            <TouchableOpacity style={styles.button}
                            onPress={()=>{
                                this.updateBookStatus()
                                this.props.navigation.navigate('MyDonations')
                            }}>
                                <Text>I want to Donate</Text>
                            </TouchableOpacity>
                        ):null
                    }
                </View>
            
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    buttonContainer:{
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
    },

    button:{
        width:200,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "orange",
        shadowColor: "#000",
        ShadowOffset: {
        width:0,
        height:8
        },
        elevation: 16,
        
    },
})
