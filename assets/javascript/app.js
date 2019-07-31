var firebaseConfig = {
  apiKey: "AIzaSyCwl4l7nuWFA_2TDvhC3XwUu_3-trKtlno",
  authDomain: "click-button-e3448.firebaseapp.com",
  databaseURL: "https://click-button-e3448.firebaseio.com",
  projectId: "click-button-e3448",
  storageBucket: "",
  messagingSenderId: "629666718335",
  appId: "1:629666718335:web:4f255b59807bb3cd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// variable to reference the database.
var database = firebase.database();

//variables
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var submit = $("#submitBtn");

submit.on("click", function(event) {
  //   console.log("hello");
  event.preventDefault();

  trainName = $("#train-name")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  firstTrain = $("#first-time")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#train-form")[0].reset();
});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrain = snapshot.val().firstTrain;
  frequency = snapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment()
    .add(tMinutesTillTrain, "minutes")
    .format("hh:mm a");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

  var addRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );
  $("#add-row").append(addRow);
});
