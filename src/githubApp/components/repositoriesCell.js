import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class repositoriesCell extends Component {
  
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.cell}>
          <Text style={styles.fullName}>{this.props.dataItem.full_name}</Text>
          <Text style={styles.desc}>{this.props.dataItem.description}</Text>
          <View style={styles.info}>
            <View>
              <Image
                style={{width: 24, height: 24}}
                source={{uri: this.props.dataItem.owner.avatar_url}}
              />
              
            </View>
            <View style={styles.star}>
              <Ionicons name="md-star" size={24} color="rgb(36, 41, 46)"/>
              <Text style={styles.star_txt}>{this.props.dataItem.stargazers_count}</Text>
            </View>
            
            <Ionicons name="md-heart-outline" size={24} color="rgb(36, 41, 46)"/>


            
          </View>
          
        </View>
      </TouchableOpacity>
      
    );
  }
}



export default repositoriesCell;

const styles = StyleSheet.create({
  cell: {
    padding: 8,
    backgroundColor: "#fff",
    marginLeft: 8,
    marginRight:8,
    marginBottom: 8,
    borderRadius: 4,
    shadowColor: '#f00',
    shadowOffset: {width:0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation:2 //Android 5.0+
  },
  fullName:{
    fontSize:18,
    color:"#212121"
  },
  desc:{
    fontSize:16,
    color:"#333",
    marginTop: 10,
    marginBottom: 10
  },
  info:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  star:{
    width:60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star_txt:{
    marginLeft:5
  }

})
