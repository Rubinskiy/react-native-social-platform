import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  header: {
    paddingLeft: 7,
    paddingRight: 7,
    marginTop: 4,
  },
  link: {
    color: colors.white_sec_dark,
  },
  introFont: {
    fontSize: 84, 
    color: colors.white_prim_dark,
    margin: 4,
    alignSelf: 'stretch',
    textAlign: 'center',
    /*https://www.fontspace.com/commercial-fonts?p=13*/
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  bottomTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  checkContainer: {
    flexDirection: "row",
    color: colors.white_prim_dark,
  },
  checkLabel: {
    margin: 8,
    color: colors.white_prim_dark
  },
  input: {
    paddingLeft: 20,
    borderRadius: 15,
    height: 50,
    fontSize: 16,
    backgroundColor: '#242424',
    borderColor: '#212121', /*39304d*/
    borderWidth: 1,
    marginBottom: 10,
    color: '#fff', /*34495e*/
  },
  multiline: {
    padding: 16,
    paddingLeft: 20,
    borderRadius: 15,
    height: 120,
    fontSize: 16,
    backgroundColor: '#242424',
    borderColor: '#212121',
    borderWidth: 1,
    marginBottom: 10,
    color: '#fff',
    textAlignVertical: 'top'
  },
  lightBtnText: {
    textAlign: 'center',
    color: '#2f93f5',
    fontSize: 20,
  },
  lightBtn: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#2f93f5',
    backgroundColor: '#fff',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  darkBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  darkBtn: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#2f93f5',
    paddingVertical: 10,
    justifyContent: 'center',
  },
});

export default styles;