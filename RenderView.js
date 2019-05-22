import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, TextInput, Button} from 'react-native';
import {graphql, QueryRenderer} from 'react-relay';
import environment from './EnvInit';


class RenderView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text:'',
        }

    }


    render(){
        let date;
        if(this.props.date){
            date = this.props.date;
            date = date.getFullYear()+'-'+(date.getUTCMonth()<10?'0':'')+(date.getMonth()+1)+'-'+date.getDate();
        }

        if(this.props.item.date)
            date = this.props.item.date;
        if (!this.props.item.text)
            return (
                <View style ={styles.box}>
                    <TextInput onChangeText={(text)=>this.setState({text:text})} value={this.state.text} style={styles.text} placeholder={"add a new item..."} />
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.props.addItem(this.state.text,date);
                        this.setState({text:""})
                    }}>
                        <Text style={styles.buttonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        else{
            if(this.props.item.invalid)
                return(null);
            return(
                <View style={styles.box}>
                    <Text style ={styles.text}>{this.props.item.text}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.cancelText} onPress={()=>{
                            this.props.item.invalid = 1;
                            this.props.removeItem(this.props.item);
                        }}>
                            -
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    box:{
       flexDirection: 'row',
        paddingRight: 10
    },
    button:{
        flex: 1,
        backgroundColor: "transparent",
        color: "blue",
        justifyContent: "center",
        alignItems: "center",

    },
    text:{
        flex: 7
    },

    buttonText:{
        color: '#298fca',
        fontSize: 18
    },

    cancelText:{
        color: '#f9a602',
        fontSize: 22
    }
    }
)

export {RenderView}