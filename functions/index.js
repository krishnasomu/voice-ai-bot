const functions = require('firebase-functions');
const uuid = require('uuid');
let ani = "";
let dnis = "";

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

  exports.createConversation = functions.https.onRequest((request, response) => {
    response.json({
      "activitiesURL": "activitiesURL",
      "refreshURL": "refreshURL",
      "disconnectURL": "disconnectURL",
      "expiresSeconds": 30
      });
  });

  exports.disconnectURL = functions.https.onRequest((request, response) => {
    response.json({});
  });

  exports.activitiesURL = functions.https.onRequest((request, response) => {
 
    try{
      let reqActivitiesObj = request.body;
      let reqActivityType = reqActivitiesObj.activities[0].type;

      if(reqActivityType==="event"){
        if(reqActivitiesObj.activities[0].name==="start"){
          ani = "" + reqActivitiesObj.activities[0].parameters.caller;
          dnis = "" + reqActivitiesObj.activities[0].parameters.callee;
          console.log("ani:" + ani);
          console.log("dnis:" + dnis);
          response.json(JSON.parse(getActivitiesObj([['message','Hello ' + ani + '. Welcome to Kore.AI'],['message','Say something']])));
        }
      }
      if(reqActivityType==="message"){
        let messageText = reqActivitiesObj.activities[0].text.toLowerCase(); 
        if(messageText==="bye"){
          response.json(JSON.parse(getActivitiesObj([['message','Thanks for using Kore.AI bot'],['event','hangup']])));
        }else{
          response.json(JSON.parse(getActivitiesObj([['message','You said ' + messageText]])));
        }
      }
    }catch(err){
      response.send(err);
    }
});

function getActivitiesObj(activities){
  strActivitiesJSON = '{"activities":[';
  activities.forEach(activity => {
    let activityType = activity[0];
    strActivitiesJSON += '{';
    strActivitiesJSON += '"id":"' + uuid.v4() + '",';
    strActivitiesJSON += '"timestamp":"' + new Date().toISOString() + '",';
    strActivitiesJSON += '"type":"' + activityType + '",';
    if(activityType==="message"){
      strActivitiesJSON += '"text":"' + activity[1] + '"';
      console.log("text:", activity[1]);
    }else{
      strActivitiesJSON += '"name":"' + activity[1] + '"';
    }
    strActivitiesJSON += '},';
  });
  strActivitiesJSON = strActivitiesJSON.substring(0, strActivitiesJSON.length - 1);
  strActivitiesJSON += ']}';
  console.log("json:", strActivitiesJSON);
  return strActivitiesJSON;
}