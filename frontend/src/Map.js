import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Geolocation from '@react-native-community/geolocation';
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
        ],
        loading: true
    }

    async componentDidMount() {
        this.requestLocationPermission();
        let servicesA = await this.getServices();
        for(let i = 0; i < servicesA.length; i++) {
            servicesA[i] = servicesA[i].toLowerCase();
        }
        let shelters = await fetch(`http://10.0.2.2:3001/getPlacesByServices?services=["shelter", "medical"]`, {
            method: 'POST'
        });
        let sheltersArray = (await shelters.json())["data"];
        if (sheltersArray.length > 0) {
            await this.convertAllToLatLong(sheltersArray);
        } else {
            this.setState({
                loading: false, shelters: []
            });
        }
        
        
    }

    getServices = () => {
        const services = this.props.route.params.services;
        let servicesArray = [];
        for(let i = 0; i < services.length; i++) {
            servicesArray.push(services[i]["value"]);
        }
        return servicesArray;
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

    convertAllToLatLong = async (shelters) => {

        let t = this;
        const requests = shelters.map(async shelter => {
            let location = await this.convertToLatLong(shelter.address);
            shelter.lat = location.lat;
            shelter.lng = location.lng;
        })
        Promise.all(requests).then(function() {
            t.setState({
                shelters: shelters, loading: false
            })    
        })
        
    }

    render() {
        const {shelters, loading} = this.state;

        if (loading) return <Text>Loading...</Text>
        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    initialRegion={{
                        latitude: shelters.length ? shelters[0].lat : 0, longitude: shelters.length ? shelters[0].lng : 0, latitudeDelta: 0.09,
                        longitudeDelta: 0.035
                    }}
                    style={styles.map}

                >
                    {shelters.map((shelter, index) => {

                        return (
                            <Marker
                                coordinate={{ latitude: shelter.lat, longitude: shelter.lng }}
                                onPress={() => {this.onMarkerPressed(index)}}
                            >

                            </Marker>
                        )

                    })}
                </MapView>
                <Carousel
                    removeClippedSubviews={false}
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

    onMarkerPressed = (index) => {
        this._map.animateToRegion({
            latitude: this.state.shelters[index].lat,
            longitude: this.state.shelters[index].lng,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        })

        this._carousel.snapToItem(index)
    }

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