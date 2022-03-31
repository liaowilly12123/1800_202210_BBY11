/**
 * Populates the users my events list.
 */
function populateMyEventsList() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userID = user.uid;
      let partiesQuery = db.collection("testParties").where("members", "array-contains", userID);

      partiesQuery.get()
        .then(parties => {
          if (!parties.empty) {
            parties.forEach(party => {
              let eventQuery = db.collection("events").doc(party.data().eventId);
              let isHost = userID === party.data().host;
              eventQuery.get()
                .then(eventDoc => {
                  createEventCards(eventDoc, party.data().members, isHost, party);
                })
            })
          } else {
            displayNoEventsJoined();
          }
        })
    } else {
      // No user is signed in.
      console.log("no user signed in");
    }
  })
}

/**
 * Displays a no events joined card. Called in populateMyEventsList().
 */
function displayNoEventsJoined() {
  const eventListGroup = document.getElementById("eventList");

  const div = document.createElement("div");
  const para = document.createElement("p");
  const textNode = document.createTextNode("You have no events.");

  para.appendChild(textNode);
  div.appendChild(para);

  div.classList.add("ms-3");
  div.classList.add("mt-3");
  div.classList.add("no-event-msg");

  eventListGroup.appendChild(div);
}

/**
 * Creates an event list item for the list group. Called in createEventCards().
 * @param {*} templateClone the template to follow
 * @param {*} eventID the event ID
 * @param {*} type the type of the event
 * @param {*} date the date of the event
 * @param {*} time the time of the event
 * @param {*} venue the location of the event
 * @param {*} party the party document
 * @param {*} members the number of members
 */
function createEventListItem(templateClone, eventID, type, date, time, venue, party, members) {
  templateClone.querySelector("a").setAttribute("data-bs-target", `#${eventID}`);
  templateClone.querySelector("h4").innerHTML = type;
  templateClone.querySelector(".time").innerHTML = time;
  templateClone.querySelector(".venue").innerHTML = venue;
  templateClone.querySelector(".members").innerHTML = members;
  templateClone.querySelector("a").addEventListener("click", () => {
    setConfirmationModal(eventID, party.id);
  })

  return templateClone;
}

/**
 * Creates a delete button to insert into modal. Called in createEventCards().
 * @param {*} modal the modal to insert into
 */
function createDeleteButton(modal) {
  const button = document.createElement("button");
  button.innerHTML = "Delete";
  button.classList = ("btn btn-danger")
  button.setAttribute("data-bs-target", "#confirmation-modal");
  button.setAttribute("data-bs-toggle", "modal");

  const modalFooter = modal.querySelector(".modal-footer");
  modalFooter.appendChild(button);
}

/**
 * Creates a confirmation modal before deletion.
 * @param {*} eventID the event list item ID to remove
 * @param {*} partyID the party ID to delete from database
 */
function setConfirmationModal(eventID, partyID) {
  const modal = document.getElementById("confirmation-modal");
  const message = "Are you sure you want to delete this watch party?";

  modal.querySelector(".modal-body").innerHTML = message;
  modal.querySelector("#cancel-button").setAttribute("data-bs-target", `#${eventID}`);

  modal.querySelector("a").addEventListener("click", () => {
    deleteWatchPartyEvent(partyID);
    removeEventListItem(eventID);
  }, {
    once: true
  });
}

/**
 * Creates event cards and its corresponding modal. Each event card is 
 * put into the list.
 * @param {*} eventDoc the event document
 * @param {*} partyMembers the members in the watch party
 * @param {*} isHost if the current user is the host or not
 * @param {*} party the party document
 */
function createEventCards(eventDoc, partyMembers, isHost, party) {
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
  const code = party.data().code;

  const time = formatTime(date);
  const formattedDate = formatDate(date);

  // Create Event Card List Item
  let eventCardTemplateClone = eventCardTemplate.content.cloneNode(true);
  const eventCard = createEventListItem(eventCardTemplateClone, eventID,
    type, formattedDate, time, venue, party.id, partyMembers.length);

  eventListGroup.appendChild(eventCard);

  // Create corresponding Modal
  let modal = modalTemplate.content.cloneNode(true);
  modal.querySelector(".modal").setAttribute("id", eventID);
  modal.querySelector(".modal-title").innerHTML = type;
  modal.querySelector(".modal-date").innerHTML = formattedDate;
  modal.querySelector(".modal-time").innerHTML = time;
  modal.querySelector(".modal-venue").innerHTML = venue;
  modal.querySelector(".modal-invite-code").innerHTML = code;

  modal.querySelector("#member-count").innerHTML = partyMembers.length;

  // Populates member list
  populateMembers(partyMembers, modal);

  // Add delete button if the user is the host
  if (isHost) {
    createDeleteButton(modal);
  }

  modalGroup.appendChild(modal);
}

/**
 * Called by createEventCards() to populate the members list.
 * @param {*} partyMembers an array of members
 * @param {*} modal the modal to insert into
 */
function populateMembers(partyMembers, modal) {
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
}

/**
 * Delete a watch party event. Called in setConfirmationModal()
 * as an eventListener, click.
 * @param {*} partyID the watch party ID to delete
 */
function deleteWatchPartyEvent(partyID) {
  const docRef = db.collection("testParties").doc(partyID);
  console.log(partyID)
  docRef.delete().then(() => {
    console.log("Document successfully delete!")
  }).catch((error) => {
    console.error("Error removing document: ", error);
  })
}

/**
 * Removes the corresponding watch party event list item.
 * Called in setConfirmationModal() as an eventListener, click.
 * @param {*} eventID the event list item to remove
 */
function removeEventListItem(eventID) {
  const listItem = document.querySelector(`[data-bs-target="#${eventID}"`);
  listItem.remove();
}

// const parties = [{
//   "code": 123456,
//   "host": "QjpOITe07POuShC8nmzHcJaAafk1",
//   "eventId": "cfrqBKRJ8yt5c9touCBM",
//   "members": ["QjpOITe07POuShC8nmzHcJaAafk1"],
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
loadComponentToId("#eventCardTemplate", "./components/joined-event-list-item.html");
loadComponentToId("#confirmationModal", "./components/confirmation-modal.html");
populateMyEventsList();