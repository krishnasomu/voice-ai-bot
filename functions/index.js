const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.activitiesURL = functions.https.onRequest((request, response) => {
    const RFC4122 = require('rfc4122');
    response.send(rfc4122.v4());
    //response.json(JSON.parse('{"activities": [{"id": "15b3d407-5161-41e7-8114-a273859c5f6d","timestamp": "2020-01-26T13:03:48.748Z","type": "message","text": "Hi there."}]}'));
});

function uuid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
  
      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += "-";
      }
      uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }
  