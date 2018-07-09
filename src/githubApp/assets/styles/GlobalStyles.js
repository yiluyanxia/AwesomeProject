import { Dimensions } from 'react-native'
const {height, width} = Dimensions.get('window')
const GlobalStyles = {
  line:{
    borderBottomColor: 'red',
    borderBottomWidth: 1
  },
  itembox:{
    height: 60,
    borderBottomWidth:1,
    borderBottomColor: "#e0e0e0",
    borderRadius: 4,
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
    padding: 10
  },
  itemtxt: {
    fontSize: 18,
  },
  window_height: height,
  window_width: width,
}
export default GlobalStyles;