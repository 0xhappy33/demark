var admin = require("firebase-admin");

var serviceAccount = require("Exchange-Demark/back-end/server/test-50a0b-firebase-adminsdk-q4w7l-41ff2ef762.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-50a0b.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("testdemark/");
ref.once("value", function(snapshot){
    console.log(snapshot.val());
});
