function createWatchParty() {
    console.log("in")
    var eventDate = document.getElementById("eventDate").value;
    var eventTime = document.getElementById("eventTime").value;
    var Link = document.getElementById("link").value;
    console.log(eventDate, eventTime, link);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = db.collection("users").doc(users.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("parties").add({
                        code: eventID,
                        user: userID,
                        eventdate: eventDate,
                        eventtime: eventTime,
                        link: Link,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "my-events.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
        }
    });

}