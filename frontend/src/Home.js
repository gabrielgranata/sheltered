import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const background = require('../assets/images/background.jpeg');
const icon = require('../assets/images/image.png');

class Home extends Component {

  constructor() {
    super();
  }

  navigation;

  state = {
    isClient: false,
  };

  render() {
    const { isClient } = this.state;
    const { navigation } = this.props;
    return (
      <ImageBackground
        source={background}
        style={[styles.background, styles.container]}
        resizeMode="cover">
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.buttonWrap}>
            <Button styles={styles.button}
              title="Register a Shelter"
              onPress={() => {
                navigation.navigate('Register');
              }}
            />
          </View>
          <View style={styles.buttonWrap}>
            <Button styles={styles.button}
              title="Register as a User"
              onPress={() => {
                navigation.navigate('RegisterUser');
              }}
            />
          </View>
          <View style={styles.buttonWrap}>
            <Button styles={styles.button}
              title="Already have an Account?"
              onPress={() => {
                navigation.navigate('Login')
              }}
            />
          </View>
        </View>
        <View style={styles.container} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    height: 40,
    backgroundColor: 'transparent',
  },
  logoWrap: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  logo: {
    width: 200,
    height: 200,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  toggleWrap: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
  },
  toggleButton: {
    borderStyle: 'solid',
  },
  button: {
    backgroundColor: '#d73352',
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
});

export default Home;