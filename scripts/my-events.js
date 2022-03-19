function populateMyEventsList() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userID = user.uid;

      let partiesQuery = db.collection("testParties").where("members", "array-contains", userID);

      partiesQuery.get()
        .then(parties => {
          parties.forEach(party => {
            let eventQuery = db.collection("events").doc(party.data().eventId);
            let isHost = userID === party.data().host;
            eventQuery.get()
              .then(eventDoc => {
                createEventCards(eventDoc, party.data().members, isHost);
              })
          })
        })
        .then(() => {

        })
    } else {
      // No user is signed in.
      console.log("no user signed in");
    }
  })
  // loadConfirmationModal();

}

// Formats Date Object into `month day`
function formatDate(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // date formatted
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const formattedDate = `${month} ${day}`;

  return formattedDate;
}

// Formats Date Object into `hour:minute am/pm`
function formatTime(date) {
  // convert hour from 24h to 12h format
  let hour = date.getHours();

  const ampm = hour < 12 ? 'am' : 'pm';

  hour = hour % 12;
  hour = hour ? hour : 12;

  // format minutes to have 2 digits
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hour}:${minutes} ${ampm}`;

  return time;
}

// Creates an event list item for the list group
function createEventListItem(templateClone, eventID, type, date, time, venue) {
  templateClone.querySelector("a").setAttribute("data-bs-target", `#${eventID}`);
  templateClone.querySelector("h4").innerHTML = type;
  templateClone.querySelector(".time").innerHTML = time;
  templateClone.querySelector(".venue").innerHTML = venue;
  templateClone.querySelector("a").addEventListener("click", () => {
    saveEventInfoToLocalStorage(eventID, type, date, time, venue)
  })

  return templateClone;
}

// Creates a delete button to insert into modal
function createDeleteButton(modal) {
  const button = document.createElement("button");
  button.innerHTML = "Delete";
  button.classList = ("btn btn-danger")
  button.setAttribute("data-bs-target", "#confirmation-modal");

  const modalFooter = modal.querySelector(".modal-footer");
  modalFooter.appendChild(button);
}

// Saves event info to local storage to be displayed for modals
function saveEventInfoToLocalStorage(eventID, type, date, time, venue) {
  console.table({eventID, type, date, time, venue});
}

function createEventCards(eventDoc, partyMembers, isHost) {
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

  const time = formatTime(date);
  const formattedDate = formatDate(date);

  // Create Event Card List Item
  let eventCardTemplateClone = eventCardTemplate.content.cloneNode(true);
  const eventCard = createEventListItem(eventCardTemplateClone, eventID, type, formattedDate, time, venue);
  eventListGroup.appendChild(eventCard);

  // Create corresponding Modal
  let modal = modalTemplate.content.cloneNode(true);
  modal.querySelector(".modal").setAttribute("id", eventID);
  modal.querySelector(".modal-title").innerHTML = type;
  modal.querySelector(".modal-date").innerHTML = formattedDate;
  modal.querySelector(".modal-time").innerHTML = time;
  modal.querySelector(".modal-venue").innerHTML = venue;

  let modalMember = modal.querySelector(".modal-members");

  partyMembers.forEach(member => {
    let memberQuery = db.collection("users").doc(member);
    memberQuery.get()
      .then(member => {
        let memberName = member.data().name;
        const para = document.createElement("p");
        const node = document.createTextNode(memberName);
        para.appendChild(node);
        modalMember.appendChild(para)
      })
  })

  // Add delete button if the user is the host
  if (isHost) {
    createDeleteButton(modal);
  }

  modalGroup.appendChild(modal);
}


function loadConfirmationModal(id) {
  document.getElementById("body")
}



// load event-list-item.html template 
loadComponentToId("#eventCardTemplate", "./components/event-list-item.html");
// appendComponentToId("#confirmationModal", "./components/confirmation-modal.html");
populateMyEventsList();