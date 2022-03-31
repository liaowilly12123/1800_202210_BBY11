// Start date for demo purpose
let currentDate = new Date("2022-02-17 00:00");
let startDateBound = new Date("2022-02-17 00:00");

function populateEventList() {
  let eventCardTemplate = document.getElementById("eventCardTemplate");
  let eventListGroup = document.getElementById("eventList");

  resetList();

  db.collection("events").where("date", ">=", currentDate).orderBy("date").get()
    .then(allEvents => {
      if (!allEvents.empty) {

        allEvents.forEach(doc => {
          // used to link card to modal
          const eventID = doc.id;
  
          // converts firebase timestamp to JS Date object
          const date = doc.data().date.toDate();
          const type = doc.data().type;
          const venue = doc.data().venue;
  
          const time = formatTime(date);
          const formattedDate = formatDate(date);
  
          const eventDate = new Date(date);
          const nextDay = new Date(currentDate.getTime());
  
          nextDay.setDate(nextDay.getDate() + 1)
  
          if (eventDate < nextDay) {
  
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
          }
        })
      }
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

function nextDay() {
  currentDate.setDate(currentDate.getDate()+1);
  setDate();
  populateEventList();
}

function previousDay() {
  currentDate.setDate(currentDate.getDate()-1);

  if (currentDate < startDateBound) {
    currentDate.setDate(currentDate.getDate()+1);
  }
  setDate();
  populateEventList();
}

function setDate() {
  const dateElement = document.querySelector("#todays-date");
  dateElement.innerHTML = formatDate(currentDate);
}

function resetList() {
  const listElement = document.querySelector("#eventList");
  listElement.innerHTML = "";
}

// load event-list-item.html template 
loadComponentToId("#eventCardTemplate", "./components/event-list-item.html");
setDate();
populateEventList();

function createWatchParty() {
  var eventDate = document.getElementById("watchPartyStartDate").value;
  var eventTime = document.getElementById("watchPartyStartTime").value;
  var link = document.getElementById("watchPartyLink").value;
  var eventID = localStorage.getItem("eventID");

  let date = new Date(`${eventDate} ${eventTime}`);

  console.log(date);
  console.log(typeof eventDate, eventTime, link, eventID);
  // what is this line of code doing here. Questions to ask: after the user creates a watch party the does it tske them to another togal or my events page.
  const code = randomIntFromInterval(100000, 999999);

  localStorage.setItem("code", code);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // var userID = db.collection("users").doc(user.uid)
      var userID = user.uid;
      //get the document for current user.
      db.collection("parties").add({
        code: code,
        host: userID,
        date: date,
        eventId: eventID,
        members: [userID],
        link: link,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        window.location.href = "/display-code.html"; //new line added
      })
    } else {
      // No user is signed in.
    }
  });
}