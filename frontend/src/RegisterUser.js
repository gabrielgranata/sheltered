import React, { Component } from 'react';
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

class RegisterUser extends Component {
  state = {
    isClient: false,
  };
  toggleRegMode() {
    const { isClient } = this.state;
    this.setState({
      username: '',
      password: ''
    });
  }
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
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                this.setState({
                  username: text
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                this.setState({
                  password: text
                })
              }}
            />
          </View>
          <Button
            title="Sign up"
            onPress={async () => {

              let userResult = await fetch(`http://10.0.2.2:3001/addAccount?username=${this.state.username}&password=${this.state.password}`, {
                method: 'POST',
              });
              navigation.navigate('Map');
            }}
          />
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

export default RegisterUser;