import {StyleSheet, StatusBar, Dimensions, Platform} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const GeneralStyle = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  nbBgGrey: {
    backgroundColor: '#fdba74',
  },
  nbBgDarkGrey: {
    backgroundColor: '#f97316',
  },
  circle: {
    borderRadius: 500,
  },
  authH1Text: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#3f3f46',
    lineHeight: 55,
    marginTop: Platform.OS === 'android' ? 50 : 110,
  },
  authLinkText: {
    color: '#808080',
  },
  authLink: {
    color: '#000000',
  },
});

export default GeneralStyle;
