/**
 * The signOutSuccessWithAuthResult() ends seesion for the user.
 * There are no prameters.
 */
function signOutSuccessWithAuthResult() {
    console.log("Logout Function");
    firebase.auth().signOut()
    .then(function() {
        // Sign-out successful.
        console.log("YES")
        window.location.replace("/index.html");//added a new line.
      }, function(error) {
        // An error happened.
        console.log("NO")
      });
}