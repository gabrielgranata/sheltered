import React, { Component } from 'react';
import { 
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View 
} from 'react-native';
import background from '../assets/images/background.jpeg';

class Login extends Component {
  render() {
    return (
      <Image 
        style={[styles.background, styles.container]} 
        source={background}
        resizeMode="cover"
      >
        <View style={[styles.container]} />
        <View style={[styles.wrapper]}>
          <View style={style.inputWrap}>
            
          </View>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: null,
    width: null,
  }
});

AppRegistry.registerComponent('screens', () => screens);