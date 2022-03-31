function populateEventList() {
  let eventCardTemplate = document.getElementById("eventCardTemplate");
  let eventListGroup = document.getElementById("eventList");

  db.collection("events").orderBy("date").get()
    .then(allEvents => {
      allEvents.forEach(doc => {
        // used to link card to modal
        const eventID = doc.id;

        // converts firebase timestamp to JS Date object
        const date = doc.data().date.toDate();
        const type = doc.data().type;
        const venue = doc.data().venue;

        const time = formatTime(date);
        const formattedDate = formatDate(date);

        // Create Event Card
        let eventCard = eventCardTemplate.content.cloneNode(true);

        eventCard.querySelector("a").setAttribute("data-bs-target", "#event-form-modal");
        eventCard.querySelector("a").addEventListener("click", () => {
          openModal(eventID, type, formattedDate, time, venue);
        })
        eventCard.querySelector("h4").innerHTML = type;
        eventCard.querySelector(".time").innerHTML = time;
        eventCard.querySelector(".venue").innerHTML = venue;

        eventListGroup.appendChild(eventCard);
      })
    })
}

function openModal(eventID, type, date, time, venue) {
  setLocalStorage(eventID, type, date, time, venue);
  setModalDetails();
}

function setLocalStorage(eventID, type, date, time, venue) {
  localStorage.setItem("eventID", eventID);
  localStorage.setItem("type", type);
  localStorage.setItem("date", date);
  localStorage.setItem("time", time);
  localStorage.setItem("venue", venue);
}

function setModalDetails() {
  const type = localStorage.getItem("type");
  const date = localStorage.getItem("date");
  const time = localStorage.getItem("time");
  const venue = localStorage.getItem("venue");

  document.querySelector(".modal-title").innerHTML = type;
  document.querySelector(".modal-date").innerHTML = date;
  document.querySelector(".modal-time").innerHTML = time;
  document.querySelector(".modal-venue").innerHTML = venue;
}

// load event-list-item.html template 
loadComponentToId("#eventCardTemplate", "./components/event-list-item.html");

populateEventList();

function createWatchParty() {
  var eventDate = document.getElementById("watchPartyStartDate").value;
  var eventTime = document.getElementById("watchPartyStartTime").value;
  var link = document.getElementById("watchPartyLink").value;
  var eventID = document.querySelector(".modal").id;

  let date = new Date(`${eventDate} ${eventTime}`);

  console.log(date);
  console.log(typeof eventDate, eventTime, link, eventID);
  // what is this line of code doing here. Questions to ask: after the user creates a watch party the does it tske them to another togal or my events page.
  const code = randomIntFromInterval(100000, 999999);

  localStorage.setItem("code", code);

  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     // var userID = db.collection("users").doc(user.uid)
  //     var userID = user.uid;
  //     //get the document for current user.
  //     db.collection("parties").add({
  //       code: code,
  //       host: userID,
  //       eventdate: eventDate,
  //       eventtime: eventTime,
  //       eventId: eventID,
  //       members: [userID],
  //       link: link,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //     }).then(() => {
  //       // window.location.href = "my-events.html"; //new line added
  //     })

  //   } else {
  //     // No user is signed in.
  //   }
  // });






}