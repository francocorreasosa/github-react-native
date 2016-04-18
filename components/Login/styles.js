/**
  Login component styles
 */

 import {
   StyleSheet
 } from 'react-native';

 export default StyleSheet.create({
   container: {
     backgroundColor: '#eee',
     flex: 1,
     paddingTop: 40,
     alignItems: 'center',
     padding: 10
   },
   logo: {
     width: 66,
     height: 55
   },
   heading: {
     fontSize: 30,
     marginTop: 10
   },
   input: {
     height: 50,
     marginTop: 10,
     padding: 7,
     fontSize: 18,
     borderWidth: 2,
     borderColor: "#999",
     borderRadius: 5
   },
   button: {
     height: 50,
     backgroundColor: "#888",
     alignSelf: 'stretch',
     marginTop: 10,
     justifyContent: 'center',
     borderRadius: 5
   },
   buttonText: {
     fontSize: 18,
     color: '#FFF',
     alignSelf: 'center'
   },
   loader: {
     marginTop: 20
   },
   error: {
     backgroundColor: '#9d0300',
     color: 'white',
     borderRadius: 5,
     padding: 7,
     fontWeight: 'bold'
   }
 });
