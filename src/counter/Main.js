import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native'
import { connect } from 'react-redux';
import Counter from './components/Counter'

class Main extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const { value, onIncrement, onDecrement} = this.props
    return (
      <View style={styles.container}>
        <Counter 
          value = {value}
          onIncrement ={onIncrement}
          onDecrement ={onDecrement}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  }
})

function mapStateToProps(state){
  return {
    value: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    onIncrement: () => dispatch({type: 'INCREMENT'}),
    onDecrement: () => dispatch({type: 'DECREMENT'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)