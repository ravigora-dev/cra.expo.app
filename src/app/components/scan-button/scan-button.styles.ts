import { StyleSheet, Dimensions } from "react-native";

const buttonSize = 70;
const borderRadius = buttonSize/2;
const buttonLeftPosition = (Dimensions.get('window').width/2)-borderRadius;

export default StyleSheet.create({
    text: {
        fontSize: 14, 
        color: "white"
    },
    button: {
      borderRadius,
      width: buttonSize,
      height: buttonSize,
      backgroundColor: '#000000',
      position: 'absolute',
      bottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
      left: buttonLeftPosition
    }
  });