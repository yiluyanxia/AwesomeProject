import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class repositoriesCell extends Component {
  constructor(props){
    super(props);
    this.state={
      isFavorite:this.props.dataItem.isFavorite,
      favoriteIconName:this.props.dataItem.isFavorite?'md-heart':'md-heart-outline'
    }
  }
  componentWillReceiveProps(nextProps){
    this.setFavoriteState(nextProps.dataItem.isFavorite)
  }
  setFavoriteState(isFavorite){
    this.props.dataItem.isFavorite =isFavorite
    this.setState({
      isFavorite:isFavorite,
      favoriteIconName:isFavorite?'md-heart':'md-heart-outline'
    })
  }

  toggleFavorite(isFavorite){
    // this.setState({
    //   isFavorite: isFavorite,
    //   favoriteIconName: isFavorite?'md-heart':'md-heart-outline'
    // })

    this.setFavoriteState(!this.state.isFavorite)
    //不明白
    this.props.onFavorite(this.props.dataItem.item,!this.state.isFavorite)
  }

  render() {
    let popularItem = this.props.dataItem.item?this.props.dataItem.item:this.props.dataItem
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}  
      >
        <View style={styles.cell}>
          {/* <Text>{JSON.stringify(popularItem)}</Text> */}
          <Text style={styles.fullName}>{popularItem.full_name}</Text>
          <Text style={styles.desc}>{popularItem.description}</Text>
          <View style={styles.info}>
            <View>
              <Image
                style={{width: 24, height: 24}}
                source={{uri: popularItem.owner.avatar_url}}
              />
              
            </View>
            <View style={styles.star}>
              <Ionicons name="md-star" size={24} color="rgb(36, 41, 46)"/>
              <Text style={styles.star_txt}>{popularItem.stargazers_count}</Text>
            </View>
            
            <TouchableOpacity onPress={()=>this.toggleFavorite()}>
              <Ionicons name={this.state.favoriteIconName} size={24} color="#6570e2"/>
            </TouchableOpacity>

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
