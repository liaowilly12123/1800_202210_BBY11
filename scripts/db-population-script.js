const eventEntries = [{
  "date": "Thu Feb 17 2022 20:00:00 GMT-0800 (Pacific Standard Time)",
  "type": "Opening Ceremonies",
  "venue": "Rogers Arena"
},
{
  "date": "Fri Feb 18 2022 10:00:00 GMT-0800 (Pacific Standard Time)",
  "type": "Biathlon",
  "venue": "Whistler"
},
{
  "date": "Sun Feb 20 2022 12:00:00 GMT-0800 (Pacific Standard Time)",
  "type": "Figure Skating",
  "venue": "Richmond Oval"
},
{
  "date": "Sun Feb 20 2022 15:00:00 GMT-0800 (Pacific Standard Time)",
  "type": "Snowboarding",
  "venue": "Whistler"
}
]

// Create test events
function populateEvents() {
  let eventsRef = db.collection("events");

  eventEntries.forEach(eventEntry => {
    const date = new Date(eventEntry.date);
    const type = eventEntry.type;
    const venue = eventEntry.venue;

    eventsRef.add({
      date: date,
      type: type,
      venue: venue
    })
  })
}

//Data for the watch parties events.
const createParties = [{
  "code": 239245,
  "members": [],
  "online": true,
  "eventId": "FhkrOgjEQYqYEwhFRLJt",
},

{
  "code": 239485,
  "members": [],
  "online": true,
  "eventId": "O0iTdD9vLC0broBFkHKL",
},

{
  "code": 312485,
  "members": [],
  "online": true,
  "eventId": "cfrqBKRJ8yt5c9touCBM",
},

{
  "code": 323134,
  "members": [],
  "online": true,
  "eventId": "meLOm8P12NY3sIyULbGH",
},
]

//Create test watch-praty 
function populateParties() {
  let pratiesRef = db.collection("parties");

  createParties.forEach(eventParty => {
    const code = eventParty.code;
    const members = eventParty.members;
    const online = eventParty.online;
    const eventId = eventParty.eventId;

    pratiesRef.add({
      code: code,
      members: members,
      online: online,
      eventId: eventId
    })
  })

}