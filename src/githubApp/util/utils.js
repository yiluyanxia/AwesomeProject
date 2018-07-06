export default class Utils{
  static checkFavorite(item,items){
    for(var i = 0,len=items.length;i<len;i++){
      let id = item.id?item.id.toString():item.fullName
      if(id === items[i]){
        return true;
      }
    }
    return false;
  }

  /**
   *检查项目更新时间
   *
   * @static
   * @param {*} longTime 项目更新时间
   * @returns {boolean} true 不要更新，false 更新。
   * @memberof Utils
   */
  static checkData(longTime){
    let cDate = new Date()
    let tDate = new Date()
    tDate.setTime(longTime);
    if(cDate.getMonth()!==tDate.getMonth())return false;
    if(cDate.getDay()!==tDate.getDay())return false;
    if(cDate.getHours() - tDate.getHours()>4)return false;
    return true;
  }
}