// Initialize Firebase
var config = {
    apiKey: "AIzaSyDqA4qgb9Jk1hJykQifFE-0Oyl4bZ8qY1Q",
    authDomain: "train-station-85621.firebaseapp.com",
    databaseURL: "https://train-station-85621.firebaseio.com",
    projectId: "train-station-85621",
    storageBucket: "train-station-85621.appspot.com",
    messagingSenderId: "972059753441",
    appId: "1:972059753441:web:59d09acc9314ff3984f0a0"
  };
   
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#submit").on("click", function () {

    // Get inputs
    var name = $("#search-name").val().trim();
    var destination = $("#search-destination").val().trim();
    var firstTrain = moment($("#search-time").val().trim(), "HH:mm").format("X");
    var frequency = $("#search-frequency").val().trim();


    // Test for variables entered
    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);


    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Alert
    alert("New train successfully added");
    console.log(alert);

    $("#search-name").val("");
    $("#search-destination").val("");
    $("#search-time").val("");
    $("#search-frequency").val("");

    return false;

});

database.ref().on("child_added", function (childSnapshot, prevChildkey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var train = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment.unix(firstTrain), "minutes");
    var timeRemainder = diffTime % frequency;
    var minutes = frequency - timeRemainder;
    var nextTrainArrival = moment().add(minutes, "m").format("HH:mm");

    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("HH:mm"));
    console.log(nextTrainArrival);

    // Append train info to table on page
    $("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");


});
