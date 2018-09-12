import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class HomeView extends Component {
  
  constructor(){
    super();
    this.state = {
      items:[
        {
          key: 1,
          title: "GithubApp",
          component: "GithubApp",
          icon: "access-alarms",
          size: 48,
          color: "#FF8A80"
        },
        {
          key: 2,
          title: "To do list",
          component: "Todolist",
          icon: "format-list-bulleted",
          size: 48,
          color: "#FF80AB"
        },
        {
          key: 3,
          title: "Todos & Redux",
          component: "TodosRedux",
          icon: "format-line-spacing",
          size: 48,
          color: "#EA80FC"
        },
        {
          key: 4,
          title: "Counter",
          component: "Counter",
          icon: "cake",
          size: 48,
          color: "#B388FF"
        },
        {
          key: 5,
          title: "Counter",
          component: "Counter",
          icon: "exposure",
          size: 48,
          color: "#8C9EFF"
        },
        {
          key: 6,
          title: "Bike",
          component: "Counter",
          icon: "directions-bike",
          size: 48,
          color: "#82B1FF"
        },
        
      ],

    }
  }

  render() {
    return (
     <View style={styles.container}>
      <FlatList
        data={this.state.items}
        keyExtractor = {(item, index) => item.key.toString()}
        renderItem={({item}) =>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate(item.component,{title: item.title})}} >
          <View style={styles.itembox}>
            <View style={styles.infobox}>
              <Icon name={item.icon} size={item.size} style={[styles.iconbox,{color: item.color}]} />
              <Text style={styles.itemtxt}>{item.title}</Text>
            </View>
            <Icon name="chevron-right" size={38} style={[styles.iconbox,{color: "#2196F3"}]} />
          </View>
        </TouchableOpacity>
      
        }
      />

     </View>
    );
  }
}



export default HomeView;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  },
  itembox:{
    height: 150,
    borderWidth:2,
    borderColor: "#ddd",
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  infobox:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconbox:{
    padding: 20
  },
  itemtxt: {
    fontSize: 33,
  },

  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
