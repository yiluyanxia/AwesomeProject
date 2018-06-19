import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
class TrendingCell extends Component {
  
  render() {
    const dataItem = this.props.dataItem
    const description = '<p>'+dataItem.description+'</p>'
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}  
      >
        <View style={styles.cell}>
          <Text style={styles.fullName}>{dataItem.fullName}</Text>
          {/* <Text style={styles.desc}>{this.props.dataItem.description}</Text> */}
          <HTMLView 
            value={description}
            stylesheet={{p:styles.gEmoji}}
          />

          {/* <Text style={styles.desc}>{this.props.dataItem.meta}</Text> */}

          <View style={styles.star}>
            <Ionicons name="md-star" size={24} color="rgb(36, 41, 46)"/>
            <Text style={styles.star_txt}>{dataItem.meta}</Text>
          </View>

          <View style={styles.info}>
            <View style={styles.contributors}>
              <Text style={styles.contributors_txt}>Built by</Text>
              {dataItem.contributors.map((result,i,arr)=>{
                  return <Image
                  key={i}
                  style={{width: 24, height: 24}}
                  source={{uri: arr[i]}}
                />
              })}   
            </View>
           
            <Ionicons name="md-heart-outline" size={24} color="rgb(36, 41, 46)"/>
  
          </View>
          
        </View>
      </TouchableOpacity>
      
    );
  }
}



export default TrendingCell;

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
  contributors:{
    flexDirection: 'row',
  },
  contributors_txt:{
    marginRight:5,
  },
  star:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  star_txt:{
    marginLeft:5
  },
  gEmoji:{
    flexDirection: 'row',
  }

})
