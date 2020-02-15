import React from 'react';
import MapView from 'react-native-maps';
import Radar from 'react-native-radar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component {

    componentDidMount() {
        Radar.setUserId("Gabriel's iPhone");
        Radar.requestPermissions(true);

        Radar.trackOnce().then((result) => {
            console.log('success');
            console.log(result);
        }).catch((err) => {
            console.log('error');
            console.log(err);
        })

        Radar.startTracking();
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});