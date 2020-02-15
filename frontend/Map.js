import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import MyCarousel from './Carousel'
import Geolocation from '@react-native-community/geolocation'
import { View, StyleSheet, Dimensions, Text, Image, Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
})

export default class Map extends Component {

    state = {
        coordinates: [
            {name: 'Burger', latitude: 37.8025259, longitude: -122.4351431 },
            {name: 'Sushi', latitude: 40.8025259, longitude: -121.4351431 }
        ],
        ENTRIES1: [
            {
                title: 'Beautiful and dramatic Antelope Canyon',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                illustration: 'https://i.imgur.com/UYiroysl.jpg'
            },
            {
                title: 'Earlier this morning, NYC',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
            },
            {
                title: 'White Pocket Sunset',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                illustration: 'https://i.imgur.com/MABUbpDl.jpg'
            },
            {
                title: 'Acrocorinth, Greece',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
            },
            {
                title: 'The lone tree, majestic landscape of New Zealand',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
            },
            {
                title: 'Middle Earth, Germany',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://i.imgur.com/lceHsT6l.jpg'
            }
        ]
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {

        } else {
            let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            console.log('Android: ' + response);
            if (response === 'granted') {
                this.locateCurrentPosition();
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    initialRegion={this.state.initialPosition}
                    style={styles.map}

                >
                </MapView>
                <MyCarousel></MyCarousel>
                
            </View>
        );
    }

    locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(JSON.stringify(position));
                let initialPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035
                }

                this.setState({ initialPosition });
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        )
    }

    renderCarouselItem = ({ item }) => {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        );
    }

}