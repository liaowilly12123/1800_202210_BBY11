function populateEventList() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let eventCardTemplate = document.getElementById("eventCardTemplate");
  let eventListGroup = document.getElementById("eventList");

  let modalTemplate = document.getElementById("modalTemplate");
  let modalGroup = document.getElementById("body");

  db.collection("events").orderBy("date").get()
    .then(allEvents => {
      allEvents.forEach(doc => {
        // used to link card to modal
        const eventID = doc.id;

        // converts firebase timestamp to JS Date object
        const date = doc.data().date.toDate();
        const type = doc.data().type;
        const venue = doc.data().venue;

        // convert hour from 24h to 12h format
        let hour = date.getHours();

        const ampm = hour < 12 ? 'am' : 'pm';

        hour = hour % 12;
        hour = hour ? hour : 12;

        // format minutes to have 2 digits
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        const time = `${hour}:${minutes} ${ampm}`;

        // date formatted
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const formattedDate = `${month} ${day}`;

        // Create Event Card
        let eventCard = eventCardTemplate.content.cloneNode(true);

        // eventCard.querySelector("a").id = eventID;
        eventCard.querySelector("a").setAttribute("data-bs-target", `#${eventID}`);
        eventCard.querySelector("h4").innerHTML = type;
        eventCard.querySelector(".time").innerHTML = time;
        eventCard.querySelector(".venue").innerHTML = venue;

        eventListGroup.appendChild(eventCard);

        // Create corresponding Modal
        let modal = modalTemplate.content.cloneNode(true);
        modal.querySelector(".modal").setAttribute("id", eventID);
        modal.querySelector(".modal-title").innerHTML = type;
        modal.querySelector(".modal-date").innerHTML = formattedDate;
        modal.querySelector(".modal-time").innerHTML = time;
        modal.querySelector(".modal-venue").innerHTML = venue;

        modalGroup.appendChild(modal);
      })
    })
}

// load event-list-item.html template 
loadComponentToId("#eventCardTemplate", "./components/event-list-item.html");

populateEventList();

function createWatchParty() {
  console.log("in")
  var eventDate = document.getElementById("watchPartyStartDate").value;
  var eventTime = document.getElementById("watchPartyStartTime").value;
  var link = document.getElementById("watchPartyLink").value;
  var eventID = document.querySelector(".modal").id;

  console.log(eventDate, eventTime, link, eventID);
  // what is this line of code doing here. Questions to ask: after the user creates a watch party the does it tske them to another togal or my events page.
  const code = randomIntFromInterval(100000, 999999);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // var userID = db.collection("users").doc(user.uid)
      var userID = user.uid;
      //get the document for current user.
      db.collection("parties").add({
        code: code,
        host: userID,
        eventdate: eventDate,
        eventtime: eventTime,
        eventId: eventID,
        members: [userID],
        link: link,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        // window.location.href = "my-events.html"; //new line added
      })

    } else {
      // No user is signed in.
    }
  });






}