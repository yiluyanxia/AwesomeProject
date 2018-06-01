import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  WebView,
  NavigatorIOS,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

var Model = [
    {
        id: '1',
        title:'商品1',
        desc:'哎哟～不错哦',
        price: 10000,
        url:'http://ww4.sinaimg.cn/thumb180/4d7f0a6dgw1f18crfemfog20b405mqv7.gif'
    },
    {
        id: '2',
        title:'商品2',
        desc:'哎哟～不错哦2',
        price: 10330,
        url:'http://ww3.sinaimg.cn/thumb180/6aa09e8fgw1f18abnz36mg20b30697wj.gif'
    },
    {
        id: '3',
        title:'商品3',
        desc:'哎哟～不错3',
        price: 100003,
        url:'http://ww4.sinaimg.cn/thumb180/6298156bgw1f18ydrmj4cj20hi0bhq5r.jpg'
    },
    {
        id: '4',
        title:'商品4',
        desc:'哎哟～不错哦4',
        price: 100004,
        url:'http://ww1.sinaimg.cn/thumb180/a5d15efdgw1f18k8pu0cyj20jg0jbdja.jpg'
    },
    {
        id: '5',
        title:'商品5',
        desc:'哎哟～不错哦5',
        price: 100005,
        url:'http://ww2.sinaimg.cn/thumb180/005yYQOngw1f18lqh7hx9j326r1gincv.jpg'
    },
    {
        id: '6',
        title:'商品6',
        desc:'哎哟～不错哦6',
        price: 100006,
        url:'http://ww2.sinaimg.cn/thumb180/5ba8d1cbgw1f18hhiaj3jj21kw1kw10x.jpg'
    }
];



//列表项组件
class Item extends Component{
    render(){
      return(
        <View style = {styles.item}>
            <TouchableOpacity onPress = {this.props.press}>
                <Image
                    resizeMode = 'contain'
                    style = {styles.img}
                    source = {{uri:this.props.url}}>
                    <Text numberLines = {1} style = {styles.item_text}>
                        {this.props.title}
                    </Text>
                </Image>
            </TouchableOpacity>
        </View>
        );
    }
};

//列表组件
class List extends Component{
    getInitialState(){
        return{
            count: 0
            };
    }

    componentDidMount() {
        var _that = this;
        AsyncStorage.getAllKeys(function(err,keys){
            if (err) {
                //TODO:存储取数据出错 ，给用户提示错误信息。
            }
            //将存储的商品条数反应到按钮上
            _that.setState({
                count:keys.length
            });
        });
    }

    render(){
        var list = [];
        for(var i in Model){
            if (i % 2 ===0) {
                var row = (
                    <View style = {styles.row} key = {i}>
                        <Item url={Model[i].url}
                        title = {Model[i].title}
                        press = {this.press.bind(this,Model[i])}></Item>

                        <Item url = {Model[parseInt(i) + 1].url}
                        title = {Model[parseInt(i) + 1].title}
                        press = {this.press.bind(this,Model[parseInt(i) + 1])}></Item>
                    </View>
                );
                list.push(row);
            }
        }

        var counts = this.state.count;
        var str = null;

        if (counts) {
            str = ',共'+counts+'件商品';
        }

        return(
            <ScrollView style = {{marginTop:10}}>
                {list}
                <Text onPress = {this.goGouWu} style = {styles.btn}>
                    去结算{str}
                </Text>
            </ScrollView>
        );
    }
    //前往购物车方法
    goGouWu(){
        this.props.navigator.push({
            component:GouWu,
            title: '购物车'
        });
    }

    //商品被选中方法
    press(data){
        var count = this.state.count;
        count++;
        //改变数字状态
        this.setState({
            count: count
        });
        //AsyncStorage 存储
        AsyncStorage.setItem('SP-'+this.genId() + '-SP',JSON.stringify(data),function(err){
            if (err) {
                //TODO:存储出错
            }
        });
    }
    genId(){
        return 'xxxxxxx-xxxx-2xxxx-bxxxxxxxxx'.replace(/[xy]/g,function(c){
            var r = Math.random() * 16|0,
            v = c == 'x'?r:(r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }
}

class GouWu extends Component{
    getInitialState(){
        return{
            data:[],
            price:0
        };
    }

    render(){
        var data = this.state.data;
        var price = this.state.price;
        var list = [];
        for(var i in data){
            price += parseFloat(data[i].price);
            list.push(
                <View style = {[styles.row,styles.list_item]} key = {i}>
                    <Text style = {styles.list_item_desc} >
                        {data[i].title}
                        {data[i].desc}
                    </Text>
                    <Text style = {styles.list_item_price} >${data[i].price}</Text>
                </View>
            );
        }


        var str = null;
        if (price) {
            str = ',共'+ price.toFixed(1)+'元'
        }

        return(
            <ScrollView style = {{marginTop:10}}>
                {list}
                <Text style = {styles.btn} onPress = {this.paySuccess}>支付{str}</Text>
                <Text style = {styles.clear} onPress = {this.clearStorage}>清空购物车</Text>
            </ScrollView>
        )
    }

    componentDidMount() {
        var _that = this;
        AsyncStorage.getAllKeys(function(err,keys){
            if (err) {
                //TODO:存储取数据出错
                //如果发生错误，这里直接返回（return）防止进入下面的逻辑
            }

            AsyncStorage.multiGet(keys,function(errs,result){
                //TODO:错误处理
                //得到的结果是二维数组
                //result［i］［0］表示我们存储的键，result［i］［1］表示我们存储的值
                var arr = [];
                for(var i in result){
                    arr.push(JSON.parse(result[i][1]));
                }
                _that.setState({
                    data:arr
                });
            });

        })
    }
    clearStorage(){
        var _that = this;
        AsyncStorage.clear(function(err){
            if (!err) {
                _that.setState({
                    data:[],
                    price:0,
                });
                alert('购物车已经清空')
            }
            //TODO:err
        });
    }

    paySuccess(){
        var _that = this;
        AsyncStorage.clear(function(err){
            if (!err) {

                alert("支付成功！")

                _that.props.navigator.pop();


            }
            //TODO:err
        });

        _that.setState({
                    data:[],
                    price:0,
                    count:0,
                    str:'去结算'
                });
    }

};
class wxsPrj extends Component {
  render() {
    return (
      <NavigatorIOS style = {styles.container}
        initialRoute = {
          {
              component:List,
              title:'商品列表',
          }
        }
      />

    );
   }
}

export default wxsPrj;
// AppRegistry.registerComponent('wxsPrj', () => wxsPrj);

const styles = StyleSheet.create({
  container : {
      flex: 1
  },

  row : {
      flexDirection: 'row',
      marginBottom: 10,
  },

  item : {
      flex: 1,
      marginLeft:5,
      borderWidth: 1,
      borderColor: '#ddd',
      marginRight: 5,
      height: 100,
  },

  img: {
      flex: 1,
      backgroundColor: 'transparent',
  },

  item_text: {
      backgroundColor: '#000',
      opacity:0.7,
      color:'#fff',
      height:25,
      lineHeight:18,
      textAlign:'center',
      marginTop:74
  },

  btn: {
      backgroundColor: '#ff7200',
      height: 33,
      textAlign : 'center',
      color: '#fff',
      marginLeft:10,
      marginRight: 10,
      lineHeight: 24,
      marginTop: 40,
      fontSize: 18,
  },

  list_item : {
      marginLeft: 5,
      marginRight: 5,
      padding:5 ,
      borderWidth: 1,
      height: 30,
      borderRadius: 3,
      borderColor: '#ddd',
  },

  list_item_desc : {
      flex: 2,
      fontSize: 15,
  },

  list_item_price: {
      flex: 1,
      textAlign: 'right',
      fontSize: 15,
  },

  clear: {
      marginTop : 10,
      backgroundColor: '#fff',
      color: '#000',
      borderColor: '#ddd',
      borderWidth:1,
      marginLeft: 10,
      marginRight:10,
      lineHeight: 24,
      height:33,
      fontSize: 18,
      textAlign: 'center',

  }

});