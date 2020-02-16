import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import MyCarousel from './Carousel'
import Geolocation from '@react-native-community/geolocation'
import { View, StyleSheet, Dimensions, Text, Image, Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

const apiKey = 'AIzaSyDVpsVZ9UhQU32yUSGTAeeJzwZSFPAe7ps';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    carousel: {
        position: "absolute",
        bottom: 0,
        marginBottom: 48
    },
    titleStyle: {
        fontSize: 22,
        alignSelf: 'center'
    },
    cardContainer: {
        backgroundColor: "#FFFFFF",
        height: 200,
        width: 300,
        padding: 24,
        borderRadius: 25
    }
})

export default class Map extends Component {

    state = {
        shelters: [
            { name: 'Out of the Cold. Overnight Shelters', address: "All Saints' (Kingsway) Anglican Church, 2850 Bloor St West, Toronto, ON M8X 1B2", lat: 0, lng: 0 },
            { name: 'Canadian Red Cross, Toronto Branch', address: "557 Dixon Rd Unit 122, Toronto, ON M9W 1A8", lat: 0, lng: 0 },
            { name: 'Salvation Army Islington Avenue', address: '2671 Islington Ave 3rd Fl, Toronto, ON M9V 2X6', lat: 0, lng: 0 }
        ]
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {

        } else {
            let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (response === 'granted') {
                this.locateCurrentPosition();
            }
        }
    }

    render() {
        this.state.shelters.forEach(async shelter => {
            let location = await this.convertToLatLong(shelter.address);
            shelter.lat = location.lat;
            shelter.lng = location.lng;
        });
        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    initialRegion={{
                        latitude: this.state.shelters[0].lat, longitude: this.state.shelters[0].lng, latitudeDelta: 0.09,
                        longitudeDelta: 0.035
                    }}
                    style={styles.map}

                >
                    {this.state.shelters.map(shelter => {

                        return (
                            <Marker
                                coordinate={{ latitude: shelter.lat, longitude: shelter.lng }}
                            >

                            </Marker>
                        )

                    })}
                </MapView>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.shelters}
                    containerCustomStyle={styles.carousel}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={300}
                    onSnapToItem={(index) => this.onCarouselItemChange(index)}
                />

            </View >
        );
    }

    locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                let initialPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035
                }

                this.setState({ initialPosition });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        )
    }

    // onMarkerPress = (location, index) => {
    //     this._map.animateToRegion({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: 0.09,
    //         longitudeDelta: 0.035
    //     })
    // }

    onCarouselItemChange = (index) => {
        let location = this.state.shelters[index];

        this._map.animateToRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        })
    }

    renderCarouselItem = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.titleStyle}>{item.name}</Text>
                <Text style={{ marginTop: 50, alignSelf: 'center' }}>{item.address}</Text>
            </View>
        );
    }

    convertToLatLong = async (address) => {
        let result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`, {
            method: 'GET'
        });
        let resultJson = await result.json();

        let lat;
        let lng;
        lat = resultJson.results[0]["geometry"]["location"]["lat"];
        lng = resultJson.results[0]['geometry']['location']['lng'];
        return {
            lat: lat,
            lng: lng
        }
    }

}