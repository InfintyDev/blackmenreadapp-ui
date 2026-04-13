import {
  StyleSheet,

  useWindowDimensions,

} from 'react-native';


//import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const WindowThings = () => {
  const { width, height } = useWindowDimensions();

  return width, height;
};

const styles = StyleSheet.create({
  empty: {

  },
  paddedCard: {
    margin: 20,
    padding: 10,
  },
  paddedCardHalf: {
    margin: 10,
    padding: 5,
  },
  scaledDown: {

    transform: { scale: 2 },

  },
  sideButtonStyle: {
    //flex: 0,

    //flexDirection:'column',
    alignContent: 'center',

    //flexGrow:1,
    //flexShrink:2,
    //flexWrap:'wrap',
    //minHeight:'100%',
    //minWidth:'100%',
    alignItems: 'stretch',
    //fontSize:2,
    //numberOfLines:1,
    //maxWidth:'20%',
  },
  sideButtonTextStyle: {
    //alignItems:'stretch',
    fontSize: 20,
    padding: 6,
    flexGrow: 1

    //numberOfLines:1,
    //maxWidth:'20%',
  },
  pressableButtonColor: {
    //alignItems:'stretch',
    verticalAlign: 'bottom',
    textAlign: 'center',
    borderRadius: 5,
    alignItems: 'center',

    flex: 1,
    backgroundColor: 'lightblue',

    //numberOfLines:1,
    //maxWidth:'20%',
  },
  pressableButton: {
    //alignItems:'stretch',
    verticalAlign: 'bottom',
    textAlign: 'center',
    borderRadius: 5,
    alignItems: 'center',

    flex: 1,
    backgroundColor: 'lightblue',

    //numberOfLines:1,
    //maxWidth:'20%',
  },
  containerRow: {
    flexDirection: 'row',
    flex: 1,

    //flexGrow:1,
    verticalAlign: 'middle',
    //flexGrow:2,

    //marginLeft:10,
    //marginRight:10,
    //alignSelf:'center',
  },
  containerBelow: {
    flexDirection: 'row',
    flex: 1,

    //flexGrow:1,
    verticalAlign: 'middle',
    //flexGrow:2,
    elevation: -10,

    //marginLeft:10,
    //marginRight:10,
    //alignSelf:'center',
  },
  containerRowAbove: {
    flexDirection: 'row',
    flex: 1,

    //flexGrow:1,
    verticalAlign: 'middle',
    elevation: 4,
    //flexGrow:2,

    //marginLeft:10,
    //marginRight:10,
    //alignSelf:'center',
  },
  fancyBox: {
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  containerColoum: {
    flexDirection: 'column',
    flex: 1,
    verticalAlign: 'middle',
    alignSelf: 'center',
  },
  containerUp: {

    flex: 1,
    verticalAlign: 'middle',
    alignSelf: 'center',
  },
  containerColoumNoFlex: {
    flexDirection: 'row',

    verticalAlign: 'middle',
    alignSelf: 'center',
  },
  containerBoxColoum: {
    flexDirection: 'column',
    flex: 1,

    verticalAlign: 'middle',
    alignSelf: 'center',

    margin: 1,
    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  containerColoumSide: {
    flexDirection: 'column',
    flex: 2,
    //verticalAlign:'',
    alignSelf: 'flex-start',

    maxWidth: '15%',


  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewNoShadows: {

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  dropDownOptions: {
    //margin: 20,
    //flex:1,
    backgroundColor: 'red',
    //borderRadius: 20,
    //padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
    zIndex: 10,
    position: 'absolute',
  },
  flexDefalt: {
    flex: 1,
    width: '100%',
    height: '100%',

    //flexShrink:1,
  },
  flexDefaltBlank: {
    flex: 1,


    //flexShrink:1,
  },
  flexDefaltAbsolute: {
    position: 'absolute',
    flex: 1,
    zIndex: 8,

    top: 30,
    width: '100%',
    height: 20,



    //flexShrink:1,
  },
  flexDefaltMargin: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 5,
    //flexShrink:1,
  },

  timerView: {
    margin: 20,
    flex: 1,
    flexShrink: 1,
    //maxWidth: '40%',
    //minWidth: 160,
    maxHeight: '30%',
    scale: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    aspectRatio: 2,
  },
  logView: {
    //objectFit:'scale-down',

    flex: 1,


    flexDirection: 'column',


    scale: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logNotesAndTimeView: {
    //objectFit:'scale-down',

    flex: 1,



    flexDirection: 'column',


    scale: 1,
    backgroundColor: 'white',

  },
  logPagesFirstLastView: {
    //objectFit:'scale-down',
    verticalAlign: 'bottom',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    flexShrink: 1,
    flexDirection: 'column',


    scale: 1,
    backgroundColor: 'white',


  },
  logBookView: {
    //objectFit:'scale-down',

    flex: 3,
    flexShrink: 1,
    alignItems: 'flex-end',




    scale: 1,
    backgroundColor: 'white',

  },
  centeredText: {


  },


  loginBoxView: {
    //objectFit:'scale-down',
    margin: 20,
    flex: 1,

    maxWidth: '100%',
    minWidth: '55%',
    height: '80',
    scale: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  timeDisplay: {
    fontSize: 30,
    padding: 10,
    flexShrink: 2,
    flex: 1,
  },
  timerButton: {
    margin: 20,

    flex: 1,
    flexShrink: 2,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  timerButtonFixed: {
    margin: 12,

    flex: 1,

    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    alignSelf: "center",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  containerPlain: {
    flex: 5,
    margin: 0,
    flexShrink: 1,
    //borderRadius: 20,

    flexDirection: 'row',
  },
  containerSmallText: {
    flex: 1,
    margin: 1,
    flexShrink: 1,
    //borderRadius: 20,
    flexBasis: 2,
    width: '95%',
    flexDirection: 'row',
    //objectFit:'scale-down',
  },
  containerLogHeader: {
    flex: .2,

    flexShrink: 1,
    //borderRadius: 20,


    flexDirection: 'row',
    //objectFit:'scale-down',
    alignContent: 'flex-end'
  },
  containerOfStuffRidged: {
    //flex:.5,
    margin: 2,
    flexShrink: 2,

    borderRadius: 0,
    padding: 4,
    flexDirection: 'row',
  },
  paragraphFlexable: {
    backgroundColor: 'lightgray',
    flex: 1,
    flexGrow: 2.25,
    margin: 3,
    padding: 5,
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: '#6b6a6f',
    borderWidth: 3,

  },
  paragraphRowFlexable: {
    backgroundColor: '#e3e4fa',
    flex: 1,
    flexShrink: 1,
    flexDirection: 'row',
    margin: 3,
    minHeight: 20,
    borderRadius: 5,
  },

  paragraphBox: {
    backgroundColor: 'lightgray',
    flex: 1,


    //flexDirection: 'row',
    margin: 5,
    padding: 2.5,
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: '#6b6a6f',
    borderWidth: 3,
    //objectFit:'scale-down',
    //textAlign: 'center',
    //flexWrap:'nowrap',
    //textAlignVertical:'auto',
  },


  textStyle: {
    //flex:1,
    //backgroundColor: 'orange',
    //width:'100%',
    flexShrink: 1,
    //flexDirection:'row',
    //margin: 10,
    fontSize: 18,

    fontWeight: 'bold',

    //textAlign: 'center',

    flexWrap: 'nowrap',
    //textAlignVertical:'auto',
    objectFit: 'contain',
  },

  largeText: {
    //flex:1,
    //backgroundColor: 'orange',
    //width:'100%',
    flexShrink: 1,
    //flexDirection:'row',
    margin: 10,
    fontSize: WindowThings[0] > 600 ? 24 : 20,

    fontWeight: 'bold',

    //textAlign: 'center',

    flexWrap: 'nowrap',
    //textAlignVertical:'auto',
    objectFit: 'contain',
  },
  mediumText: {
    //flex:1,
    //backgroundColor: 'orange',
    //width:'100%',
    flexShrink: 1,
    //flexDirection:'row',
    margin: 7,
    fontSize: 20,

    fontWeight: 'bold',

    //textAlign: 'center',

    flexWrap: 'nowrap',
    //textAlignVertical:'auto',
    objectFit: 'contain',
    alignSelf: 'center',
  },
  smallText: {
    flex: 1,
    flexShrink: 1,
    //backgroundColor: 'orange',
    //width:'100%',

    //flexDirection:'row',
    margin: 5,
    fontSize: 15,

    fontWeight: 'bold',
    alignSelf: 'center',
  },
  tinyText: {
    flex: 0.5,
    flexShrink: 4,
    //backgroundColor: 'orange',
    //width:'100%',

    //flexDirection:'row',
    margin: 5,
    fontSize: 12,

    fontWeight: 'bold',
    alignSelf: 'center',
  },
  tinyTextLogReview: {


    //backgroundColor: 'orange',
    //width:'100%',

    //flexDirection:'row',
    margin: 3,
    fontSize: 14,


    alignSelf: 'center',
  },
  minuteText: {
    flex: 0.5,
    flexShrink: 4,
    //backgroundColor: 'orange',
    //width:'100%',

    //flexDirection:'row',
    margin: 5,
    fontSize: 10,

    fontWeight: 'bold',
    alignSelf: 'center',
  },
  bookInputAndPages: {
    backgroundColor: 'red',
    flex: 1,
    flexShrink: 2,
    //flexDirection:'row',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    //flexWrap:'nowrap',
    textAlignVertical: 'auto',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 20,
    elevation: 2,
    //color: '#ffc20f'
  },
  buttonPadding: {
    borderRadius: 20,
    padding: 10,
    margin: 20,

  },
  buttonSide: {
    borderRadius: 10,

    margin: 2,
    backgroundColor: '#ffda6dff'
  },
  buttonSidePressed: {
    borderRadius: 10,

    margin: 2,
    backgroundColor: '#ffc20f'
  },
  logButton: {

    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    //padding: 10,
    //margin: 20,
    //elevation: 2,
    zIndex: 0,



  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  container: {
    //flexWrap:'wrap',
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  containerBackGround: {
    //flexWrap:'wrap',

    backgroundColor: '#ecf0f1',
  },
  containerLimit: {
    //flexWrap:'wrap',
    flex: 1,
    backgroundColor: '#ecf0f1',
    maxHeight: '30%',
    minHeight: 225,
  },
  containerLimitLogin: {
    //flexWrap:'wrap',
    flex: 1,
    backgroundColor: '#ecf0f1',
    maxHeight: '35%',
    minHeight: 225,
  },
  containerRecordPage: {
    flex: 2,
    backgroundColor: '#ecf0f1',
    padding: 5,
    flexShrink: 1,
    //flexBasis:2,

    flexGrow: 2,
    flexDirection: 'column',
  },
  fixedcontainer: {
    backgroundColor: '#ecf0f1',
    padding: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerView: {
    flex: 1,
    alignContent: 'flex-end',
    alignSelf: 'flex-end'




  },
  calanderBlockWithEvents: {
    flex: 1,

    minWidth: '14.2857142857%',
    minHeight: 50,
    height: 50,
    width: 50,
    backgroundColor: 'yellow',
    borderWidth: 0.2,
    borderColor: 'black',
    textAlign: 'center',
    flexDirection: 'row-reverse',
  },
  calanderBlock: {
    flex: 1,
    minWidth: '14.2857142857%',
    minHeight: 50,
    height: 50,
    width: 50,
    backgroundColor: 'lightgray',
    borderWidth: 0.2,
    borderColor: 'black',
    textAlign: 'center',
    flexDirection: 'row-reverse',
  },
  calanderBlockCurrentDay: {
    flex: 1,
    minWidth: '14.2857142857%',
    minHeight: 50,
    height: 50,
    width: 50,
    backgroundColor: 'green',
    //borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'black',
    textAlign: 'center',
    flexDirection: 'row-reverse',
  },
  calanderDayBlock: {

    height: 25,
    width: 50,
    backgroundColor: 'lightgray',
    borderColor: 'black',

    borderWidth: 0.2,
    justifyContent: 'center',
    textAlign: 'center',

  },
  calanderMonth: {
    flex: 1,
    flexDirection: 'row',
    //flexShrink: 1,
    flexWrap: 'wrap',
    //justifyContent: 'space-between',
  },
  calanderText: {
    padding: 5,
    textAlign: 'right',
  },
  dayOfTheWeekText: {
    padding: 5,
    textAlign: 'center',
    flexDirection: 'row',
  },
  calanderContainer: {
    //flex: 1,
    backgroundColor: 'red',
    maxWidth: 350,
    maxHeight: 250,
    //flexWrap: 'wrap',
    flexDirection: 'column',
    width: 700,
    height: 400,
  },
  rightSideContainer: {
    justifyContent: 'right',
    alignItems: 'flex-end',
  },
  calanderInput: {

    backgroundColor: '#e3e4fa',
    justifyContent: 'left',

    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  calanderWrap: {
    flex: 1,

    alignItems: 'center',
    flexDirection: 'column',
  },
  daysOfTheWeekContainer: {
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e3e4fa',
    maxWidth: 350,
    maxHeight: 30,
    flexWrap: 'wrap',

    width: 700,
    height: 400,
  },
  monthInput: {
    margin: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scaledContainer: {
    transform: [{ scale: 1 }],
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  centerer: {
    verticalAlign: 'bottom',
    textAlign: 'center',
    borderRadius: 5,

    alignItems: 'center',

    flex: 1,
  },
  centererNoFlex: {
    verticalAlign: 'bottom',
    textAlign: 'center',
    borderRadius: 5,

    alignItems: 'center',


  },
  titalText: {
    fontSize: 32,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
  },
  centeredContainerBlankBackGround: {
    flex: 1,

    padding: 8,
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookText: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    height: 90,
    width: 90,
    margin: 30,
  },
  scaledImage: {
    flex: 1,

    //flexShrink:,

    height: 90,
    width: 90,
    //aspectRatio:1,
    resizeMode: 'contain',

    margin: 1,
    //flexGrow:1,
    //objectFit: 'scale-down',
  },
  shrinkDown: {
    transform: { scale: 1 },
  },
});
export default styles;