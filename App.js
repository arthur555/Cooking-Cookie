import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import {Calendar, CalendarList, Agenda} from "react-native-calendars";
import {RenderView} from "./RenderView";

const rawData = {
            '2019-05-22': [{},{date:'2019-05-22'},{text: 'item ',date:'2019-05-22'},{text: 'item 1 dsa- any js object',date:'2019-05-22'},{text: 'item 1 - anys js object',date:'2019-05-22'}],
            '2019-05-23': [{},{date:'2019-05-23'}],
            '2019-05-24': [],
            '2019-05-25': [{},{date: '2019-05-25'},{text: 'item 3 - any js object',date:'2019-05-25'}]
          };



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.fillDays = this.fillDays.bind(this);
    this.data = rawData;
    this.state={
        toggle: true
    };


      // might need to add a state
  }
  componentDidMount() {
      this.fillDays(new Date());
  }

    fillDays = (date)=>{
      for (let i = 0; i< 7; i++) {
          let today = date;
          let dayStr = today.getFullYear()+'-'+(today.getUTCMonth()<10?'0':'')+(today.getMonth()+1)+'-'+today.getDate();
          // alert(today);
          if (!this.data[dayStr]) {
              this.data[dayStr] = [];
          }
          today.setDate(today.getDate()+1);
      }
      this.setState({toggle: !this.state.toggle});
  };

  renderItemFunc = (item, firstItemInDay) => {
        if(!firstItemInDay)
            return (<RenderView item={item} addItem={this.addItem} removeItem={this.removeItem}/>);
        else if(item.invalid)
            return(<View style={styles.invisible}/>);
        else
            return (<View/>)
    };

  addItem = (text,date)=>{

      if(date&&text){

          if(this.data[date].length ===0){
              this.data[date].push({});
              this.data[date].push({date: date});
              //need to post to server
          }
          else{
              this.data[date].push({text:text, date:date});
          }
      }
      this.setState({toggle:!this.state.toggle})

  };

  removeItem = (item)=>{
      for(let i=0; i<this.data[item.date].length;i++)
          if(this.data[item.date][i].text===item.text)
              this.data[item.date].splice(i,1);
      this.setState({toggle:!this.state.toggle})
  };


  render() {
      let today = new Date();
      today = today.getFullYear()+'-'+(today.getUTCMonth()<10?'0':'')+(today.getMonth()+1)+'-'+today.getDate();
    return (
        <Agenda
          items={this.data}
          renderEmptyDate={(date) => {
              return (
                  <View>
                      <View><Text> {}</Text></View><View><Text> </Text></View><View><Text> </Text></View><View><Text> </Text></View>
                      <RenderView item = {{}} date={date} addItem={this.addItem} />
                  </View>
              );}}
          selected={today}
          onDayPress={(day)=>this.fillDays(new Date(day.year, day.month-1, day.day))}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          // renderDay={(day, item) => {return (<View>{day.getDate()}</View>);}}
          renderItem={this.renderItemFunc}
            theme={{
              selectedDayBackgroundColor:'#b76e79',
              dotColor:'#b76e79',
              todayTextColor:'#b76e79',
              agendaDayTextColor: 'grey',
              agendaDayNumColor: '#f2b8c6',
              agendaTodayColor: 'red',
              agendaKnobColor: 'grey'
            }}
        />
    
          );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box:{
    backgroundColor: 'blue',
    height: 50,
    width: 150
  },
  invisible:{
    height:0
  }

});
