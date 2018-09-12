export default class Utils {
  static uniqueId(){
    let a=Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
  }
}