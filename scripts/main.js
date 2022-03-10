function populateEventList() {
  let eventCardTemplate = document.getElementById("eventCardTemplate");
  let eventListGroup = document.getElementById("eventList");

  let eventCards = [];

  db.collection("events").get()
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
        hour = hour % 12;
        hour = hour ? hour : 12;

        const ampm = hour < 12 ? 'am' : 'pm';

        // format minutes to have 2 digits
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        let eventCard = eventCardTemplate.content.cloneNode(true);
        eventCard.querySelector("a").id = eventID;
        eventCard.querySelector("h4").innerHTML = type;
        eventCard.querySelector(".time").innerHTML = `${hour}:${minutes} ${ampm}`;
        eventCard.querySelector(".venue").innerHTML = venue;
        eventListGroup.appendChild(eventCard);
      })
    })
}

// load event-list-item.html template 
loadComponentToId("#eventCardTemplate", "./components/event-list-item.html");