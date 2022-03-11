function populateMyEventsList() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userID = user.uid;

      let partiesQuery = db.collection("testParties").where("members", "array-contains", userID);

      partiesQuery.get()
        .then(parties => {
          parties.forEach(party => {
            let eventQuery = db.collection("events").doc(party.data().eventId);

            eventQuery.get()
              .then(eventDoc => {
                createEventCards(eventDoc);
              })
          })
        })
    } else {
      // No user is signed in.
      console.log("no user signed in");
    }
  })
}

function createEventCards(eventDoc) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let eventCardTemplate = document.getElementById("eventCardTemplate");
  let eventListGroup = document.getElementById("eventList");

  let modalTemplate = document.getElementById("modalTemplate");
  let modalGroup = document.getElementById("body");

  // used to link card to modal
  const eventID = eventDoc.id;

  // converts firebase timestamp to JS Date object
  const date = eventDoc.data().date.toDate();
  const type = eventDoc.data().type;
  const venue = eventDoc.data().venue;

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

}

// const parties = [{
//   "code": 123456,
//   "host": "KvzpyQhg6CRmOrttgvuDWCzMx8o1",
//   "eventId": "FhkrOgjEQYqYEwhFRLJt",
//   "members": ["KvzpyQhg6CRmOrttgvuDWCzMx8o1"],
// }]

// function createParty() {
//   let eventsRef = db.collection("testParties");
//   parties.forEach(eventEntry => {
//     const code = eventEntry.code;
//     const host = eventEntry.host;
//     const eventId = eventEntry.eventId;
//     const members = eventEntry.members;

//     eventsRef.add({
//       code: code,
//       host: host,
//       eventId: eventId,
//       members: members
//     })
//   })
// }

// load event-list-item.html template 
loadComponentToId("#eventCardTemplate", "./components/event-list-item.html");
populateMyEventsList();