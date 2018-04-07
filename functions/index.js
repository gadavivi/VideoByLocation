var axios = require('axios');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const GeoFire = require('geofire')

const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

admin.initializeApp(functions.config().firebase);

const geoFire = new GeoFire(admin.database().ref('VideosLocations'));

YTSearch = (options, callback) => {
    if (!options.key) {
      throw new Error('Youtube Search expected key, received undefined');
    }
  
    var params = {
      part: 'snippet',
      key: options.key,
      q: options.term,
      type: 'video'
    };
  
    return axios.get(ROOT_URL, { params: params })
      .then(function(response) {
        if (callback) { callback(response.data.items); }
      })
      .catch(function(error) {
        console.error(error);
      });
  };

exports.countLikeCShange = functions.database.ref("/Videos/{Videoid}/likes/{likeid}").onWrite((event) => {
    var collectionRef = event.data.adminRef.parent;
    var countRef = collectionRef.parent.child('likes_counter');

    console.info("here");
    return countRef.transaction(function (current) {
        console.info("current", current);
        if (event.data.exists() && !event.data.previous.exists()) {
            let res = (current || 0) + 1;
            return res > 0 ? res : null
        }
        else if (!event.data.exists() && event.data.previous.exists()) {
            let res = (current || 0) - 1;
            return res > 0 ? res : null
        }
    });
});

exports.countViewChange = functions.database.ref("/Videos/{Videoid}/views/{viewid}").onWrite((event) => {
    var collectionRef = event.data.adminRef.parent;
    var countRef = collectionRef.parent.child('views_counter');

    return countRef.transaction(function (current) {
        if (event.data.exists() && !event.data.previous.exists()) {
            let res = (current || 0) + 1;
            return res > 0 ? res : null
        }
        else if (!event.data.exists() && event.data.previous.exists()) {
            let res = (current || 0) - 1;
            return res > 0 ? res : null
        }
    });
});

exports.addGeoLocation = functions.database.ref("/Videos/{Videoid}/placeholder").onCreate((event) => {
        var videoRef = event.data.adminRef.parent;
        return videoRef.once('value', snapshot => {
            video = snapshot.val();
            var latitude = video.latitude;
            var longitude = video.longitude;
            return geoFire.set(event.params.Videoid, [parseFloat(latitude), parseFloat(longitude)]);
        });
});

exports.removeGeoLocation = functions.database.ref("/Videos/{Videoid}").onDelete((event) => {
    return geoFire.remove(event.params.Videoid);
});

exports.addThumbnailAndCounters = functions.database.ref("/Videos/{Videoid}").onCreate((event) => {
    const video = event.data.val();
    // for setting youtubeapi.key run firebase functions:config:set youtubeapi.key="YOUTUBE API KEY"
    return YTSearch({ key: functions.config().youtubeapi.key, term: video.uri }, videos => {
        const placeholder = videos[0].snippet.thumbnails.high.url;
        return event.data.adminRef.set(Object.assign(video, {placeholder: placeholder, views_counter: 0, likes_counter: 0 }))
    })
});