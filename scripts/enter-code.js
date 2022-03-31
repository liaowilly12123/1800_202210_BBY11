function addWatchPartyMember() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userID = user.uid;

      let code = document.getElementById("partyInviteCode").value;

      let partiesQuery = db.collection("testParties").where("code", "==", parseInt(code));

      partiesQuery.get()
        .then(querySnapshot => {

          // If a watch party with the code exists
          if (!querySnapshot.empty) {
            querySnapshot.forEach(party => {
              // Add the current user as a member of the watch party
              party.ref.update({
                members: firebase.firestore.FieldValue.arrayUnion(userID)
              })
              .then(() =>{window.location.href = "my-events.html"})
            })
          } else {
            // If watch party with the code does not exist
            displayCodeInvalidMessage();
          }
        })
    } else {
      // User is not signed in.
    }
  })
}

function validateCode() {
  let code = document.getElementById("partyInviteCode").value.trim();

  if (code) {
    console.log(code);
    addWatchPartyMember();
  } else {
    displayCodeInvalidMessage();
  }
}

function displayCodeInvalidMessage() {
  document.querySelector("#invalid-code").style.display = "block";
}

function alertInvalidCode(message) {
  alert(message);
}