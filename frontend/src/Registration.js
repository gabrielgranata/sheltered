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
import MultiSelect from 'react-native-multiple-select';
const background = require('../assets/images/background3.jpg');

const items = [{
  id: "food",
  name: "Food"
}, {
  id: "shelter",
  name: "Shelter"
}, {
  id: "clothing",
  name: "Clothing"
}
];

class Registration extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      isClient: false,
      selectedServices: [],
    };
  }

  onSelectedItemsChange = selectedServices => {
    this.setState({ selectedServices });
  };

  toggleRegMode() {
    const { isClient } = this.state;
    this.setState({
      isClient: !isClient,
    });
  };

  handleReg() {
    // handle reg http request
    const { navigation } = this.props;
    navigation.navigate('Map');
  }

  render() {
    const { navigation } = this.props;
    const { isClient, selectedServices } = this.state;
    return (
      <ImageBackground
        source={background}
        style={[styles.background, styles.container]}
        resizeMode="cover"
      >
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.toggleWrap}>
            <Button
              title={isClient ? 'Switch to User' : 'Switch to Client'}
              style={styles.toggleButton}
              onPress={this.toggleRegMode}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              resizeMode="contain"
              underlineColorAndroid="transparent"
            />
          </View>
          {
            isClient && (
              <>
                <View style={styles.inputWrap}>
                  <TextInput
                    placeholder="Organization Name"
                    style={styles.input}
                    resizeMode="contain"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View>
                  <MultiSelect
                    items={items}
                    uniqueKey="id"
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    ref={(component) => { this.multiSelect = component }}
                    selectedItems={selectedServices}
                    displayKey="name"
                    tagRemoveIconColor="#000000"
                    tagBorderColor="#000000"
                    tagTextColor="#000000"
                    selectedItemTextColor="#000000"
                    selectedItemIconColor="#000000"
                    itemTextColor="#CCC"
                    styleInputGroup={styles.dropdownMenu}
                    styleListContainer={styles.dropdownMenu}
                    styleDropdownMenuSubsection={styles.dropdownMenu}
                    styleSelectorContainer={styles.dropdownMenu}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    placeholder="Address"
                    style={styles.input}
                    resizeMode="contain"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    placeholder="Phone Number"
                    style={styles.input}
                    resizeMode="contain"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </>
            )
          }
        </View>
        <View style={styles.button}>
          <Button
            title="Sign Up"
            onPress={this.handleReg}
          />
        </View>
        <View style={styles.container} />
      </ImageBackground >
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
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1
  },
  dropdownMenu: {
    borderRadius: 10
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
    color: '#d73352',
  },
});

export default Registration;