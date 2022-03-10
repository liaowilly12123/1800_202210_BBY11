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
        console.log(eventCard.querySelector("a")["id"]);

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