import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const background = require('../assets/images/background.jpeg');

class Registration extends Component {
  state = {
    isClient: false,
  };
  toggleRegMode() {
    const {isClient} = this.state;
    this.setState({
      isClient: !isClient,
    });
  }
  render() {
    const {isClient} = this.state;
    return (
      <ImageBackground
        source={background}
        style={[styles.background, styles.container]}
        resizeMode="cover">
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.toggleWrap}>
            <Button
              title={isClient ? 'Switch to User' : 'Switch to Client'}
              style={styles.toggleButton}
              onClick={this.toggleRegMode}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="username"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
            />
            </View>
            <View style={styles.inputWrap}>
            <TextInput
              placeholder="password"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
            />
            </View>
            <View style={styles.inputWrap}>
            <TextInput
              placeholder="firstName"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
            />
            </View>
            <View style={styles.inputWrap}>
            <TextInput
              placeholder="lastName"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
            />
            </View>
            <View style={styles.inputWrap}>
            <TextInput
              placeholder="address"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
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
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    backgroundColor: 'transparent',
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
  },
});

export default Registration;