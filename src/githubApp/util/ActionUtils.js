import { FLAG_STORAGE } from "../network/DataRepository";

export default class ActionUtils {
  static onFavorite(FavoriteUtil,item,isFavorite,flag){
    var key = flag===FLAG_STORAGE.flag_trending?item.fullName:item.id.toString()
    if(isFavorite){
      FavoriteUtil.saveFavoriteItem(key,JSON.stringify(item))
    }else{
      FavoriteUtil.removeFavoriteItem(key);
    }
  }
}