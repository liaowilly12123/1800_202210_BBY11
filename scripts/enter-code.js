/**
 * Updates a party in firebase to add a user to the list of members.
 */
function addWatchPartyMember() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userID = user.uid;

      let code = document.getElementById("partyInviteCode").value;

      let partiesQuery = db.collection("parties").where("code", "==", parseInt(code));

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

/**
 * Validates the invite code.
 */
function validateCode() {
  let code = document.getElementById("partyInviteCode").value.trim();

  if (code) {
    addWatchPartyMember();
  } else {
    displayCodeInvalidMessage();
  }
}

/**
 * Displays an error message to the user for invalid code.
 */
function displayCodeInvalidMessage() {
  document.querySelector("#invalid-code").style.display = "block";
}
