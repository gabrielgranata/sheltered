# Sheltered

## Inspiration
Our inspiration was that homelessness is a large social issue in Toronto with us all seeing and finding people without homes staying outside in the cold Toronto winter without a roof over their head or any warm food. 

Yet, 95% of homeless people have phones, and 80% of those have smart phones. We want to help those in need have better access and information about the services they need. This included creating an easy to access app (not much wifi required, would definitely work on restaurant free wifi) to better connect those in need to their needs.

## What it does

The app directs people in need to local shelters and also lets people register the location of nearby shelters or their own location. Users can specify what services they're interested in receiving and the map will display accordingly.

## How it works
The mobile app runs on React Native and lets clients and users register themselves on the application and stores the data in a MongoDB server. The shelter's register location is also stored in MongoDB and when the app is loaded up we use the Google Maps API to then query through all shelter addresses. The queries are also filtered based upon services the user is looking for i.e food, shelter, and clothing. The locations are displayed as markers on a Google or Apple Maps styled page. Users can then scroll through the shelters to access more information.

## Social Purpose
On product-launch, Sheltered can impact and aid the homeless population greatly. Homeless people will be able to easily find the nearest shelter to them with the use of the phone without having to look too hard and lets shelters register their location and what they offer in an easy to locate platform

### Tech
Sheltered uses a number of open source projects and tools to work properly:

* [ReactNative](https://facebook.github.io/react-native/) - The entire android app is written using React Native and Javascript! 
* [node.js](https://nodejs.org/en/docs/) - The backend for the application is build with NodeJS 
* [npm](https://www.npmjs.com/) -Essential to JavaScript development as it provided us many tools and libraries that we used to implement within the application.
* [Yarn](https://yarnpkg.com/en/) - Used to install the tools needed for mobile web development
* [MongoDB](https://www.mongodb.com/) - A noSQL database that is easy to use and quick to setup. It hosts all our backend data from user aute
* [GCP](https://cloud.google.com/) - Tools such as the Geocoding and Google Maps SDK used during development to provide the Maps interface.

### Installation

Sheltered requires [Node.js](https://nodejs.org/) v4+ to run.
You also need a mobile device

Install the dependencies using yarn and start the server.

```sh
$ cd backend
$ node server.js
$ yarn install
$ cd ../
$ cd frontend
$ yarn install
$ react-native run-android
$ react-native start
```

## Challenges we ran into
 - Initial challenges we ran into was the inexperience of our development team with react-native as only 2 team members had experience with the framework
 -  We all have troubles with troubleshooting setting up Android Studio and React-Native
 - Originally used Expo for the application, had to be changed when some SDKs did not work with Expo.
 - The Radar.io SDK for React Native had poor installation instructions, ran into many problems trying to install the SDK.
 
## Accomplishments that we're proud of
 - Obvious societal benefits from adopting the application
 - Members in the team gained first hand experience in mobile development by architecture design
 - Lots of React Native development experience
 
 ## What's next for Sheltered
- UI/UX Upgrade
- Deployment to a Production Environment
- Add in locations for more shelters 
- More services
- Geofencing support (Radar.IO Places)
