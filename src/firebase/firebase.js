import * as firebase from 'firebase';
import GeoFire from 'geofire';

const prodConfig = {
  apiKey: "AIzaSyDzfvcnZgEZzVXPI5N8sZxoz0IBgjrGSLQ",
  authDomain: "bylocationvideo.firebaseapp.com",
  databaseURL: "https://bylocationvideo.firebaseio.com",
  projectId: "bylocationvideo",
  storageBucket: "",
  messagingSenderId: "452662303962"
};

const devConfig = {
  apiKey: "AIzaSyDzfvcnZgEZzVXPI5N8sZxoz0IBgjrGSLQ",
  authDomain: "bylocationvideo.firebaseapp.com",
  databaseURL: "https://bylocationvideo.firebaseio.com",
  projectId: "bylocationvideo",
  storageBucket: "",
  messagingSenderId: "452662303962"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const geoFire = new GeoFire(db.ref('VideosLocations'));

export {
  db,
  auth,
  geoFire
};
