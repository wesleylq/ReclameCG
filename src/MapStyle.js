import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bubble: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
    },
    latlng: {
      width: 200,
      alignItems: 'stretch',
    },
    button: {
      width: 80,
      paddingHorizontal: 12,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: 'transparent',
      position: "absolute", bottom: 0, right: 0
    },
    calloutView: {
      flexDirection: "column",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 10,
     
      marginTop: 20,
      marginTop: 20,
      width: 150,
      marginRight: '30%',
      marginLeft: '30%',
    },
    calloutSearch: {
      borderColor: "transparent",
      marginLeft: 10,
      width: "90%",
      marginRight: 10,
      height: 40,
      borderWidth: 0.0  
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center'
  },
  hello: {
      color: 'gray',
      fontSize: 14,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 20
  },
  categoryPanel: {
      backgroundColor: 'white',
      marginHorizontal: 25,
      paddingTop: 50,
      paddingBottom: 30,
      borderRadius: 25,
      width: 330,
      paddingHorizontal: 30,
      position: 'absolute',
      bottom: 0,
      flex: 1
  },
  complaintPanel: {
    backgroundColor: 'white',
    paddingTop: 50,
    paddingBottom: 30,
    borderRadius: 10,
    width: '90%',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 20,
  },
  complaintData: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 5
  },
  complaintDataLabel: {
    color: 'blue',
    fontSize: 18,
    marginBottom: 5,
  },
  ctgButtom: {
      width: 40,
      height: 40,
      borderRadius: 30,
      marginVertical: 20,
      marginHorizontal: 30,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttomTxt: {
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'center',
      letterSpacing: 1
  },
  forgotPsswd: {
      color: 'gray',
      alignSelf: 'center'
  },
  buttomLabel: {
      alignSelf: 'center',
      fontSize: 12
  },
  description: {
    borderWidth: 1,
    borderColor: 'black',
    textAlignVertical: 'top',
    marginTop: 40,
    marginBottom: 40
  },
  selectedCategory: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: "center"
  },
  anoymous: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cancelButtom: {
    backgroundColor: 'red',
    width: 230,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 5
  },
  confirmButtom: {
    backgroundColor: 'green',
    width: 230,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 15
  },
  cancelTxt: {
    textAlign: 'center',
    color: 'white'
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  buttonTouchable: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
  },
  });
